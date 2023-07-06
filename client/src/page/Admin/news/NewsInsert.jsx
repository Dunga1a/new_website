import React, { useContext, useEffect, useState } from "react";
import Form from "../../../components/Form";
import Card from "../../../components/Card/Card";
import axios from "axios";
import slugify from "slugify";
import Button from "../../../components/Buttons/Button";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const NewsInsert = ({ fetchData, setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const handleFormSubmit = async (data) => {
    // Xử lý logic khi submit form
    try {
      const formData = new FormData();

      const slug = slugify(data.title, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      //console.log(data);
      let image = null;
      if (data.image) {
        formData.append("image", data.image[0]);
        const responseImgPerson = await axios.post(
          `${DOMAIN}/api/member/uploadFileImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        image = `/uploads/${responseImgPerson.data.imageUrl}`;
      }
      const value = { ...data, slug, image, userId: currentUser.id };
      //console.log(value);
      const res = await axios.post(`${DOMAIN}/api/posts/`, value);
      //console.log(res.data);
      setOpen(false);
      toast.success("Thêm bài viết thành công");
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [listCategory, setListCategory] = useState([]);
  const page = searchParams.get("page") || 1;

  const fetchDataStatic = async () => {
    try {
      const sheet = page ? page : 1;
      const result = await axios.get(
        `${DOMAIN}/api/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      const data = result.data.getListCategory.map((item) => {
        return {
          value: item.news_category_id,
          label: item.name,
        };
      });
      setListCategory(data);
      //console.log(result.data.getListCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, [page]);
  //console.log(listCategory);
  const newsFormFields = [
    { name: "title", label: "Tiêu đề", type: "text", col_span: true },
    {
      name: "subcontent",
      label: "Giới thiệu ngắn",
      type: "text",
      col_span: true,
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: listCategory,
    },
    { name: "image", label: "Hình ảnh chính", type: "file", value: "" },
    {
      name: "content",
      label: "Mô tả",
      type: "react-quill",
      col_span: true,
    },
  ];
  return (
    <Card title={"Thêm bài viết"} className={"py-2 px-3"}>
      <Form formFields={newsFormFields} onSubmit={handleFormSubmit} />;
    </Card>
  );
};

export default NewsInsert;

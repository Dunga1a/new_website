import React, { useContext, useEffect, useState } from "react";
import Form from "../../../components/Form";
import Card from "../../../components/Card/Card";
import axios from "axios";
import slugify from "slugify";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const NewsInsert = ({ fetchData, setOpen }) => {
  const { currentUser } = useContext(AuthContext);

  const handleFormSubmit = async (data) => {
    // Xử lý logic khi submit form
    try {
      const slug = slugify(data.title, {
        replacement: "-",
        remove: undefined,
        lower: false,
        strict: false,
        locale: "vi",
        trim: true,
      });

      let image = null;

      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        // Sử dụng axios để gửi yêu cầu không đồng bộ
        axios
          .post(`${DOMAIN}/api/member/uploadFileImage`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              // toast.info("Upload progress: " + percentCompleted + "%");
            },
          })
          .then((response) => {
            // Xử lý phản hồi sau khi tải lên thành công
            image = `/uploads/${response.data.imageUrl}`;

            const value = { ...data, slug, image, userId: currentUser.id };
            return axios.post(`${DOMAIN}/api/posts/`, value);
          })
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            toast.success("Thêm Bài Viết Thành Công");
            fetchData();
            setOpen(false);
          })
          .catch((error) => {
            // Xử lý lỗi trong quá trình tải lên
            console.error("Upload error:", error);
          });
      } else {
        const value = { ...data, slug, image, userId: currentUser.id };
        axios
          .post(`${DOMAIN}/api/posts/`, value)
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            toast.success("Thêm Bài Viết Thành Công");

            fetchData();
            setOpen(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.log(error.message);
      // toast.error(error.response.data.message);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, [page]);

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

import React from "react";
import Form from "../../../components/Form";
import Card from "../../../components/Card/Card";
import axios from "axios";
import slugify from "slugify";
import Button from "../../../components/Buttons/Button";
const NewsInsert = ({ fetchData, setOpen }) => {
  const handleFormSubmit = async (data) => {
    // Xử lý logic khi submit form
    try {
      const slug = slugify(data.title, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      const value = { ...data, slug };
      //console.log(value);
      const res = await axios.post("http://localhost:3001/api/posts/", value);
      // console.log(res.data);
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };
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
      options: [
        { value: 1, label: "Tin Hoạt Động" },
        { value: 2, label: "Tin Hội Viên" },
        { value: "tin_tuc_thanh_hoa", label: "Tin Tức Thanh Hóa" },
        { value: "phuong_huong_hoat_dong", label: "Phương Hướng Hoạt Động" },
      ],
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

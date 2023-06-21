import React from "react";
import Form from "../../../components/Form";
import Card from "../../../components/Card/Card";

const UserEdit = () => {
  const handleFormSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };

  const userFormFields = [
    {
      name: "first_name",
      label: "Họ và tên đệm",
      type: "text",
      value: "tao có khiên",
    },
    { name: "last_name", label: "Tên", type: "text", value: "" },
    { name: "account", label: "Tài khoản", type: "text", value: "" },
    {
      name: "gender",
      label: "Giới tính",
      type: "select",
      options: [
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
      ],
      value: "Nam",
    },
    {
      name: "birthday",
      label: "Ngày tháng năm sinh",
      type: "date",
      value: "2023-05-11",
    },

    {
      name: "image",
      label: "Hình đại diện",
      type: "file",
      value: "",
      col_span: true,
    },
    { name: "email", label: "Email", type: "email", value: "", col_span: true },
    { name: "password", label: "Mật khẩu", type: "password", value: "" },
    {
      name: "confirm_password",
      label: "Nhập lại mật khẩu",
      type: "password",
      value: "",
    },
    {
      name: "signature",
      label: "Chữ ký",
      type: "text",
      col_span: true,
      value: "",
    },
    {
      name: "question",
      label: "Câu hỏi bảo mật",
      type: "text",
      col_span: true,
      value: "",
    },
    {
      name: "answer",
      label: "Câu trả lời",
      type: "text",
      col_span: true,
      value: "",
    },
  ];
  return (
    <Card title={"Chỉnh sửa thông tin tài khoản"} className={"py-2 px-3"}>
      <Form formFields={userFormFields} onSubmit={handleFormSubmit} />
    </Card>
  );
};

export default UserEdit;

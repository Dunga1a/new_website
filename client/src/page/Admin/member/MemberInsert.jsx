import React from "react";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Form";

const MemberInsert = () => {
  const handleFormSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };
  const memberFormFields = [
    {
      name: "name_company",
      label: "Tên doanh nghiệp",
      type: "text",
      value: "",
      col_span: true,
    },
    {
      name: "name_deputy",
      label: "Người đại diện",
      type: "text",
      col_span: true,
    },
    {
      name: "image",
      label: "Hình đại diện",
      type: "file",
      value: "",
    },
    {
      name: "image_deputy",
      label: "Hình ảnh người đại diện",
      type: "file",
      value: "",
    },
    {
      name: "position",
      label: "Chức vụ",
      type: "text",
      value: "",
    },
    {
      name: "phone_number",
      label: "Số điện thoại",
      type: "text",
      value: "",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: "",
    },
    {
      name: "code_company",
      label: "Mã số doanh nghiệp",
      type: "text",
      value: "",
    },
    {
      name: "address_company",
      label: "Dịa chỉ doanh nghiệp",
      type: "text",
      value: "",
    },
    {
      name: "website_company",
      label: "Website doanh nghiệp",
      type: "text",
      value: "",
    },
    {
      name: "operation_company",
      label: "Lĩnh vực hoạt động",
      type: "text",
      value: "",
    },
    {
      name: "desciption_company",
      label: "Giới thiệu doanh nghiệp",
      type: "react-quill",
      value: "",
      col_span: true,
    },
  ];
  return (
    <Card title={"Thêm doanh nghiệp"} className={"py-2 px-3"}>
      <Form formFields={memberFormFields} onSubmit={handleFormSubmit} />;
    </Card>
  );
};

export default MemberInsert;

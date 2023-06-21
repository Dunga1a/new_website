import React from "react";
import Form from "../../../components/Form";
import Card from "../../../components/Card/Card";

const MemberEdit = () => {
  const handleFormSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };
  const memberFormFields = [
    {
      name: "name_company",
      label: "Tên doanh nghiệp",
      type: "text",
      value: "tao có khiên",
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
      value:
        "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348319700_1703288040100667_8391237883964741134_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=jine-yQVABoAX8O7Wep&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCBGT3jyzogsn1FRPeL0_S9JLyLaP6JZoelZmpVxHPYfA&oe=64793494",
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
      label: "Địa chỉ doanh nghiệp",
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
    <Card title={"Chỉnh sửa thông tin doanh nghiệp"} className={"py-2 px-3"}>
      <Form formFields={memberFormFields} onSubmit={handleFormSubmit} />;
    </Card>
  );
};

export default MemberEdit;

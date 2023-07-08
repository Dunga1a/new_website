import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

 const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormDeleteCategory = ({ newsCategoryDelete }) => {

 
  const values = newsCategoryDelete.map((item) => item.news_category_id);

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `${DOMAIN}/api/newscategory/deletedManyCategory`,
        {
          data: values,
          withCredentials: true,
        }
      );
      //console.log(result);
      fetchData();
      setOpenDeleteForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="text-[18px] ">
        <AiOutlineCloseCircle className="w-[60px] h-[60px] text-red-600 m-auto" />
        <p className="font-bold">Bạn có chắc muốn xóa:</p>{" "}
        {newsCategoryDelete.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}
        Và các bài đăng liên quan?
      </div>
    </>
  );
};

export default FormDeleteCategory;
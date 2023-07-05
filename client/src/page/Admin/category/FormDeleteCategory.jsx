import axios from "axios";
import React from "react";

const FormDeleteCategory = ({
  newsCategoryDelete,
  setOpenDeleteForm,
  fetchData,
}) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const values = newsCategoryDelete.map((item) => item.news_category_id);
  //console.log(newsCategoryDelete);

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
      <div className="text-[18px] mb-2">
        Bạn có chắc muốn xóa:{" "}
        {newsCategoryDelete.map((item) => {
          return (
            <p key={item.id} className="font-bold">
              {item.name}
            </p>
          );
        })}
        Và các bài đăng liên quan?
      </div>
      <button
        className="bg-red-500 text-white hover:bg-red-800 focus:outline-none rounded text-sm px-3 py-2 "
        onClick={() => handleDelete()}
      >
        Đồng ý
      </button>
    </>
  );
};

export default FormDeleteCategory;

import axios from "axios";
import React from "react";
import Button from "../../../components/Buttons/Button";

const FormDeleteCategory = ({
  newsCategoryDelete,
  setOpenDeleteForm,
  fetchData,
}) => {
  const values = newsCategoryDelete.map((item) => item.news_category_id);
  //   console.log(values);

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        "http://localhost:3001/api/newscategory/deletedManyCategory",
        {
          data: values,
          withCredentials: true,
        }
      );
      console.log(result);
      fetchData();
      setOpenDeleteForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        Bạn có chắc muốn xóa:{" "}
        {newsCategoryDelete.map((item) => {
          return <p>{item.name}</p>;
        })}
      </div>
      <Button title="Đồng ý" onClick={() => handleDelete()} />
    </>
  );
};

export default FormDeleteCategory;

import React from "react";
import Button from "../../../components/Buttons/Button";

const FormDelete = ({ eventOne }) => {
  const handleDelete = () => {
    console.log("call api xoa o day, xong fetch data lai");
  };
  return (
    <div>
      Bạn có chắc muốn xóa {eventOne.id}{" "}
      <button onClick={handleDelete}>Xóa</button>{" "}
    </div>
  );
};

export default FormDelete;

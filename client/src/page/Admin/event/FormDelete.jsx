import React from "react";
import Button from "../../../components/Buttons/Button";
import { toast } from "react-toastify";
import axios from "axios";

const FormDelete = ({ eventItem, setOpen, fetchData }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/event/${eventItem.id}`);
      setOpen(false);
      fetchData();
      toast.success("Xóa sự kiện thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      Bạn có chắc muốn xóa {eventItem.title}{" "}
      <button onClick={handleDelete}>Xóa</button>{" "}
    </div>
  );
};

export default FormDelete;

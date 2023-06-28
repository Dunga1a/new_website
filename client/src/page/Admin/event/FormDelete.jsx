import React, { useContext } from "react";
import Button from "../../../components/Buttons/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";

const FormDelete = ({ eventItem, setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const handleDelete = async () => {
    try {
      await axios.delete(`${DOMAIN}/api/event/${eventItem.id}`);
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

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
    <div className=" text-base">
      <p className="mb-5">
        Bạn có chắc muốn xóa <b>{eventItem.title}</b>
      </p>
      <button
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleDelete}
      >
        Xóa
      </button>{" "}
    </div>
  );
};

export default FormDelete;

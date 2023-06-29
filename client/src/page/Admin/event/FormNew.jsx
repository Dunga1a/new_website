import React, { useContext } from "react";
import FormEvent from "./FormEvent";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

const initValue = {
  title: "",
  address: "",
  leader: "",
  date_start: "",
  date_end: "",
  time_end: "",
  content: "",
  image: [],
  file_pdf: null,
};

const FormNew = ({ setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const onSave = async (data) => {
    try {
      const { selectedFiles, image, ...values } = data;
      const result = await axios.post(
        `${DOMAIN}/api/event/createEvent`,
        values,
        {
          withCredentials: true,
        }
      );
      fetchData();
      setOpen(false);
      console.log(result);
      toast.success("🦄 Thêm sự kiện thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("🦄 Thêm sự kiện thất bại!");
    }
  };
  return (
    <div>
      <FormEvent initValue={initValue} onSave={onSave} />
    </div>
  );
};

export default FormNew;

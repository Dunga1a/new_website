import React from "react";
import FormEvent from "./FormEvent";
import axios from "axios";
import { toast } from "react-toastify";

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
      await axios
        .post(`${DOMAIN}/api/event/createEvent`, values, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Thêm sự kiện thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
          setOpen(false);
          fetchData();
        });
    } catch (error) {
      toast.error("Thêm sự kiện thất bại!");
    }
  };
  return (
    <div>
      <FormEvent initValue={initValue} onSave={onSave} setOpen={setOpen} />
    </div>
  );
};

export default FormNew;

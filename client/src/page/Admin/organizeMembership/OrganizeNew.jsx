import React, { useContext } from "react";
import OrganizeForm from "./OrganizeForm";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

const initValue = {
  name: "",
  status: true,
};

const OrganizeNew = ({ setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const onSave = async (data) => {
    console.log(data);
    try {
      console.log("formNew: ", data);
      const result = await axios.post(
        `${DOMAIN}/api/organize-membership-title`,
        data,
        { withCredentials: true }
      );
      console.log(result);
      fetchData();
      setOpen(false);
      toast.success("Thêm chức vụ thành công");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <OrganizeForm value={initValue} onSave={onSave} />
    </div>
  );
};

export default OrganizeNew;

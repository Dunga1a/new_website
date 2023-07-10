import React from "react";
import FormBusinessArea from "./FormBusinessArea";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const initValue = {
  name: "",
  status: 1,
  content: "",
};

const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormBusinessAreaNew = ({ setOpen, fetchData }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSave = async (data) => {
    try {
      await axios.post(`${DOMAIN}/api/business-areas`, data, {
        withCredentials: true,
      });

      fetchData();
      setOpen(false);
      toast.success("Thêm lĩnh vực hoạt động thành công.");
      setSearchParams({ page: 1 });
    } catch (error) {
      toast.error("Thêm lĩnh vực hoạt động thất bại.");
    }
    // const data =await axios.post('http://localhost:3001/api/event/createEvent', )
  };
  return (
    <div>
      <FormBusinessArea
        initValue={initValue}
        onSave={onSave}
        setOpen={setOpen}
      />
    </div>
  );
};

export default FormBusinessAreaNew;

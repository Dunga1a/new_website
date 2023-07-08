import React from "react";

import { useState } from "react";
import FormBusinessArea from "./FormBusinessArea";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormBusinessAreaEdit = ({ businessAreaItem, setOpen, fetchData }) => {
  const onSave = async (data) => {
    try {
      await axios.put(`${DOMAIN}/api/business-areas/editOne`, data, {
        withCredentials: true,
      });
      fetchData();
      setOpen(false);
      toast.success("Sửa lĩnh vực hoạt động thành công.");
    } catch (error) {
      toast.error("Sửa lĩnh vực hoạt động thất bại");
      console.log(error.message);
    }
  };
  return (
    <div>
      {businessAreaItem ? (
        <FormBusinessArea
          initValue={businessAreaItem}
          onSave={onSave}
          setOpen={setOpen}
        />
      ) : null}
    </div>
  );
};

export default FormBusinessAreaEdit;

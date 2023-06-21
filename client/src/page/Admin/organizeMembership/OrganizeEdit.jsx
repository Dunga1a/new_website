import React from "react";
import OrganizeForm from "./OrganizeForm";
import axios from "axios";
import { toast } from "react-toastify";

const OrganizeEdit = ({ organizeItem, setOpen, fetchData }) => {
  console.log(organizeItem);
  const onSave = async (data) => {
    try {
      const values = {
        ...data,
        id_organize_membership: organizeItem.id_organize_membership,
      };
      const result = await axios.put(
        "http://localhost:3001/api/organize-membership-title/editOne",
        values,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      fetchData();
      setOpen(false);
      toast.success("Cập nhật thành công");
      //   console.log(values);
    } catch (error) {
      toast.success("Cập nhật thất bại");

      console.log(error.message);
    }
  };
  return (
    <div>
      <OrganizeForm value={organizeItem} onSave={onSave} />
    </div>
  );
};

export default OrganizeEdit;

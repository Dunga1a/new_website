import React, { useContext } from "react";
import OrganizeForm from "./OrganizeForm";
import axios from "axios";
import { toast } from "react-toastify";

const OrganizeEdit = ({ organizeItem, setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const onSave = async (data) => {
    try {
      const values = {
        ...data,
        id_organize_membership: organizeItem.id_organize_membership,
      };
      // console.log(values);
      const result = await axios.put(
        `${DOMAIN}/api/organize-membership-title/editOne`,
        values,
        {
          withCredentials: true,
        }
      );
      //console.log(result.data);
      fetchData();
      setOpen(false);
      toast.success("Cập nhật thành công");
      //   console.log(values);
    } catch (error) {
      toast.error(error.response.data.message);

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

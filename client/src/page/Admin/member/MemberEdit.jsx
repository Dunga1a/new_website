import React, { useContext, useEffect, useState } from "react";
import MemberFormRegister from "./MemberFormRegister";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

const MemberEdit = ({ memberItem, setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const [businessAreas, setBusinessAreas] = useState([]);
  const [roleAssociations, setRoleAssociations] = useState([]);
  const fetchDataStatic = async () => {
    try {
      const search = "";

      const result = await axios.get(
        `${DOMAIN}/api/business-areas/getListBusinessArea`
      );
      const resultTwo = await axios.get(
        `${DOMAIN}/api/organize-membership-title?searchKey=${search}`
      );

      const data = result.data
        .filter((item) => item.status === 1) // Lọc chỉ các mục có status = 1
        .map((item) => ({
          label: item.name,
          value: item.id_business_areas,
        }));
      // const dataTwo = resultTwo.data.map((item) => {
      //   return {
      //     label: item.name,
      //     value: item.id_organize_membership,
      //   };
      // });
      const dataTwo = resultTwo.data
        .filter((item) => item.status === true) // Lọc chỉ các mục có status = 1
        .map((item) => ({
          label: item.name,
          value: item.id_organize_membership,
        }));

      console.log(resultTwo.data);
      setRoleAssociations(dataTwo);
      setBusinessAreas(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, []);

  const onSave = async (data) => {
    // console.log(data);
    try {
      await axios.put(`${DOMAIN}/api/member/updateMember`, data, {
        withCredentials: true,
      });
      fetchData();
      setOpen(false);
      toast.success("Cập nhật hội viên thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <MemberFormRegister
        memberItem={memberItem}
        businessAreas={businessAreas}
        roleAssociations={roleAssociations}
        onSave={onSave}
      />
    </div>
  );
};

export default MemberEdit;

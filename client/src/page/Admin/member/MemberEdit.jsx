import React, { useEffect, useState } from "react";
import MemberFormRegister from "./MemberFormRegister";
import axios from "axios";
import { toast } from "react-toastify";

const MemberEdit = ({ memberItem, setOpen, fetchData }) => {
  // console.log(memberItem);
  const [businessAreas, setBusinessAreas] = useState([]);
  const [roleAssociations, setRoleAssociations] = useState([]);
  const fetchDataStatic = async () => {
    try {
      const search = "";

      const result = await axios.get(
        "http://localhost:3001/api/business-areas/getListBusinessArea"
      );
      const resultTwo = await axios.get(
        `http://localhost:3001/api/organize-membership-title?searchKey=${search}`
      );
      //   console.log(result.data);
      // const data = result.data.map((item) => {
      //   return {
      //     label: item.name,
      //     value: item.id_business_areas,
      //   };
      // });
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
      const result = await axios.put(
        "http://localhost:3001/api/member/updateMember",
        data,
        {
          withCredentials: true,
        }
      );
      fetchData();
      setOpen(false);
      console.log(result);
      toast.success("Cập nhật hội viên thành công");
    } catch (error) {
      console.log(error.response.data.message);
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

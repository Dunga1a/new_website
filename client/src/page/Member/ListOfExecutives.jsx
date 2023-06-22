import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const listMembers = [
  {
    id: 1,
    name: "Lê Minh Công",
    chuc_vu: "Ban chấp hành",
    img: "http://dntpthanhhoa.vn/wp-content/uploads/2020/08/%E1%BA%A2nh.png",
  },
  {
    id: 2,
    name: "Đỗ Thanh Duy",
    chuc_vu: "Ủy viên Ban chấp hành",
    img: "http://dntpthanhhoa.vn/wp-content/uploads/2020/08/Logo-Tramexco.jpg",
  },
  {
    id: 3,
    name: "Đỗ Thanh Duy",
    chuc_vu: "Ủy viên Ban chấp hành",
    img: "http://dntpthanhhoa.vn/wp-content/uploads/2020/08/Ho%C3%A0ng-V%C4%83n-Tu%E1%BA%A5n-C%C3%B4ng-ty-TNHh-Ho%C3%A0ng-Tu%E1%BA%A5n.jpg",
  },
  {
    id: 4,
    name: "Hoàng Thị Hậu",
    chuc_vu: "Ủy viên Ban chấp hành",
    img: "http://dntpthanhhoa.vn/wp-content/uploads/2020/08/Ho%C3%A0ng-Th%E1%BB%8B-H%E1%BA%ADu.jpg",
  },
  {
    id: 5,
    name: "Đỗ Thanh Duy",
    chuc_vu: "Ủy viên Ban chấp hành",
    img: "",
  },
];
const ListOfExecutives = () => {
  const [member, setMember] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [memberItem, setMemberItem] = useState();
  const [count, setCount] = useState();

  const [businessAreas, setBusinessAreas] = useState([]);
  const [roleAssociations, setRoleAssociations] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const roleAssociationParam = searchParams.get("roleAssociationParam") || "";
  const businessIdParam = searchParams.get("businessIdParam") || "";
  const memberStatus = searchParams.get("memberStatus") || "";

  const queryParams = {
    page,
    roleAssociationParam,
    businessIdParam,
    memberStatus,
  };
  const fetchDataStatic = async () => {
    try {
      const search = "";

      const result = await axios.get(
        "http://localhost:3001/api/business-areas/getListBusinessArea"
      );
      const resultTwo = await axios.get(
        `http://localhost:3001/api/organize-membership-title?searchKey=${search}`
      );

      const data = result.data.map((item) => {
        return {
          label: item.name,
          value: item.id_business_areas,
        };
      });

      const dataTwo = resultTwo.data.map((item) => {
        return {
          label: item.name,
          value: item.id_organize_membership,
        };
      });

      console.log(dataTwo);

      setRoleAssociations(dataTwo);
      setBusinessAreas(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, []);

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const roleAssociationParamId = roleAssociationParam
        ? roleAssociationParam
        : "";

      const businessIdParamId = businessIdParam ? businessIdParam : "";
      const status = memberStatus ? memberStatus : "";

      const result = await axios.get(
        `http://localhost:3001/api/member/getMemberByRole?page=${sheet}&roleAssociationParam=${roleAssociationParamId}&businessIdParam=${businessIdParamId}&memberStatus=${status}`,
        {
          withCredentials: true,
        }
      );

      console.log(result.data.memberList);
      setMember(result.data.memberList);
      setCount(result.data.countMemberList);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, roleAssociationParam, businessIdParam, memberStatus]);
  const navigate = useNavigate();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Ban chấp hành hiệp hội"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="pt-4 col-span-3 ">
          <div className="grid grid-cols-3 gap-3">
            {member
              ? member.map((member) => (
                  <div
                    key={member.id}
                    onClick={() =>
                      navigate("/member/" + member.id, { state: member })
                    }
                    class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
                  >
                    <div>
                      <img
                        class=" max-h-[250px] max-w-full object-cover m-auto"
                        src={
                          member.image_person
                            ? `/uploads/${member.image_person}`
                            : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
                        }
                        alt=""
                      />
                    </div>

                    <div class="p-5 text-center">
                      <h5 class="mb-2 text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
                        {member.name_company}
                      </h5>

                      <p class="mb-3 font-semibold text-red-700 dark:text-gray-400">
                        {member.id_role_associations.name}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div>
          <div>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfExecutives;

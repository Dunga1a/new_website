import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import PaginationV2 from "../../components/Pagination/PaginationV2";
import { AuthContext } from "../../context/authContext";
import EmptyState from "../../components/EmptyState/EmptyState";

import ListOfExecutiveGroup from "./ListOfExecutiveGroup";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const ListOfExecutives = () => {
  const nav = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [member, setMember] = useState([]);
  const [memberGroup, setMemberGroup] = useState([]);

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
        `${DOMAIN}/api/business-areas/getListBusinessArea`
      );
      const resultTwo = await axios.get(
        `${DOMAIN}/api/organize-membership-title?searchKey=${search}`
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

      //console.log(dataTwo);

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
        `${DOMAIN}/api/member/getMemberByRole?page=${sheet}&roleAssociationParam=${roleAssociationParamId}&businessIdParam=${businessIdParamId}&memberStatus=${status}`,
        {
          withCredentials: true,
        }
      );
      const groupedMembers = result.data.memberList.reduce((groups, member) => {
        const roleId = member.id_role_associations.id_organize_membership;
        if (!groups[roleId]) {
          groups[roleId] = [];
        }
        groups[roleId].push(member);
        return groups;
      }, {});
      const groupArrays = Object.values(groupedMembers);
      const sortedGroupArrays = groupArrays.sort((a, b) => {
        const roleIdA = a[0].id_role_associations.id_organize_membership;
        const roleIdB = b[0].id_role_associations.id_organize_membership;
        return roleIdB - roleIdA;
      });

      // console.log("sortedGroupArrays: ", sortedGroupArrays[0]);
      setMemberGroup(sortedGroupArrays);
      setMember(result.data.memberList);
      setCount(result.data.countMemberList);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, roleAssociationParam, businessIdParam, memberStatus]);
  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };
  const handleNav = () => {
    nav("/dang-ky-hoi-vien");
  };
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Ban chấp hành hiệp hội"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        {currentUser &&
        (currentUser.roles.some((item) => item.name === "admin") ||
          currentUser.member) ? (
          <div className="pt-4 col-span-3 phone:col-span-4 laptop:col-span-3 tablet:col-span-3 desktop:col-span-3 ">
            {memberGroup.map((item) => {
              const title = item[0].id_role_associations.name;
              // console.log("item: ", item);
              return <ListOfExecutiveGroup title={title} item={item} />;
            })}
            {member ? (
              member.length ? (
                <PaginationV2
                  total={count}
                  current={searchParams.get("page") || 1}
                  pageSize="6"
                  onChange={handleChangePage}
                />
              ) : null
            ) : null}
          </div>
        ) : (
          <div className="col-span-3">
            <div className="bg-[#f2dede] p-5 border-[1px] border-[#ebccd1] rounded-md text-[16px]">
              Bạn cần đăng nhập với tư cách là <strong>Hội Viên Của Hội</strong>{" "}
              để có thể xem danh sách hội viên. Đăng ký trở thành hội viên{" "}
              <strong
                className="cursor-pointer hover:underline"
                onClick={handleNav}
              >
                tại đây.
              </strong>
            </div>
          </div>
        )}

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

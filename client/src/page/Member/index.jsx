import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import { useNavigate, useSearchParams } from "react-router-dom";
import RightBar from "../../components/list/RightBar";
import axios from "axios";
import PaginationV2 from "../../components/Pagination/PaginationV2";

import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../../components/LoadingPage";
import { AuthContext } from "../../context/authContext";
import MemberItemGroup from "./MemberItemGroup";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const Member = () => {
  const nav = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [member, setMember] = useState([]);
  const [memberGroup, setMemberGroup] = useState([]);

  const [count, setCount] = useState();

  const page = searchParams.get("page") || 1;
  const memberStatus = searchParams.get("memberStatus") || "";

  const queryParams = {
    page,
  };

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;
      const status = memberStatus ? memberStatus : "1";

      const result = await axios.get(
        `${DOMAIN}/api/member?page=${sheet}&memberStatus=${status}`,
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

      setMemberGroup(sortedGroupArrays);
      setMember(result.data.memberList);

      setCount(result.data.countMemberList);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNav = () => {
    nav("/dang-ky-hoi-vien");
  };

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Hội viên"} />

      {currentUser &&
      (currentUser.roles.some((item) => item.name === "admin") ||
        currentUser.member) ? (
        <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              <div className="px-5 mt-2 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4">
                {memberGroup.length ? (
                  memberGroup.map((memberGroupItem) => {
                    const title = memberGroupItem[0].id_role_associations.name;
                    return (
                      <MemberItemGroup
                        title={title}
                        memberArr={memberGroupItem}
                      />
                    );
                  })
                ) : (
                  <div>Bạn cần trở thành hội viên</div>
                )}
                {member.length ? (
                  <PaginationV2
                    total={count}
                    current={searchParams.get("page") || 1}
                    pageSize="8"
                    onChange={handleChangePage}
                  />
                ) : null}
              </div>

              <div className="mt-6">
                <RightBar />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
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
          <RightBar />
        </div>
      )}
    </div>
  );
};

export default Member;

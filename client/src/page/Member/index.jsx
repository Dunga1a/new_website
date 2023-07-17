import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import HeaderTitle from "../../components/HeaderTitle";
import { useSearchParams } from "react-router-dom";
import RightBar from "../../components/list/RightBar";
import axios from "axios";
import PaginationV2 from "../../components/Pagination/PaginationV2";

import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../components/EmptyState/EmptyState";
import LoadingPage from "../../components/LoadingPage";
import { AuthContext } from "../../context/authContext";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const Member = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [member, setMember] = useState([]);
  const [count, setCount] = useState();

  const page = searchParams.get("page") || 1;
  const memberStatus = searchParams.get("memberStatus") || "";

  const handleItemClick = (item) => {
    navigate(`/member/${item.id}`, { state: item });
  };

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
            <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4">
              {member.length ? (
                member.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleItemClick(member)}
                    className=" cursor-pointer grid grid-cols-3 laptop:grid tablet:grid laptop:grid-cols-3 tablet:grid-cols-3 phone:block gap-4 mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className=" h-[250px] bg-gray-200">
                      <img
                        className="w-full object-contain rounded-md h-full  "
                        src={
                          member.image_company
                            ? `/uploads/${member.image_company}`
                            : ""
                        }
                        alt=""
                      />
                    </div>

                    <div className="col-span-2 flex flex-col justify-between  leading-normal mx-3">
                      <p className=" tracking-tight text-gray-900 dark:text-white mt-2">
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Tên doanh nghiệp:{" "}
                        </span>
                        {member.name_company}
                      </p>
                      <p className="mb-1 font-semibold text-red-600 dark:text-gray-400">
                        {member.role_name}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Người đại diện :{" "}
                        </span>
                        {member.representative}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          SĐT :{" "}
                        </span>
                        {member.phone}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Email:{" "}
                        </span>
                        {member.email}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Lĩnh vực hoạt động:{" "}
                        </span>
                        {member.id_business_areas.name}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Website:{" "}
                        </span>
                        {member.website ? member.website : ""}
                      </p>
                      <p>
                        <span className="font-semibold text-[#333333] text-[14px]">
                          Địa chỉ:{" "}
                        </span>
                        {member.address}
                      </p>
                      <p className="mb-2">
                        <span className=" text-[#333333] text-[14px] line-clamp-2 ">
                          <b>Mô tả:</b>
                          <div
                            dangerouslySetInnerHTML={{ __html: member.intro }}
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState />
              )}
              {member.length ? (
                <PaginationV2
                  total={count}
                  current={searchParams.get("page") || 1}
                  pageSize="8"
                  onChange={handleChangePage}
                />
              ) : null}

              {/* <Paginate pageCount={pageCount} handlePageClick={handlePageClick} /> */}
            </div>
          )}

          <RightBar />
        </div>
      ) : (
        <div className="pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
          <div className="col-span-3">
            <EmptyState />
          </div>
          <RightBar />
        </div>
      )}
    </div>
  );
};

export default Member;

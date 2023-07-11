import React, { useEffect, useState } from "react";

import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";

import Breadcrumbs from "../../components/Breadcrumb";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import EmptyState from "../../components/EmptyState/EmptyState";
import PaginationV2 from "../../components/Pagination/PaginationV2";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const Solution = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [postActions, setPostActions] = useState([]);
  const [count, setCount] = useState();
  const page = searchParams.get("page") || 1;
  const handleChangePage = async (page) => {
    setSearchParams({ page: page.toString() });
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;
      const result = await axios.get(
        `${DOMAIN}/api/posts/getPostAction?page=${sheet}`
      );
      setPostActions(result.data.query);
      setCount(result.data.queryCount);
      setLoading(false);
    } catch (error) {
      toast.error("Lấy phương hướng hoạt động thất bại!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Phương Hướng Hoạt Động"} />

      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
          {loading ? (
            <LoadingPage />
          ) : postActions ? (
            postActions.length ? (
              postActions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 mb-5 laptop:flex-row desktop:flex-row tablet:flex-col phone:flex-col"
                  onClick={() => navigate(`/${item.slug}`)}
                >
                  <div className="w-[30%] h-[150px]  bg-gray-300">
                    <img
                      src={
                        item.image
                          ? item.image
                          : "/assets/images/new_default.jpg"
                      }
                      alt=""
                      className="cursor-pointer object-contain h-full laptop:w-[240px] desktop:w-[240px] tablet:w-full phone:w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#333] mb-5 cursor-pointer uppercase">
                      {item.title}
                    </h3>
                    <p className="text-[12px] line-clamp-5">
                      {item.subcontent}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState />
            )
          ) : (
            <EmptyState />
          )}

          {postActions.length ? (
            <PaginationV2
              total={count}
              current={searchParams.get("page") || 1}
              pageSize="6"
              onChange={handleChangePage}
            />
          ) : null}
        </div>
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Solution;

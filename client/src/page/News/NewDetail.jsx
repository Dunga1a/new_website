import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./news.css";
import { BiTime, BiMessageRounded } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";

import Breadcrumbs from "../../components/Breadcrumb";
import HeaderTitle from "../../components/HeaderTitle";
import { useLocation, useNavigate } from "react-router-dom";
import RightBar from "../../components/list/RightBar";
import Category from "../../components/list/Category";
import axios from "axios";
import PaginationV2 from "../../components/Pagination/PaginationV2";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../../components/EmptyState/EmptyState";
import LoadingPage from "../../components/LoadingPage";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const NewDetail = () => {
  const { state } = useLocation();
  const props = state ? state.item : "";
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [postList, setPostlist] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // const page = searchParams.get("page");
  const page = searchParams.get("page") || 1;

  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;

      let url = `${DOMAIN}/api/posts/allPost?`;
      url += `page=${page || 1}`;
      const res = await axios.get(url);
      const result = await axios.get(
        `${DOMAIN}/api/posts/getPostBySlugOfCategory/${state.item.news_category_id}?page=${sheet}`
      );
      // const resultTwo = await axios.get(
      //   `${DOMAIN}/api/comment/getCommentByPost/${postItem.id}`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      setData(res.data.data);
      setCount(result.data.queryCount);
      setPostlist(result.data.query);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [state]);

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams.toString());
    navigate(`/news/tin-hoi-vien?page=${page}`, { state: state });
  };

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"điểm tin"}
        subtitle={props ? props.name : ""}
        link={"/news"}
      />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="pt-4 col-span-3 phone:col-span-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3">
          <HeaderTitle title={props ? props.name : ""} />
          <div className="desktop:pr-5 list phone:pr-0">
            {loading ? (
              <LoadingPage />
            ) : postList ? (
              postList.length ? (
                postList.map((post) => {
                  return (
                    <div
                      key={post.id}
                      className="block text-[14px] py-8 border-b-[2px] border-[#999999] border-solid item"
                    >
                      <div
                        onClick={() => navigate(`/${post.slug}`)}
                        className=" cursor-pointer"
                      >
                        <img
                          src={post.image ? post.image : null}
                          alt={post.title}
                          className="float-left mr-3 mt-2"
                          width={170}
                        />
                      </div>
                      <h2 className="font-bold text-[#375480] text-[16px] mb-1 cursor-pointer">
                        <div onClick={() => navigate(`/${post.slug}`)}>
                          {post.title}
                        </div>
                      </h2>
                      <div className="inline-flex items-center text-[12px] phone:font-semibold text-[#999999] my-2">
                        <span className="flex items-center ml-2">
                          <span className="inline-block  mr-1">
                            <BiTime />
                          </span>
                          {dayjs(post.created_at).format("DD/MM/YYYY")}
                        </span>
                        <span className="flex items-center ml-2">
                          <span className="inline-block mr-1">
                            <FaEye />
                          </span>
                          Đã xem: {post.view}
                        </span>
                        <span className="flex items-center ml-2">
                          <span className="inline-block mr-1">
                            <BiMessageRounded />
                          </span>
                          Phản hồi: {post.count}
                        </span>
                      </div>
                      <p className="desktop:line-clamp-none tablet:line-clamp-none laptop:line-clamp-none phone:line-clamp-3">
                        {post.subcontent}
                      </p>
                      <div className="float-right">
                        <button
                          onClick={() => navigate(`/${post.slug}`)}
                          className="text-[14px] font-semibold flex items-center text-[#1f9cf8]"
                        >
                          Xem tiếp
                          <span className="text-[16px]">
                            <MdArrowRight />
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState />
              )
            ) : (
              <EmptyState />
            )}
          </div>
          {postList?.length > 0 && (
            <PaginationV2
              total={count}
              pageSize={8}
              current={searchParams.get("page") || 1}
              onChange={handlePageChange}
            />
          )}
        </div>
        <div>
          <div>
            <Category />
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetail;

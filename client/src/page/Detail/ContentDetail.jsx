import React, { useContext, useEffect, useState } from "react";

import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";

import Breadcrumbs from "../../components/Breadcrumb";
import { CgCalendarDates } from "react-icons/cg";
import ShareFaceBook from "../../components/ShareSocial/ShareFaceBook";
import ShareTwitter from "../../components/ShareSocial/Twitter";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import dayjs from "dayjs";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const ContentDetail = () => {
  const [arr, setArr] = useState([]);

  const [open, setOpen] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  // CẦN LẤY CẢ ID CỦA USER VÀ ID CỦA BÀI POST NỮA
  const { currentUser } = useContext(AuthContext);
  //console.log("currentUser: ", currentUser);
  const [postItem, setPostItem] = useState(null);
  const { slug } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/posts/details-slug/` + slug);

      // console.log(res.data);
      // const result = await axios.get(
      //   `${DOMAIN}/api/comment/getCommentByPost/${res.data.id}`,
      //   {
      //     withCredentials: true,
      //   }
      // );
      // const groupedComments = groupCommentsByFatherId(result.data);
      // console.log("vao day: ", groupedComments);
      setPostItem(res.data);

      // setArr(groupedComments);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const values = {
        content: data.content,
        post: postItem.id,
        user: currentUser.id,
      };

      await axios.post(
        `${DOMAIN}/api/comment/createComment`,

        values,
        { withCredentials: true }
      );
      fetchData();
      reset({ content: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const groupCommentsByFatherId = (comments) => {
    const commentMap = {};
    const topLevelComments = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const comment of comments) {
      const commentId = comment.id;

      if (!commentMap[commentId]) {
        commentMap[commentId] = {
          ...comment,
          children: [],
        };
      }

      const mappedComment = commentMap[commentId];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (comment.father_id) {
        if (!commentMap[comment.father_id]) {
          commentMap[comment.father_id] = {
            children: [],
          };
        }

        commentMap[comment.father_id].children.push(mappedComment);
      } else {
        topLevelComments.push(mappedComment);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (commentMap[commentId].children.length > 0) {
        mappedComment.children = commentMap[commentId].children;
      }
    }

    return topLevelComments;
  };

  // const fetchDataCmt = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${DOMAIN}/api/comment/getCommentByPost/${postItem.id}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     const groupedComments = groupCommentsByFatherId(result.data);
  //     // console.log("vao day: ", groupedComments);
  //     setArr(groupedComments);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   // fetchDataTwo();
  //   fetchDataCmt();
  // }, [postItem]);

  const currentURL = window.location.href;
  // const parsedURL = new URL(currentURL);
  // const baseDomain = parsedURL.origin;
  // console.log(currentURL);
  // TODO fetch data ở đây
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"Điểm Tin"}
        // sau khi fetch data thì sẽ lấy theo title ở đây
        subtitle={`${postItem && postItem.title}`}
        link={"/news"}
        // link sẽ theo thằng category
      />

      <div className="grid grid-cols-4 gap-3 p-7">
        {postItem && (
          <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
            <h3 className="font-bold text-lg mb-4">{postItem.title}</h3>
            <p className="flex items-center gap-2 mb-5 border-t-[1px] border-b-[1px] border-[#ccc] py-2">
              <CgCalendarDates />
              <span className="text-[13px] italic">
                {dayjs(postItem.created_at).format("DD/MM/YYYY")}
              </span>
            </p>
            <div className="mb-5">
              {postItem.image ? <img src={`${postItem.image}`} alt="" /> : null}
            </div>
            <div
              style={{
                "max-height": "unset",
                height: "auto",
              }}
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: postItem.content }}
            ></div>

            <div className="flex justify-end items-center gap-3 mt-5 border-t-[1px] border-b-[1px] border-[#ccc] py-4">
              Chia sẻ:
              {/* Lấy theo url hiện tại để share, Cổng localhost:3000 lỗi */}
              <ShareFaceBook
                url={`${currentURL}`}
                icon={<BsFacebook className="text-[20px] text-blue-500" />}
              />
              <ShareTwitter
                url={
                  "http://dntpthanhhoa.vn/trung-tam-nghien-cuu-khoa-hoc-va-xet-nghiem-cong-nghe-cao-hstc.html"
                }
                icon={
                  <AiFillTwitterCircle className="text-[23px] text-blue-500" />
                }
              />
            </div>

            {arr ? (
              <CommentList
                comments={arr}
                setOpen={setOpen}
                open={open}
                currentUser={currentUser}
                fetchData={fetchData}
                postItem={postItem}
              />
            ) : null}

            {currentUser &&
              (currentUser ||
                currentUser.member ||
                (currentUser.roles &&
                  currentUser.roles.some((item) => item.name === "admin"))) && (
                <form
                  className="mt-4 grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
                    <div className="">
                      <input
                        type="text"
                        className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                        {...register("username", {})}
                        defaultValue={currentUser.username}
                      />
                    </div>
                  </div>
                  <div className="phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
                    <div className="">
                      <input
                        type="text"
                        className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                        {...register("email")}
                        defaultValue={currentUser.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="phone:col-span-2 desktop:col-span-2 laptop:col-span-2 tablet:col-span-2">
                    <div className="">
                      <input
                        type="text"
                        className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                        {...register("content", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <button
                      type="submit"
                      className="px-10 hidden py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500"
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </form>
              )}
          </div>
        )}
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;

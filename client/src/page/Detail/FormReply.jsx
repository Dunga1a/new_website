import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const FormReply = ({ value, user, fetchData, setOpen }) => {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const fetchDataStatic = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/posts/details-slug/` + slug);
      setPost(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const textChildren = `@ ${value.user.username}`;
      // const text = data.content.split(`@${value.user.username}`).join('').trim();
      // console.log();
      let values = {
        ...data,
        father_id: value.id,
        // TODO: cần lấy theo id của người đăng nhập
        user: user.id,
        post: post.id,
      };
      if (data.content.includes(value.user.username)) {
        const text = data.content
          .split(`@${value.user.username}`)
          .join("")
          .trim();

        values = {
          ...data,
          content: `<b>${textChildren}</b> ${text}`,
          father_id: value.id,
          // TODO: cần lấy theo id của người đăng nhập
          user: user.id,
          post: post.id,
        };
      } else {
        values = {
          ...data,
          father_id: value.id,
          // TODO: cần lấy theo id của người đăng nhập
          user: user.id,
          post: post.id,
        };
      }

      await axios.post(`${DOMAIN}/api/comment/createComment`, values, {
        withCredentials: true,
      });
      if (fetchData) {
        fetchData();
      }
      setOpen(null);
      reset({ content: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form
        className="my-4 grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
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
              defaultValue={user.username}
              readOnly
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
              defaultValue={user.email ? user.email : ""}
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
              defaultValue={`@${value.user.username}`}
            />
          </div>
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-7 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500 hidden"
          >
            Phản hồi
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormReply;

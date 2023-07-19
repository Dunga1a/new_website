import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormEdit = ({ setOpen, comment, fetchData }) => {
  const [value, setValue] = useState(null);
  const [commentReply, setCommentReply] = useState(null);
  const getDataCmtReply = async () => {
    try {
      const res = await axios.get(
        `${DOMAIN}/api/comment/commentUnique/${comment.father_id}`,
        { withCredentials: true }
      );
      setCommentReply(res.data.user.username);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const sanitizedContent = DOMPurify.sanitize(comment.content, {
      ALLOWED_TAGS: [
        "p",
        "strong",
        "em",
        "u",
        "ol",
        "ul",
        "li",
        "a",
        "img",
        "div",
        "span",
        "sub",
        "sup",
        "iframe",
        "pre",
        "br",
      ],
      ALLOWED_ATTR: ["href", "class", "src", "alt", "style", "spellcheck"],
    });
    setValue(sanitizedContent);
    getDataCmtReply();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = async (data) => {
    try {
      const textChildren = `@ ${commentReply}`;

      let values = {};
      if (data.content.includes(commentReply)) {
        const text = data.content.split(`@ ${commentReply}`).join("").trim();
        console.log("text: ", text);
        values = {
          id: comment.id,
          content: `<b>${textChildren}</b> ${text}`,
        };
      } else {
        values = {
          id: comment.id,
          content: data.content,
        };
      }
      // console.log("values: ", values);

      await axios.post(`${DOMAIN}/api/comment/editComment`, values, {
        withCredentials: true,
      });
      // console.log("value: ", values);
      if (fetchData) {
        fetchData();
      }
      setOpen(false);
      // reset({ content: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-[18px] border-b-[1px]">
        Chỉnh Sửa Bình Luận
      </h2>
      <form
        className="my-4 grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="phone:col-span-2 desktop:col-span-2 laptop:col-span-2 tablet:col-span-2">
          <div className="">
            <label htmlFor="cmt" className="text-start block text-[16px]">
              Nội dung <span className="text-red-500 text-[15px] ml-1">*</span>
            </label>
            <input
              type="text"
              id="cmt"
              className={`block focus:outline-none w-full h-[40px] text-[16px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("content", {
                required: true,
              })}
              defaultValue={value}
            />
          </div>
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-7 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500 hidden"
          >
            Sửa
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEdit;

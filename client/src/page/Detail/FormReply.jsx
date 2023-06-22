import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const FormReply = ({ value, user, fetchData, setOpen }) => {
  // console.log(value);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const values = {
        ...data,
        father_id: value.id,
        // TODO: cần lấy theo id của người đăng nhập
        user: 6,
        post: 1,
      };
      const result = await axios.post(
        "http://localhost:3001/api/comment/createComment",
        values,
        { withCredentials: true }
      );
      if (fetchData) {
        fetchData();
      }
      setOpen(null);
      reset({ content: "" });
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
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
              // defaultValue={memberItem.name_company}
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
              {...register("email", {
                required: true,
              })}
              defaultValue={user.email}
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
              defaultValue={`@ ${value.user.username}`}
            />
          </div>
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-7 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500"
          >
            Phản hồi
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormReply;

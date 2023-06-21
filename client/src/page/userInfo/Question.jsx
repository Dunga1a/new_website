import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";

const Question = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const resetFields = () => {
    reset();
  };
  const onSubmit = () => {};
  return (
    <div>
      <div className="text-[14px] p-[10px] bg-gray-50 border-[1px] border-gray-400 rounded-md">
        Để thay đổi câu hỏi bảo mật, bạn cần khai báo lại mật khẩu.
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center relative">
          <p className="w-[23%] text-end mr-2 text-[14px]">Mật khẩu</p>
          <input
            type="password"
            {...register("password", {
              required: "Mật khẩu đăng nhập chưa được khai báo",
            })}
            className={`w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[28%] translate-y-[-30%]">
            *
          </span>
          {errors.password && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] left-[50%] translate-x-[-50%] text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-9px] after:left-[50%] after:translate-x-[-50%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative">
          <p className="w-[23%] text-end mr-2 text-[14px]">Câu hỏi mật khẩu</p>
          <input
            type="text"
            {...register("question", {
              required: "Bạn chưa cần ghi lại câu hỏi bảo mật",
            })}
            className={`w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[28%] translate-y-[-30%]">
            *
          </span>
          {errors.question && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] left-[50%] translate-x-[-50%] text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-9px] after:left-[50%] after:translate-x-[-50%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.question.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative">
          <p className="w-[23%] text-end mr-2 text-[14px]">Trả lời câu hỏi</p>
          <input
            type="text"
            {...register("answer", {
              required: "Bạn phải trả lời câu hỏi bảo mật",
            })}
            className={`w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[28%] translate-y-[-30%]">
            *
          </span>
          {errors.answer && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] left-[50%] translate-x-[-50%] text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-9px] after:left-[50%] after:translate-x-[-50%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.answer.message}
            </span>
          )}
        </div>

        <div className="text-center text-[13px] mt-3 w-[72%]">
          <button
            className="bg-gray-50 p-2 mr-4 rounded-lg"
            type="button"
            onClick={resetFields}
          >
            Thiết lập lại
          </button>
          <button
            className="bg-[#428bca] p-2 rounded-lg text-white"
            type="submit"
          >
            Chấp nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default Question;

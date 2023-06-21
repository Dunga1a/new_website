import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import { ErrorMessage } from "@hookform/error-message";

const Email = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const resetFields = () => {
    reset();
  };
  const { currentUser } = useContext(AuthContext);
  const onSubmit = () => {};
  return (
    <div>
      <div className="text-[14px] p-[10px] bg-gray-50 border-[1px] border-gray-400 rounded-md">
        Để thay đổi email, bạn cần thực hiện tuần tự các bước sau đây:
        <br />
        1.Khai báo lại mật khẩu
        <br />
        2.Khai báo địa chỉ email mới
        <br />
        3.Click vào nút Gửi Mã xác minh
        <br />
        4.Kiểm tra mail thông báo Mã xác minh được gửi đến địa chỉ mà bạn vừa
        khai báo, sau đó nhập mã này vào ô Mã xác minh
        <br />
        5.Click vào nút Chấp nhận.
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center relative mt-4">
          <p className="w-[23%] text-end mr-2 text-[14px]">Email cũ:</p>
          <span className="font-bold text-[13px]">{currentUser.email}</span>
        </div>
        <div className="text-center mb-2">
          <div className="flex items-center relative">
            <p className="w-[23%] text-end mr-2 text-[14px]">Mật khẩu</p>
            <input
              type="text"
              className={`block focus:outline-none w-[50%] rounded h-[32px] text-[13px] leading-[15px] border-[#cccccc] shadow-lg ${
                errors.password ? "border-red-500 border-[1px]" : ""
              }`}
              {...register("password", {
                required: "Trường này không được để trống",
              })}
              // defaultValue={currentUser ? currentUser.displayName : ""}
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[28%] translate-y-[-30%]">
              *
            </span>
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ messages }) => {
              //console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p className="text-[14px] text-red-500" key={type}>
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>

        <div className="text-center">
          <div className="flex items-center relative">
            <p className="w-[23%] text-end mr-2 text-[14px]">Email mới</p>
            <input
              type="text"
              className={`block focus:outline-none w-[50%] rounded h-[32px] text-[13px] leading-[15px] border-[#cccccc] shadow-lg ${
                errors.email ? "border-red-500 border-[1px]" : ""
              }`}
              {...register("email", {
                required: "Không được bỏ trống trường này",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: `Vui lòng nhập đúng email VD: 'ten123@gmail.com'`,
                },
              })}
              placeholder="Email"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[28%] translate-y-[-30%]">
              *
            </span>
          </div>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) => {
              //console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p className=" text-[14px] text-red-500" key={type}>
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>
        <div className="text-center">
          <div className="flex items-center relative">
            <p className="w-[23%] text-end mr-2 text-[14px]">Mã xác minh</p>
            <input
              type="text"
              {...register("veriCode", {
                required: "Trường này không được để trống",
              })}
              className={`w-[34%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-l-md shadow-lg`}
              // defaultValue={currentUser ? currentUser.displayName : ""}
            />
            <div className="text-[13px] py-[6px] px-[12px] bg-[#F0AD4E] rounded-r-md text-white cursor-pointer hover:opacity-90">
              Gửi mã xác minh
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="veriCode"
            render={({ messages }) => {
              //console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p className="text-[14px] text-red-500" key={type}>
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
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

export default Email;

import React, { useState } from "react";
import LayoutLoginPage from "../../Layout/LayoutLoginPage";
import { FaUserAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { BsFillCaretRightFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import generateCaptcha from "../../uitls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const LostPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const value = {
      email: data.email,
    };
    try {
      await toast.promise(
        axios.post(`${DOMAIN}/api/users/getOneUser`, value, {
          withCredentials: true,
        }),
        {
          pending: "Đang gửi mật khẩu về email của bạn",
          success: "Gửi mật khẩu thành công 👌",
          error: "Email không đúng 🤯",
        }
      );
      reset();
      setCaptcha(generateCaptcha);
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkCaptcha = watch("checkCaptcha");

  const resetCaptcha = (data) => {
    setCaptcha(generateCaptcha);
    reset(data.checkCaptcha);
  };

  return (
    <div>
      <LayoutLoginPage
        className={
          "desktop:w-[45%] phone:w-full laptop:w-[45%] tablet:w-[50%] mx-auto rounded-md shadow-lg mt-6"
        }
        title="Khôi phục mật khẩu thành viên"
        subtitle="Nếu còn nhớ email mà bạn đã tự khai báo khi đăng ký thành viên, hãy khai báo chúng vào ô trống dưới đây. Sau khi kiểm tra tính hợp lệ, chúng tôi sẽ tạo cho bạn mật khẩu mới."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center w-full mb-4 border border-gray-400 h-[35px] rounded-md mt-4">
            <div className="py-1 px-2 bg-gray-200 ">
              <FaUserAlt className="w-4 h-4 text-gray-500 " />
            </div>
            <div className="w-full h-full border-l border-gray-400 relative">
              <input
                type="email"
                {...register("email", {
                  required: "Trường này không được để trống",

                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Vui lòng nhập đúng email VD: 'ten123@gmail.com'",
                  },
                })}
                className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md text-[13px]"
                placeholder="Nhập email đã đăng ký tài khoản"
              />
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
          </div>
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="wrapper">
                <h2 className="title">{captcha}</h2>
              </div>
              <button type="button" className="ml-3" onClick={resetCaptcha}>
                <GrPowerReset />
              </button>
            </div>
            <div className="inline relative">
              <input
                type="text"
                className=" rounded-xl text-sm"
                {...register("checkCaptcha", {
                  required: "Bạn chưa nhập mã",
                })}
                placeholder="Mã bảo mật"
              />
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
          </div>

          {errors.checkCaptcha && (
            <span className="text-sm text-red-500">
              {errors.checkCaptcha.message}
            </span>
          )}

          <div className="flex justify-center">
            <button
              className="bg-[#428bca] p-2 rounded-lg text-white text-[12px] text-center mt-4"
              type="submit"
            >
              Gửi yêu cầu
            </button>
          </div>

          <ul className="flex justify-center gap-3 mt-3 text-[13px]">
            <li
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/user/login")}
            >
              <BsFillCaretRightFill />
              <span>Đăng nhập</span>
            </li>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/user/register")}
            >
              <BsFillCaretRightFill />
              <span>Đăng ký</span>
            </li>
          </ul>
        </form>
      </LayoutLoginPage>
    </div>
  );
};

export default LostPage;

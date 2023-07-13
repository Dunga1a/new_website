import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const Password = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const resetFields = () => {
    reset();
  };
  const { currentUser } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePass, setSeePass] = useState(false);

  const handleInputChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onChangeSubmit = async (data) => {
    const passwordOld = data.passwordOld;
    bcrypt.compare(passwordOld, currentUser.password, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      if (result) {
        let passConfirm = data.confirmPassword;
        let passNew = data.passwordNew;

        if (passConfirm !== passNew) {
          toast.error("Mật khẩu nhập lại không khớp. Vui lòng nhập lại");

          setConfirmPassword("");
        }
        if (passConfirm && passNew) {
          setConfirmPassword(passConfirm);
        }
        try {
          const response = await axios.post(
            `${DOMAIN}/api/users/change-password/${currentUser.id}`,
            { newPassword: confirmPassword }
          );
          //console.log(response);
          setConfirmPassword("");
          const pass = response.data.password;
          console.log(pass);
          const values = { ...currentUser, password: pass };
          // console.log(values);
          localStorage.setItem("user", JSON.stringify(values));
          toast.success("Bạn đã thay đổi mật khẩu thành công");
          reset();
        } catch (error) {
          console.log(error.message);
        }
        reset(watch(passConfirm));
      } else {
        toast.error("Mật khẩu cũ của bạn chưa chính xác");
        reset({ passwordOld: "" });
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onChangeSubmit)}>
        <div className="flex items-center relative">
          <p className="desktop:w-[23%] laptop:w-[23%] tablet:w-[23%] phone:w-[26%] text-end mr-2 text-[14px]">
            Mật khẩu cũ
          </p>
          <input
            type={seePass ? "text" : "password"}
            {...register("passwordOld", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            className={`desktop:w-[50%] laptop:w-[50%] tablet:w-[50%] phone:w-[70%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span
            className="absolute top-[50%] left-[68%] translate-y-[-30%]"
            onClick={() => setSeePass(!seePass)}
          >
            {seePass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
          <span className=" text-red-600 text-[18px] absolute top-[50%] desktop:right-[28%] laptop:right-[28%] tablet:right-[28%] phone:right-[5%] translate-y-[-30%]">
            *
          </span>
          {errors.passwordOld && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.passwordOld.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative">
          <p className="desktop:w-[23%] laptop:w-[23%] tablet:w-[23%] phone:w-[26%] text-end mr-2 text-[14px]">
            Mật khẩu mới
          </p>
          <input
            type={seePass ? "text" : "password"}
            {...register("passwordNew", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            className={`desktop:w-[50%] laptop:w-[50%] tablet:w-[50%] phone:w-[70%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] desktop:right-[28%] laptop:right-[28%] tablet:right-[28%] phone:right-[5%] translate-y-[-30%]">
            *
          </span>
          {errors.passwordNew && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.passwordNew.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative">
          <p className="desktop:w-[23%] laptop:w-[23%] tablet:w-[23%] phone:w-[26%] text-end mr-2 text-[14px]">
            Nhập lại mật khẩu mới
          </p>

          <input
            type={seePass ? "text" : "password"}
            {...register("confirmPassword", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            value={confirmPassword}
            onChange={handleInputChange}
            className={`desktop:w-[50%] laptop:w-[50%] tablet:w-[50%] phone:w-[70%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] desktop:right-[28%] laptop:right-[28%] tablet:right-[28%] phone:right-[5%] translate-y-[-30%]">
            *
          </span>
          {errors.confirmPassword && (
            <span className=" absolute px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.confirmPassword.message}
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

export default Password;

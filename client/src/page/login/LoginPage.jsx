import React, { useContext, useEffect, useState } from "react";

import { auth, provider, providerFB } from "./config";
import { signInWithPopup, signOut } from "firebase/auth";
import LayoutLoginPage from "../../Layout/LayoutLoginPage";
import { FaUserAlt } from "react-icons/fa";
import { MdKey } from "react-icons/md";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const LoginPage = ({ className }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (data === null) {
      alert("Bạn chưa có thông tin đăng nhập");
    }
    try {
      const result = await axios.post(`${DOMAIN}/api/auth/login`, data, {
        withCredentials: true,
      });
      // login(result.data.user);
      setUser(result.data.user);
      if (result.data.user.status !== 1) {
        return;
      }

      // if(result.data.user)
      toast.success("Đăng nhập thành công");
      // navigate("/user/editinfo");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      reset();
    }
  };

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
      login(data.user);
      // window.location.reload();
    });
  };

  // const handleLoginWithFB = () => {
  //   signInWithPopup(auth, providerFB).then((data) => {
  //     setUser(data.user);
  //     login(data.user);
  //     window.location.reload();
  //   });
  // };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    window.scrollTo(0, 0);
  }, [user]);

  const resetFields = () => {
    reset();
  };

  return (
    <div className="bg-white">
      <div className="">
        <div className="">
          <div className="">
            <LayoutLoginPage
              className={`${
                className
                  ? className
                  : "desktop:w-[45%] phone:w-full tablet:w-[50%] laptop:w-[45%]"
              } mx-auto rounded-md shadow-lg mt-6`}
              title="Thành viên đăng nhập"
              subtitle="Hãy đăng nhập thành viên để trải nghiệm đầy đủ các tiện ích trên site"
            >
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                  <div className="flex items-center w-full mb-2 border border-sky-500 h-[35px] rounded-md">
                    <div className="py-1 px-2 bg-gray-200 ">
                      <FaUserAlt className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="w-full h-full border-l border-sky-500 relative">
                      <input
                        {...register("username", {
                          required: "Trường này không được để trống",
                        })}
                        placeholder="Tên đăng nhập"
                        className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md text-[13px]"

                        // className={`w-full outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
                      />
                      <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                        *
                      </span>
                    </div>
                  </div>
                  {errors.username && (
                    <span className="text-sm text-red-500 mb-3 block">
                      {errors.username.message}
                    </span>
                  )}

                  <div className="flex items-center w-full mb-2 border border-sky-500 h-[35px] rounded-md">
                    <div className="py-1 px-2 bg-gray-200 ">
                      <MdKey className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="w-full h-full border-l border-sky-500 relative">
                      <input
                        type="password"
                        {...register("password", {
                          required: "Trường này không được để trống",
                        })}
                        placeholder="Mật khẩu"
                        className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md text-[13px]"

                        // className={`w-full outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
                      />
                      <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                        *
                      </span>
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-sm text-red-500 mb-3 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="text-center text-[13px]">
                  <button
                    className="bg-gray-100 p-2 mr-4 rounded-lg hover:bg-gray-300"
                    onClick={resetFields}
                  >
                    Thiết lập lại
                  </button>
                  <button
                    className="bg-[#428bca] p-2 rounded-lg text-white hover:bg-blue-600"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-center text-sm font-bold mb-2">Or</h3>
                  <div className="flex justify-center gap-4 items-center cursor-pointer">
                    <FcGoogle onClick={handleLogin} className="text-[26px]" />
                    {/* <BsFacebook
                      onClick={handleLoginWithFB}
                      className="text-[26px]"
                    /> */}
                  </div>
                </div>

                <ul className="flex justify-center gap-3 mt-3 text-[13px]">
                  <li
                    className="flex items-center cursor-pointer hover:opacity-80"
                    onClick={() => navigate("/user/register")}
                  >
                    <BsFillCaretRightFill />
                    <span>Đăng ký</span>
                  </li>
                  <li
                    onClick={() => navigate("/user/lostpass")}
                    className="flex items-center cursor-pointer hover:opacity-80"
                  >
                    <BsFillCaretRightFill />
                    <span>Khôi phục mật khẩu</span>
                  </li>
                </ul>
              </form>
              {user ? (
                <div>
                  Login successfully : {user.displayName}
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : null}
            </LayoutLoginPage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

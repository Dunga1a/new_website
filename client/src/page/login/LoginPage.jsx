import React, { useContext, useEffect, useState } from "react";

import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import LayoutLoginPage from "../../Layout/LayoutLoginPage";
import { FaUserAlt } from "react-icons/fa";
import { MdKey } from "react-icons/md";
import { BsFillCaretRightFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const LoginPage = ({ className }) => {
  const [see, setSee] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const onSubmit = async (data) => {
    if (data === null) {
      alert("Bạn chưa có thông tin đăng nhập");
    }
    try {
      const result = await axios.post(`${DOMAIN}/api/auth/login`, data, {
        withCredentials: true,
      });

      setUser({ ...result.data.user, provider: null });
      if (result.data.user.status !== 1) {
        return;
      }
      // navigate("/");

      // if(result.data.user)
      toast.success("Đăng nhập thành công");
      // navigate("/user/editinfo");
      // window.location.reload();
      setTimeout(() => {
        // navigate("/user/editinfo");
        navigate("/");
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      reset();
    }
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      // call api
      console.log(data.user);
      try {
        const values = {
          username: data.user.displayName,
          email: data.user.email,
          password: "123456",
        };
        await axios
          .post(`${DOMAIN}/api/users/registerUserGoogle`, values, {
            withCredentials: true,
          })
          .then((response) => {
            setUser({ ...response.data, provider: data.user.providerId });
            login({ ...response.data, provider: data.user.providerId });
          });
      } catch (error) {
        try {
          const values = {
            username: data.user.displayName,
            // password: "123456",
          };
          // console.log("data.user.displayName: ", data.user.displayName);
          await axios
            .post(`${DOMAIN}/api/users/username`, values, {
              withCredentials: true,
            })
            .then(async (response) => {
              const value = {
                username: response.data.username,
                password: "123456",
              };

              const result = await axios.post(
                `${DOMAIN}/api/auth/login`,
                value,
                {
                  withCredentials: true,
                }
              );

              setUser({ ...result.data.user, provider: data.user.providerId });
              if (result.data.user.status !== 1) {
                return;
              }
              // navigate("/");

              // if(result.data.user)
              toast.success("Đăng nhập thành công");
              // navigate("/user/editinfo");
              setTimeout(() => {
                // navigate("/user/editinfo");
                navigate("/");
                window.location.reload();
              }, 500);
            });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: "top-center",
          });
          reset();
        }
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    window.scrollTo(0, 0);
  }, [user]);

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
                      />
                      <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                        *
                      </span>
                    </div>
                  </div>
                  {isSubmitted && errors.username && (
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
                        type={see ? "text" : "password"}
                        {...register("password", {
                          required: "Trường này không được để trống",
                        })}
                        placeholder="Mật khẩu"
                        className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md text-[13px]"
                      />
                      <span
                        className="absolute top-[50%] right-[30px] translate-y-[-30%]"
                        onClick={() => setSee(!see)}
                      >
                        {see ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                      <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                        *
                      </span>
                    </div>
                  </div>
                  {isSubmitted && errors.password && (
                    <span className="text-sm text-red-500 mb-3 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="text-center text-[13px]">
                  <button
                    type="button"
                    className="bg-gray-100 p-2 mr-4 rounded-lg hover:bg-gray-300"
                    onClick={() => reset()}
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
                    className="flex items-center  cursor-pointer hover:opacity-80"
                  >
                    <BsFillCaretRightFill />
                    <span>Khôi phục mật khẩu</span>
                  </li>
                </ul>
              </form>
            </LayoutLoginPage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "react-hook-form";
import Test from "../../components/ShareSocial/ShareFaceBook";

const Basic = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(watch(data));
  const resetFields = () => {
    reset();
  };
  return (
    <div className="">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="desktop:w-[75%] phone:w-full laptop:w-[75%] m-auto"
      >
        <div className="flex items-center">
          <p className="w-[23%] text-end mr-2 text-[14px]">Họ và tên đêm</p>
          <input
            type="text"
            className={`w-[66%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
          />
        </div>

        <div className="flex items-center relative">
          <p className="w-[23%] text-end mr-2 text-[14px]">Tên</p>
          <input
            type="text"
            {...register("lastName", {
              required: "Trường này không được để trống",
            })}
            className={`w-[66%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[70px] translate-y-[-30%]">
            *
          </span>
        </div>
        {errors.lastName && (
          <p className="text-sm text-center text-red-500">
            {errors.lastName.message}
          </p>
        )}
        <div className="flex items-center ">
          <p className="w-[23%] text-end mr-2 text-[14px]">Giới tính</p>

          <div className="flex bg-white items-center gap-2 w-[66%] px-3 py-2 mt-2 my-2 rounded-md shadow-lg border-[1px] border-[#ccc] ">
            <label htmlFor="" className="flex items-center gap-1">
              <input type="radio" name="gender" value="N" />
              <span className="text-sm">N/A</span>
            </label>
            <label htmlFor="" className="flex items-center gap-1">
              <input type="radio" name="gender" value="N" />
              <span className="text-sm">Nam</span>
            </label>
            <label htmlFor="" className="flex items-center gap-1">
              <input type="radio" name="gender" value="N" />
              <span className="text-sm">Nữ</span>
            </label>
          </div>
        </div>

        <div className="flex items-center relative">
          <p className="w-[23%] text-end mr-2 text-[13.5px]">
            Ngày tháng năm sinh
          </p>

          <input
            type="date"
            {...register("birthday", {
              required: "Trường này không được để trống",
            })}
            className={`desktop:w-[27%] laptop:w-[27%] tablet:w-[27%] phone:w-[65%] outline-none h-full px-3 py-1 bg-gray-100 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[65px] translate-y-[-35%]">
            *
          </span>
        </div>
        {errors.birthday && (
          <p className="text-sm text-center text-red-500">
            {errors.birthday.message}
          </p>
        )}

        <div className="flex items-center">
          <p className="w-[23%] text-end mr-2 text-[14px]">Chữ ký</p>
          <textarea
            type="text"
            className={`w-[66%] outline-none h-full px-3  mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
          />
        </div>

        <div className="flex items-center">
          <p className="w-[23%] text-end mr-2 text-[14px]">Hiển thị Email</p>

          <select
            name=""
            id=""
            className={`w-[27%] outline-none h-full px-3 py-0  mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
          >
            <option value="">Có</option>
            <option value="">Không</option>
          </select>
        </div>

        <div className="text-center text-[13px] mt-3">
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
            Đăng ký thành viên
          </button>
        </div>
      </form>

      {/* <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </div>
  );
};

export default Basic;

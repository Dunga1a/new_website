import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormEditRole = ({ item, fetchData, setOpen }) => {
  //   console.log(DOMAIN);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const value = {
        id: Number(item.id),
        name: data.name,
      };
      //console.log("values: ", value);
      await axios.put(`${DOMAIN}/api/role/editRole`, value, {
        withCredentials: true,
      });
      //   console.log(result);
      toast.success("Cập nhật chức vụ thành công");
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h3 className="text-[20px] font-semibold mb-2">Sửa Chức Vụ</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full relative">
          <input
            type="text"
            className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[16px] leading-[15px] border-[#cccccc] ${
              errors.name ? "border-red-500 border-[1px]" : ""
            }`}
            {...register("name", {
              required: "Không được bỏ trống trường này",
            })}
            defaultValue={item.name}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
            *
          </span>
        </div>
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ messages }) => {
            //console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="ml-10 text-[14px] text-red-500" key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default FormEditRole;

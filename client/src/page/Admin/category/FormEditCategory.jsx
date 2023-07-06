import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
const FormEditCategory = ({ newsCategoryEdit, setOpen, fetchData }) => {
  // console.log(newsCategoryEdit);
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const slug = slugify(data.category, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      // console.log("vao day: ", data.category);

      const values = {
        ...newsCategoryEdit,
        name: data.category,
        slug,
        isEdit,
      };
      const result = await axios.put(
        `${DOMAIN}/api/newscategory/editCategory`,
        values,
        {
          withCredentials: true,
        }
      );
      setOpen(false);
      fetchData();
      //console.log(result.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
        <div className="w-full relative">
          <input
            type="text"
            className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[13px] leading-[15px] border-[#cccccc] ${
              errors.category ? "border-red-500 border-[1px]" : ""
            }`}
            {...register("category", {
              required: "Không được bỏ trống trường này",
            })}
            placeholder="Thêm danh mục"
            defaultValue={newsCategoryEdit.name}
            onEnter={handleSubmit(onSubmit)}
            onChange={() => setIsEdit(true)}
          />
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
            *
          </span>
        </div>
        <ErrorMessage
          errors={errors}
          name="category"
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
          Lưu{" "}
        </button>
      </form>
    </div>
  );
};

export default FormEditCategory;

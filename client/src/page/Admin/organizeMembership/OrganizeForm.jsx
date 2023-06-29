import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toggle from "../../../components/Toggle/Toggle";

const OrganizeForm = ({ value, onSave }) => {
  const [isPublic, setIsPublic] = useState(value.status);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onSave({
      ...data,
      status: isPublic,
      isEdit,
    });
  };
  return (
    <div>
      <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên gọi chức vụ trong hội
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("name", {
                      required: "Không được bỏ trống trường này",
                      minLength: {
                        value: 5,
                        message: `Vui lòng nhập ít nhất 5 ký tự`,
                      },
                    })}
                    defaultValue={value.name}
                    onChange={() => setIsEdit(true)}
                  />
                  <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                    *
                  </span>
                  {errors.title && (
                    <span className="text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="mt-2">
                  <Toggle
                    label="Trạng thái"
                    value={isPublic}
                    onChange={(e) => setIsPublic(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizeForm;

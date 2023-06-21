import React from "react";
import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/Buttons/Button";
import Card from "../../../components/Card/Card";
const options = [
  { label: "Tin tức hoạt động", value: "tin-tuc-hoat-dong" },
  { label: "Tin tức Xứ Thanh", value: "tin-tuc-xu-thanh" },
  { label: "Tin Hội viên", value: "tin-hoi-vien" },
  { label: "Hoạt động", value: "hoat-dong" },
];

// const options_role = [
//   { value: "admin", label: "Admin" },
//   { value: "hoi_vien", label: "Hội viên" },
//   { value: "nguoi_dung", label: "Người dùng" },
// ];
const CategoryManager = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = (data) => console.log(data);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Card title={"Quản lý danh mục"} className="overflow-visible">
      <Card.Content>
        <div className="grid grid-cols-3 gap-4">
          <Select
            options={options}
            className="col-span-2"
            placeholder={"------Tìm danh mục theo------"}
          />
          <button className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor">
            Tìm kiếm
          </button>
        </div>
        <table className="border border-blue-400 w-full mt-10 bg-white">
          <thead>
            <tr>
              <th scope="col" className="p-4 border border-blue-400">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="border border-blue-400">Danh mục</th>
              <th className="border border-blue-400">Tổng số bài viết</th>
              <th className="border border-blue-400">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-4 p-4 text-center">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="text-center">Tin hoạt động</td>
              <td className="text-center">3</td>
              <td className="flex items-center justify-center p-2">
                <Button
                  colorText={"text-white"}
                  colorBgr={"bg-blue-600"}
                  colorHover={"bg-blue-700"}
                  icon={<TbEdit className="text-[18px]" />}
                />
                <Button
                  colorText={"text-white"}
                  colorBgr={"bg-red-700"}
                  colorHover={"bg-red-800"}
                  icon={<AiOutlineDelete className="text-[18px]" />}
                />
              </td>
            </tr>
            <tr className="h-4">
              <td className="w-4 p-4 text-center">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="text-center">Tin hoạt động</td>
              <td className="text-center">3</td>
              <td className="flex items-center justify-center p-2">
                <Button
                  colorText={"text-white"}
                  colorBgr={"bg-blue-600"}
                  colorHover={"bg-blue-700"}
                  icon={<TbEdit className="text-[18px]" />}
                />
                <Button
                  colorText={"text-white"}
                  colorBgr={"bg-red-700"}
                  colorHover={"bg-red-800"}
                  icon={<AiOutlineDelete className="text-[18px]" />}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5">
          <div className="flex">
            <Button
              onClick={handleOpen}
              type="button"
              title={"Thêm danh mục"}
              colorText={"text-black border border-gray-600"}
              colorBgr={"bg-white"}
              colorHover={"bg-gray-100"}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
            />
            <Button
              icon={<AiOutlineCheckCircle className="text-[18px]" />}
              title={"Duyệt các lựa chọn"}
              colorBgr={"bg-green-400 hover:bg-green-600"}
              colorText={"text-white"}
            />
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
            />
          </div>

          {open && (
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
                        <p
                          className="ml-10 text-[14px] text-red-500"
                          key={type}
                        >
                          {message}
                        </p>
                      ))
                    : null;
                }}
              />
              <button
                type="submit"
                class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Thêm{" "}
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Hủy
              </button>
            </form>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CategoryManager;

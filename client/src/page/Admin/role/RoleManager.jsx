import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Card from "../../../components/Card/Card";
import Button from "../../../components/Buttons/Button";
import { FiAlertCircle } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import ListUserByRole from "./ListUserByRole";
import FormEditRole from "./FormEditRole";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const RoleManager = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [roleItem, setRoleItem] = useState();
  const [openUserByRole, setOpenUserByRole] = useState(false);

  const [roleList, setRoleList] = useState([]);
  const [userByRole, setUserByRole] = useState([]);
  const {
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const fetchDataStatic = async () => {
    try {
      const result = await axios.get(`${DOMAIN}/api/role/getAll`, {
        withCredentials: true,
      });
      setRoleList(result.data);
      //console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataStatic();
  }, []);

  const handleOpenFormEdit = (item) => {
    setOpenEditForm(true);
    setRoleItem(item);
  };

  const handleClickInfo = async (role) => {
    try {
      const value = { ...role };
      const result = await axios.post(
        `${DOMAIN}/api/role/getUserByRole`,
        value,
        {
          withCredentials: true,
        }
      );
      setUserByRole(result.data);
      setOpenUserByRole(true);
      // console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Card title={"Quản Lý Chức Vụ"} className="overflow-visible">
      <Card.Content>
        {/* <div className="grid grid-cols-5 gap-4">
          <Select
            options={options}
            className="col-span-2"
            placeholder={"------Tìm kiếm tài khoản theo------"}
          />
          <Select
            options={options_role}
            className="col-span-2"
            placeholder={"------Tìm kiếm theo chức vụ------"}
          />
          <button className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor">
            Tìm kiếm
          </button>
        </div> */}
        {roleList ? (
          <table className="border border-blue-400 w-full bg-white">
            <thead>
              <tr>
                <th className="border border-blue-400">Tên Chức Vụ</th>
                <th className="border border-blue-400">Số lượng account</th>
                <th className="border border-blue-400">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {roleList.map((item) => {
                return (
                  <tr>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.count}</td>

                    <td className="flex items-center justify-center p-2">
                      <Button
                        onClick={() => handleClickInfo(item)}
                        icon={<FiAlertCircle className="text-[18px]" />}
                        colorBgr={
                          "bg-yellow-400 text-white hover:bg-yellow-800"
                        }
                      />
                      <Button
                        onClick={() => handleOpenFormEdit(item)}
                        colorText={"text-white"}
                        colorBgr={"bg-blue-600"}
                        colorHover={"bg-blue-700"}
                        icon={<TbEdit className="text-[18px]" />}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {/* <table className="border border-blue-400 w-full mt-10">
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
              <th className="border border-blue-400">Tên</th>
              <th className="border border-blue-400">Chức vụ</th>
              <th className="border border-blue-400">Tài khoản</th>
              <th className="border border-blue-400">Email</th>
              <th className="border border-blue-400">Số điện thoại</th>
              <th className="border border-blue-400">Hoạt động</th>
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
              <td className="text-center">Nguyễn Mạnh Dũng</td>
              <td className="text-center">admin</td>
              <td className="text-center">dung123</td>
              <td className="text-center">dung@gail.com</td>
              <td className="text-center">0912452754</td>
              <td className="text-center">Họat động</td>
              <td className="flex items-center justify-center p-2">
                <Button
                  //onClick={() => setOpenAlertModal(true)}
                  icon={<FiAlertCircle />}
                  colorBgr={"bg-yellow-400 text-white hover:bg-yellow-800"}
                />
                <Button
                  //onClick={() => setOpenEditModal(true)}
                  icon={<TbEdit />}
                  colorBgr={"bg-green-500 text-white hover:bg-green-800"}
                />
                <Button
                  //onClick={() => setOpenDeleteModal(true)}
                  icon={<AiOutlineDelete />}
                  colorBgr={"bg-red-600 text-white hover:bg-red-800"}
                />
              </td>
            </tr>
          </tbody>
        </table> */}

        {/* <div className="mt-5">
          <button
            onClick={handleOpen}
            type="button"
            class="flex items-center mb-5 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <AiOutlinePlusCircle className="text-[18px]" />
            Thêm chức vụ
          </button>
          {open && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full relative">
                <input
                  type="text"
                  className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[13px] leading-[15px] border-[#cccccc] ${
                    errors.role ? "border-red-500 border-[1px]" : ""
                  }`}
                  {...register("role", {
                    required: "Không được bỏ trống trường này",
                  })}
                  placeholder="Thêm chức vụ"
                />
                <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                  *
                </span>
              </div>
              <ErrorMessage
                errors={errors}
                name="role"
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
        </div> */}
      </Card.Content>

      {userByRole && (
        <Modal
          open={openUserByRole}
          setOpen={setOpenUserByRole}
          classNameChildren={"w-[1000px]"}
        >
          <table className="border border-blue-400 w-full bg-white">
            <thead>
              <tr>
                <th className="border border-blue-400">Tên Người Dùng</th>
                <th className="border border-blue-400">Email</th>
                <th className="border border-blue-400">Ảnh Đại Diện</th>
                <th className="border border-blue-400">Trạng Thái Tài Khoản</th>
              </tr>
            </thead>

            <tbody>
              {userByRole.map((item) => {
                return <ListUserByRole item={item} />;
              })}
            </tbody>
          </table>
          {/* {userByRole.map((item) => (
          ))} */}
        </Modal>
      )}

      {roleItem && (
        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          // title="Sửa chức vụ"
          displayButtonCancel={false}
        >
          <FormEditRole
            item={roleItem}
            fetchData={fetchDataStatic}
            setOpen={setOpenEditForm}
          />
        </Modal>
      )}
    </Card>
  );
};

export default RoleManager;

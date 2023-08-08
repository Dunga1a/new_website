import React, { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import Toggle from "../../../components/Toggle/Toggle";
import TableV2 from "../../../components/Table/TableV2";
import Button from "../../../components/Buttons/Button";
import { FiAlertCircle } from "react-icons/fi";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineCheckCircle,
  AiFillUnlock,
  AiFillLock,
} from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Modal from "../../../components/Modal/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserEdit from "./UserEdit";
import RegisterPage from "../../login/RegisterPage";
import UserInsert from "./UserInsert";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import axios from "axios";
import Select from "react-select";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { ImWarning } from "react-icons/im";
import ModalV1 from "../../../components/Modal/ModalV1";
import { HiHome } from "react-icons/hi";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const options_post = [
  { value: 2, label: "Đã khóa" },
  { value: 1, label: "Đang hoạt động" },
];

const UserManager = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [selectTwo, setSelectTwo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalError, setOpenModalError] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const fetchData = async () => {
    try {
      let url = `${DOMAIN}/api/users?`;

      if (selectTwo) {
        url += `status=${selectTwo.value || null}&`;
      }
      url += `page=${page || 1}&`;

      const res = await axios.get(url);
      //console.log(res);
      setData(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = data?.every((item) =>
      isCheckedItems.includes(item.id)
    );
    setIsCheckedAll(isAllChecked);
  }, [data, isCheckedItems]);

  useEffect(() => {
    fetchData();
  }, [page, selectTwo]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedItems(isChecked ? data.map((item) => item.id) : []);
  };

  const handlePageChange = async (page) => {
    searchParams.set("page", page);
    searchParams.set("status", status);
    setSearchParams(searchParams);
    // setPage(page);
    navigate(`/admin/user?page=${page}&status=${status}`);
  };

  const handleChangeSelectTwo = (selectedTwo) => {
    setSelectTwo(selectedTwo);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    //console.log("Select Two value:", selectedTwo.value);
  };

  const handleResetFillter = () => {
    setSelectTwo("");
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsCheckedItems([...isCheckedItems, itemId]);
    } else {
      setIsCheckedItems(isCheckedItems.filter((id) => id !== itemId));
    }
  };

  const handleTickClose = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/api/users/approve-close`, item);

      toast.success("Đã khóa tài khoản");
      setCloseStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      toast.error("Lỗi! Không thể khóa");
      console.log(error.message);
    }
  };

  const handleTickOpen = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/api/users/approve-open`, item);

      toast.success("Đã mở tài khoản");
      setOpenStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      toast.error("Lỗi! Chưa thể mở khóa");
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1
        onClick={() => {
          navigate("/admin");
          window.location.reload();
        }}
        className="bg-white z-20 hover:bg-gray-100 px-4 py-2 rounded-lg mb-4 cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        <HiHome className="mr-1" /> <span>Trang chủ</span>
      </h1>
      <Card title={"Thông tin chung"} className="overflow-visible">
        <Card.Content>
          <div className="grid grid-cols-3 gap-5">
            <Select
              value={selectTwo}
              onChange={handleChangeSelectTwo}
              options={options_post}
              className="col-span-2"
              placeholder={"------ Lọc trạng thái tài khoản ------"}
              classNames={"col-span-2"}
            />
            <button
              onClick={handleResetFillter}
              className="py-1 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor"
            >
              Xóa bộ lọc
            </button>
          </div>
          <table className="border border-blue-400 w-full mt-10 bg-white overflow-y-auto relative">
            <thead>
              <tr>
                <th scope="col" className="p-4 border border-blue-400">
                  <div className="flex items-center">
                    <input
                      onChange={handleCheckAll}
                      value={isCheckedAll}
                      checked={isCheckedAll}
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th className="border border-blue-400">Username</th>
                <th className="border border-blue-400">Họ và tên</th>
                <th className="border border-blue-400">Email</th>
                <th className="border border-blue-400">Ngày tạo</th>
                <th className="border border-blue-400">Trạng thái </th>
                {/* <th className="border border-blue-400">Chức năng</th> */}
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="w-4 p-4 text-center">
                      <div className="flex items-center">
                        <input
                          checked={isCheckedItems.includes(item.id)}
                          onChange={(event) => handleCheckItem(event, item.id)}
                          value={isCheckedItems}
                          id={`checkbox-table-search-${item.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${item.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="text-center ">
                      {item.username ? item.username : ""}
                    </td>

                    <td className="text-center">
                      {item && item.lastname && item.firstname
                        ? item.firstname + " " + item.lastname
                        : ""}
                    </td>

                    <td className="text-center">{item.email}</td>
                    <td className="text-center">
                      {item &&
                        item.created_at &&
                        dayjs(item.created_at).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center text-[12px]">
                      {item.status === 1 ? "Đang hoạt động" : "Đã khóa"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr aria-rowspan={7} className="text-center">
                  <td
                    colSpan={7}
                    className="text-center font-semibold py-3 text-xl"
                  >
                    Không có dữ liệu...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-3 flex">
            {/* <Button
              onClick={() => setOpenInsertModal(true)}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
              title={"Thêm tài khoản"}
              colorBgr={"border border-gray-700 hover:bg-gray-200"}
            /> */}
            <Button
              icon={<AiFillLock className="text-[18px] mr-3" />}
              title={"Khóa tài khoản đã lựa chọn"}
              colorBgr={"bg-red-600 hover:bg-red-800 text-white"}
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setCloseStatus(true);
                }
              }}
            />
            <Button
              icon={<AiFillUnlock className="text-[18px] mr-3" />}
              title={"Mở khóa tài khoản đã lựa chọn"}
              colorBgr={"bg-green-600 hover:bg-green-800 text-white"}
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpenStatus(true);
                }
              }}
            />
          </div>
        </Card.Content>
        <PaginationV2
          total={count}
          pageSize={4}
          current={searchParams.get("page") || 1}
          onChange={handlePageChange}
        />
      </Card>

      <ModalV1
        title={<ImWarning className="m-auto w-10 h-10 text-yellow-400" />}
        open={openModalError}
        setOpen={setOpenModalError}
        isCheckedItems={isCheckedItems.length}
      >
        <h2 className="text-xl col-span-2 font-semibold text-red-600">
          Bạn chưa lựa chọn! Xin vui lòng thử lại...
        </h2>
      </ModalV1>

      <ModalV1
        title={<AiFillLock className="m-auto w-10 h-10 text-red-600" />}
        open={closeStatus}
        setOpen={setCloseStatus}
      >
        <h2 className="text-xl mb-5">
          Bạn có chắc muốn khóa các tài khoản lựa chọn đã đánh dấu không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            colorText={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleTickClose}
          ></Button>
        </div>
      </ModalV1>
      <ModalV1
        title={<AiFillUnlock className="m-auto w-10 h-10 text-green-600" />}
        open={openStatus}
        setOpen={setOpenStatus}
      >
        <h2 className="text-xl mb-5">
          Bạn có chắc muốn mở các tài khoản đã đánh dấu không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            colorText={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleTickOpen}
          ></Button>
        </div>
      </ModalV1>

      {/* <Modal
        classNameChildren={"w-[800px]"}
        open={openEditModal}
        setOpen={setOpenEditModal}
      >
        <UserEdit />
      </Modal>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        Nội dung modal cho trường hợp delete
      </Modal>
      <Modal
        classNameChildren={"w-[800px]"}
        open={openInsertModal}
        setOpen={setOpenInsertModal}
      >
        <UserInsert />
      </Modal> */}
    </div>
  );
};

export default UserManager;

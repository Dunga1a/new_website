import React, { useEffect, useState } from "react";
import TableV2 from "../../../components/Table/TableV2";
import Card from "../../../components/Card/Card";
import { HiHome, HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import Button from "../../../components/Buttons/Button";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { Flip, toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import { ButtonV2 } from "../../../components/Buttons/ButtonV2";
import ModalV1 from "../../../components/Modal/ModalV1";
import { ImWarning } from "react-icons/im";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const ContactManager = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [count, setCount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);
  const page = searchParams.get("page");
  const [openModalError, setOpenModalError] = useState(false);
  //Checkox

  const fetchData = async () => {
    try {
      const sheet = page || 1;
      const res = await axios.get(`${DOMAIN}/api/contact?page=${sheet}`);
      //console.log(res.data);

      setContact(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = async (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    // setPage(page);
    navigate(`/admin/contact?page=${page}`);
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = contact?.every((item) =>
      isCheckedItems.includes(item.contact_id)
    );
    setIsCheckedAll(isAllChecked);
  }, [contact, isCheckedItems]);
  //console.log(isCheckedItems);
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedItems(isChecked ? contact.map((item) => item.contact_id) : []);
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsCheckedItems([...isCheckedItems, itemId]);
    } else {
      setIsCheckedItems(isCheckedItems.filter((id) => id !== itemId));
    }
  };

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));
      // console.log(item);

      await axios.post(`${DOMAIN}/api/contact/deletesContact/`, item);
      setOpen(false);
      toast.success("Đã xóa thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTickOpen = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/api/contact/approve-open`, item);

      toast.success("Đã đánh dấu thành công");
      setOpenStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTickClose = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/api/contact/approve-close`, item);

      toast.success("Đã đánh dấu là chưa đọc");
      setCloseStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1
        onClick={() => {
          navigate("/admin");
          window.location.reload();
        }}
        className="bg-white z-20 hover:bg-gray-100 px-4 py-2 rounded-lg mb-4 cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        <HiHome className="mr-1" /> <span>Trang chủ</span>
      </h1>
      <Card title={"Danh sách liên hệ"}>
        <Card.Content>
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
                <th className="border border-blue-400">Tên người gửi</th>
                <th className="border border-blue-400">Chủ đề</th>
                <th className="border border-blue-400">Tiêu đề</th>
                <th className="border border-blue-400">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {contact.length ? (
                contact.map((item) => {
                  //console.log(item);
                  return (
                    <tr key={item.contact_id}>
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <input
                            checked={isCheckedItems.includes(item.contact_id)}
                            onChange={(event) =>
                              handleCheckItem(event, item.contact_id)
                            }
                            value={isCheckedItems}
                            id={`checkbox-table-search-${item.contact_id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor={`checkbox-table-search-${item.contact_id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td
                        className="line-clamp-1 m-auto cursor-pointer hover:opacity-90 hover:bg-gray-200"
                        onClick={() =>
                          navigate(`/admin/contact/${item.contact_id}`)
                        }
                      >
                        <div className="flex items-center flex-col">
                          <span>
                            {item.status === 1 ? (
                              <HiOutlineMailOpen className="w-[25px] h-[25px]" />
                            ) : (
                              <HiOutlineMail className="w-[25px] h-[25px]" />
                            )}
                          </span>
                          <span>{item.username}</span>
                        </div>
                      </td>

                      <td className="text-center">{item.topic}</td>

                      <td className="text-center line-clamp-1 w-[200px]">
                        {item.title}
                      </td>
                      <td className="text-center">
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr aria-rowspan={7} className="text-center">
                  <td
                    colSpan={7}
                    className="text-center font-semibold py-3 text-xl"
                  >
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <PaginationV2 /> */}
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpen(true);
                }
              }}
              icon={<BiTrash />}
              title={"Xoá Chọn"}
              colorText={"border hover:bg-gray-200 border-slate-600 gap-2"}
            />
            <Button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setCloseStatus(true);
                }
              }}
              icon={<HiOutlineMail />}
              title={"Đánh Dấu Là Chưa Đọc"}
              colorText={"border hover:bg-gray-200 border-slate-600 gap-2"}
            />
            <Button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpenStatus(true);
                }
              }}
              icon={<HiOutlineMailOpen />}
              title={"Đánh Dấu Là Đã Đọc"}
              colorText={"border hover:bg-gray-200 border-slate-600 gap-2"}
            />
          </div>
          <PaginationV2
            total={count}
            pageSize={4}
            current={searchParams.get("page") || 1}
            onChange={handlePageChange}
          />
        </Card.Content>
      </Card>
      <ModalV1
        title={<BiTrash className="m-auto w-12 h-12 text-red-500" />}
        open={open}
        setOpen={setOpen}
      >
        <h2 className="text-xl my-3 mb-5">
          Bạn có chắc muốn xóa liên hệ đã lựa chọn không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            colorText={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleDeleteMultiple}
          ></Button>
        </div>
      </ModalV1>

      <ModalV1
        title={<HiOutlineMail className="m-auto w-12 h-12 text-red-500" />}
        open={closeStatus}
        setOpen={setCloseStatus}
      >
        <h2 className="text-xl mb-6">
          Bạn có chắc muốn thay đổi các lựa chọn đã đánh dấu thành trạng thái{" "}
          <b>"Chưa Đọc"</b> không?
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
        title={<HiOutlineMailOpen className="m-auto w-12 h-12 text-red-500" />}
        open={openStatus}
        setOpen={setOpenStatus}
      >
        <h2 className="text-xl mb-6">
          Bạn có chắc muốn thay đổi các lựa chọn đã đánh dấu thành trạng thái{" "}
          <b>"Đã Đọc"</b> không?
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

      <ModalV1
        title={<ImWarning className="m-auto w-10 h-10 text-yellow-400" />}
        open={openModalError}
        setOpen={setOpenModalError}
        isCheckedItems={isCheckedItems.length}
      >
        <h2 className="text-xl col-span-2 font-semibold text-yellow-600">
          Bạn chưa lựa chọn! Xin vui lòng thử lại...
        </h2>
      </ModalV1>
    </>
  );
};

export default ContactManager;

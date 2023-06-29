import React, { useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/Buttons/Button";
import ReactQuillEditor from "../../../components/ReactQuill";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import Modal from "../../../components/Modal/Modal";
import NewsEdit from "./NewsEdit";
import NewsInsert from "./NewsInsert";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
const options = [
  { label: "Tin tức hoạt động", value: 1 },
  { label: "Tin tức Xứ Thanh", value: 2 },
  { label: "Tin Hội viên", value: 3 },
  { label: "Hoạt động", value: 4 },
];

const options_post = [
  { value: 0, label: "Chưa duyệt" },
  { value: 1, label: "Đã duyệt" },
];
const NewsMemberManager = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [selectOne, setSelectOne] = useState(null);
  const [selectTwo, setSelectTwo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  // const [page, setPage] = useState(searchParams.get("page") || 1);
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const { currentUser } = useContext(AuthContext);
  //console.log(currentUser);
  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = data?.every((item) =>
      isCheckedItems.includes(item.id)
    );
    setIsCheckedAll(isAllChecked);
  }, [data, isCheckedItems]);
  //console.log(isCheckedItems);
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedItems(isChecked ? data.map((item) => item.id) : []);
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsCheckedItems([...isCheckedItems, itemId]);
    } else {
      setIsCheckedItems(isCheckedItems.filter((id) => id !== itemId));
    }
  };
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = (data) => console.log(data);
  const fetchDataWithFilter = async () => {
    try {
      let url = "http://localhost:3001/api/posts?";
      if (selectOne) {
        url += `category=${selectOne.value || null}&`;
      }
      if (selectTwo) {
        url += `status=${selectTwo.value || null}&`;
      }
      url += `page=${page || 1}&`;
      url += `id=${currentUser.id}&`;

      const res = await axios.get(url);
      console.log(res);
      setData(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataWithFilter();
  }, [page, selectOne, selectTwo, idItem]);

  const handleEdit = (item) => {
    console.log(item);
    setIdItem(item);
    setOpenEditModal(true);
  };
  //console.log(data);

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));
      //console.log(typeof itemId);

      await axios.post("http://localhost:3001/api/posts/deletes/", item);
      toast.success("Đã xóa thành công");
      setOpenModalDelete(false);
      fetchDataWithFilter();
    } catch (error) {
      toast.error("Lỗi không thể xóa! Xin vui lòng thử lại...");
      console.log(error.message);
    }
  };

  const handlePageChange = async (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    // setPage(page);
    navigate(`/admin/news?page=${page}&category=${category}&status=${status}`);
  };

  const handleChangeSelect = (selectOne) => {
    setSelectOne(selectOne);
    console.log(selectOne.value);
  };
  const handleChangeSelectTwo = (selectedTwo) => {
    setSelectTwo(selectedTwo);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    console.log("Select Two value:", selectedTwo.value);
  };

  const handleSetStatus = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.post("http://localhost:3001/api/posts/approve", item);
      toast.success("Đã duyệt thành công");
      setOpenModalStatus(false);
      setIsCheckedItems([]);
      fetchDataWithFilter();
    } catch (error) {
      //throw new Error(error.message);
      toast.error("Lỗi! Xin vui lòng thử lại");
      setOpenModalStatus(false);
      setIsCheckedItems([]);
      fetchDataWithFilter();
    }
  };

  const handleResetFillter = () => {
    setSelectOne("");
    setSelectTwo("");
  };

  return (
    <div className="relative transition-all ease-linear">
      <div className="bg-white p-4 rounded-xl drop-shadow-new transition-all ease-linear">
        <div className="grid grid-cols-5 gap-4">
          <Select
            value={selectOne}
            options={options}
            onChange={handleChangeSelect}
            className="col-span-2"
            placeholder={"------Tìm danh mục theo------"}
          />
          <Select
            value={selectTwo}
            onChange={handleChangeSelectTwo}
            options={options_post}
            className="col-span-2"
            placeholder={"------ Lọc bài viết ------"}
          />
          <button
            onClick={handleResetFillter}
            className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor"
          >
            Xóa bộ lọc
          </button>
        </div>
        {data ? (
          <>
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
                  <th className="border border-blue-400">Tên bài viết</th>
                  <th className="border border-blue-400">Người đăng</th>
                  <th className="border border-blue-400">Mô tả</th>
                  <th className="border border-blue-400">Thời gian</th>
                  <th className="border border-blue-400">Trạng thái</th>
                  <th className="border border-blue-400">Chức năng</th>
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
                            onChange={(event) =>
                              handleCheckItem(event, item.id)
                            }
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
                      <td className="text-center line-clamp-1 w-[100px]">
                        {item.title ? item.title : ""}
                      </td>

                      <td className="text-center">
                        {item && item.user.member.name_company}
                      </td>

                      <td className="text-center line-clamp-1 w-[200px]">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.content ? item.content : "",
                          }}
                        ></div>
                      </td>
                      <td className="text-center">
                        {dayjs(item.created_at.slice(0, 10)).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td className="text-center text-[12px]">
                        {item.status ? "Đã duyệt" : "Chưa duyệt"}
                      </td>
                      <td className="flex items-center justify-center p-2">
                        <Button
                          onClick={() => navigate(`/admin/news/${item.id}`)}
                          icon={<FiAlertCircle className="text-[18px]" />}
                          colorBgr={
                            "bg-yellow-400 text-white hover:bg-yellow-800"
                          }
                        />
                        <Button
                          onClick={() => handleEdit(item)}
                          colorText={"text-white"}
                          colorBgr={"bg-blue-600"}
                          colorHover={"bg-blue-700"}
                          icon={<TbEdit className="text-[18px]" />}
                        />
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
            <div>
              <PaginationV2
                total={count}
                pageSize={4}
                current={searchParams.get("page") || 1}
                onChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          "Không có dữ liệu"
        )}

        <div className="mt-5">
          <div className="flex">
            <Button
              onClick={() => setOpenInsertModal(true)}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
              title={"Thêm bài viết"}
              colorBgr={"border border-gray-700 hover:bg-gray-200"}
            />
            <Button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpenModalDelete(true);
                }
              }}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
              icon={<AiOutlineDelete className="text-[18px]" />}
            />
            {/* Đặt điều kiện giữa admin và staff ở đây */}
            <Button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpenModalStatus(true);
                }
              }}
              title={"Duyệt các lựa chọn"}
              colorBgr={"bg-yellow-400 hover:bg-yellow-600"}
              colorText={"text-white"}
            />
            {/* Đặt điều kiện giữa admin và staff ở đây */}
          </div>

          {open && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
              <div>
                <div className="w-full relative">
                  <input
                    type="text"
                    className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[13px] leading-[15px] border-[#cccccc] ${
                      errors.title ? "border-red-500 border-[1px]" : ""
                    }`}
                    {...register("title", {
                      required: "Không được bỏ trống trường này",
                    })}
                    placeholder="Thêm Tiêu đề"
                  />
                  <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                    *
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="title"
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
              </div>
              <div className="mt-2">
                <div className="w-full relative">
                  <input
                    type="text"
                    className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[13px] leading-[15px] border-[#cccccc] ${
                      errors.sub_title ? "border-red-500 border-[1px]" : ""
                    }`}
                    {...register("sub_title", {
                      required: "Không được bỏ trống trường này",
                    })}
                    placeholder="Giới thiệu ngắn gọn"
                  />
                  <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                    *
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="sub_title"
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
              </div>
              <div className="bg-white">
                <ReactQuillEditor
                  {...register("content", {
                    required: true,
                  })}
                  onContentChange={(value) => {
                    setValue("content", value);
                  }}
                  placeholder={"Nhập content..."}
                />
              </div>

              <button
                type="submit"
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Thêm{" "}
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Hủy
              </button>
            </form>
          )}

          <Modal
            classNameChildren={"w-[800px]"}
            open={openEditModal}
            setOpen={setOpenEditModal}
          >
            <NewsEdit
              fetchDataWithFilter={fetchDataWithFilter}
              open={openEditModal}
              setOpen={setOpenEditModal}
              idItem={idItem}
            />
          </Modal>
          <Modal
            classNameChildren={"w-[800px]"}
            open={openInsertModal}
            setOpen={setOpenInsertModal}
          >
            <NewsInsert
              setOpen={setOpenInsertModal}
              fetchData={fetchDataWithFilter}
            />
          </Modal>

          <Modal
            title={"Xét duyệt bài đăng"}
            open={openModalStatus}
            setOpen={setOpenModalStatus}
          >
            <h2 className="text-xl">
              Bạn có chắc muốn xét duyệt các bài đăng đã lựa chọn không?
            </h2>
            <div className="flex justify-center mt-3">
              <Button
                title={"Có"}
                colorText={
                  "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
                }
                onClick={handleSetStatus}
              ></Button>
            </div>
          </Modal>

          <Modal
            title={"Lỗi!!!"}
            open={openModalError}
            setOpen={setOpenModalError}
          >
            <h2 className="text-xl font-semibold text-red-600">
              Bạn chưa lựa chọn! Xin vui lòng thử lại...
            </h2>
          </Modal>

          <Modal
            title={"Xóa bài viết"}
            open={openModalDelete}
            setOpen={setOpenModalDelete}
          >
            <h2 className="text-xl">
              Bạn có chắc muốn xóa bài viết đã lựa chọn không?
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
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NewsMemberManager;

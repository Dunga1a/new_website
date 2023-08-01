import React, { useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { ImWarning } from "react-icons/im";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/Buttons/Button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import NewsEdit from "./NewsEdit";
import NewsInsert from "./NewsInsert";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
import ModalV1 from "../../../components/Modal/ModalV1";
import { BiTrash } from "react-icons/bi";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const options_post = [
  { value: 0, label: "Chưa duyệt" },
  { value: 1, label: "Đã duyệt" },
];
const NewsManager = () => {
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
      let url = `${DOMAIN}/api/posts?`;
      if (selectOne) {
        url += `category=${selectOne.value || null}&`;
      }
      if (selectTwo) {
        url += `status=${selectTwo.value || null}&`;
      }
      url += `page=${page || 1}&`;
      url += `id=${currentUser ? currentUser.id : ""}&`;

      const res = await axios.get(url);

      setData(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataWithFilter();
    fetchDataStatic();
  }, [page, selectOne, selectTwo, idItem]);

  const handleEdit = (item) => {
    setIdItem(item);
    setOpenEditModal(true);
  };
  //console.log(data);

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));
      //console.log(typeof itemId);

      await axios.post(`${DOMAIN}/api/posts/deletes/`, item);
      toast.success("Đã xóa thành công");
      setOpenModalDelete(false);
      fetchDataWithFilter();
    } catch (error) {
      toast.error("Lỗi không thể xóa! Xin vui lòng thử lại...");
      // console.log(error.message);
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
  };
  const handleChangeSelectTwo = (selectedTwo) => {
    setSelectTwo(selectedTwo);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSetStatus = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.post(`${DOMAIN}/api/posts/approve`, item);
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

  const [listCategory, setListCategory] = useState([]);
  //const list = searchParams.get("page") || 1;

  const fetchDataStatic = async () => {
    try {
      //const sheet = page ? page : 1;
      const result = await axios.get(
        `${DOMAIN}/api/newscategory/getAllNewsCategory?page=1`,
        {
          withCredentials: true,
        }
      );
      const data = result.data.getListCategory.map((item) => {
        return {
          value: item.news_category_id,
          label: item.name,
        };
      });
      setListCategory(data);
      // console.log(result.data.getListCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  const options = listCategory;

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
                        {item.user ? item.user.username : ""}
                      </td>

                      <td className="text-center line-clamp-1 w-[200px]">
                        {item && item.subcontent}
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
            {currentUser &&
            currentUser.roles &&
            currentUser.roles.some((role) => role.name === "admin") ? (
              <Button
                onClick={() => setOpenInsertModal(true)}
                icon={<AiOutlinePlusCircle className="text-[18px]" />}
                title={"Thêm bài viết"}
                colorBgr={"border border-gray-700 hover:bg-gray-200"}
              />
            ) : null}
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
              icon={<BiTrash className="text-[18px]" />}
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
              title={"Duyệt các bài viết"}
              colorBgr={"bg-yellow-400 hover:bg-yellow-600"}
              colorText={"text-white"}
              icon={<AiOutlineCheckCircle className="text-[18px]" />}
            />
            {/* Đặt điều kiện giữa admin và staff ở đây */}
          </div>

          <ModalV1
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
          </ModalV1>
          <ModalV1
            classNameChildren={"w-[800px]"}
            open={openInsertModal}
            setOpen={setOpenInsertModal}
          >
            <NewsInsert
              setOpen={setOpenInsertModal}
              fetchData={fetchDataWithFilter}
            />
          </ModalV1>

          <ModalV1
            title={
              <AiOutlineCheckCircle className="m-auto w-10 h-10 text-green-400" />
            }
            open={openModalStatus}
            setOpen={setOpenModalStatus}
          >
            <h2 className="text-xl my-3">
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
          </ModalV1>

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
            title={<BiTrash className="m-auto w-10 h-10 text-red-500" />}
            open={openModalDelete}
            setOpen={setOpenModalDelete}
          >
            <h2 className="text-xl my-3">
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
          </ModalV1>
        </div>
      </div>
    </div>
  );
};

export default NewsManager;

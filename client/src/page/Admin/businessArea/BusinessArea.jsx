import React from "react";
import Card from "../../../components/Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/Buttons/Button";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal/Modal";
import FormBusinessAreaNew from "./FormBusinessAreaNew";
import FormBusinessAreaEdit from "./FormBusinessAreaEdit";
import FormBusinessAreaDelete from "./FormBusinessAreaDelete";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginationV2 from "../../../components/Pagination/PaginationV2";

import { toast } from "react-toastify";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Loading from "../../../components/Loading/Loading";
import LoadingPage from "../../../components/LoadingPage";
import { HiHome } from "react-icons/hi";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const BusinessArea = () => {
  const [loading, setLoading] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [businessAreaItem, setBusinessAreaItem] = useState();
  const [idBusinessArea, setIdBusinessArea] = useState();

  const [businessAreaList, setBusinessAreaList] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState();
  const page = searchParams.get("page") || 1;
  const searchKey = searchParams.get("searchKey") || "";
  const [searchName, setSearchName] = useState(searchKey);
  const queryParams = {
    page,
    searchKey,
  };
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;
      const search = searchKey ? searchKey : "";
      const result = await axios.get(
        `${DOMAIN}/api/business-areas?page=${sheet}&searchKey=${search}`
      );
      setBusinessAreaList(result.data.businessAreas);
      setCount(result.data.countBusinessAreas);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, searchKey]);

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  const handleSearchName = async (e) => {
    setSearchName(e.target.value);
    setSearchParams({ ...queryParams, page: 1, searchKey: e.target.value });
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = businessAreaList?.every((item) =>
      isCheckedItems.includes(item.id_business_areas)
    );
    setIsCheckedAll(isAllChecked);
  }, [businessAreaList, isCheckedItems]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = businessAreaList.map((item) => item.id_business_areas);
      setIsCheckedItems(allItemIds);
    } else {
      // Bỏ chọn tất cả các checkbox phụ
      setIsCheckedItems([]);
    }
  };
  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    let updatedCheckedItems = [...isCheckedItems];

    if (isChecked) {
      // Chọn checkbox phụ
      updatedCheckedItems.push(itemId);
    } else {
      // Bỏ chọn checkbox phụ
      updatedCheckedItems = updatedCheckedItems.filter((id) => id !== itemId);
    }

    setIsCheckedItems(updatedCheckedItems);
  };

  const handleDeleteManyItems = async (items) => {
    // TODO: Call Api xóa nhiều trong đây
    //console.log(items);
  };

  const handleEditBusinessArea = (item) => {
    setBusinessAreaItem(item);
    setOpenEditForm(true);
  };

  const handleChangeStatusOnManyItems = async (items) => {
    try {
      if (!items.length) {
        return toast.error("Vui lòng chọn một lĩnh vực.");
      }

      const status = 1; // Giá trị status muốn truyền
      const data = {
        ids: items,
        status: status,
      };

      await axios.put(
        `${DOMAIN}/api/business-areas/updateStatusOn`,
        data,

        {
          withCredentials: true,
        }
      );
      fetchData();
      toast.success("Cập nhật trạng thái thành công");
      setIsCheckedItems([]);
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const handleChangeStatusOff = async (items) => {
    try {
      if (!items.length) {
        return toast.error("Vui lòng chọn một lĩnh vực.");
      }
      const status = 2; // Giá trị status muốn truyền
      const data = {
        ids: items,
        status: status,
      };
      await axios.put(`${DOMAIN}/api/business-areas/updateStatusOn`, data, {
        withCredentials: true,
      });
      fetchData();
      setIsCheckedItems([]);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
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
      <Button
        title="Thêm Mới"
        colorBgr="bg-blue-500"
        colorText="text-white mb-2"
        onClick={() => {
          setOpenNewForm(true);
        }}
      />
      <Card title={"Lĩnh vực kinh doanh"}>
        <div className="grid grid-cols-3">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên"
            className="col-span-1 border-[#ccc] rounded-sm mt-2 ml-4"
            onChange={handleSearchName}
            value={searchName}
          />
        </div>
        <Card.Content>
          {loading ? (
            <LoadingPage />
          ) : businessAreaList.length ? (
            <table className="border border-blue-400 w-full bg-white">
              <thead>
                <tr>
                  <th scope="col" className="p-4 border border-blue-400">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={isCheckedAll}
                        onChange={handleCheckAll}
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="border border-blue-400">Tên Gọi</th>
                  <th className="border border-blue-400">Trạng Thái</th>
                  <th className="border border-blue-400">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {businessAreaList.map((item) => {
                  return (
                    <tr>
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <input
                            checked={isCheckedItems.includes(
                              item.id_business_areas
                            )}
                            onChange={(event) =>
                              handleCheckItem(event, item.id_business_areas)
                            }
                            id="checkbox-table-search-1"
                            type="checkbox"
                            classNmae="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={item.status}
                        />
                      </td>

                      <td className="flex items-center justify-center p-2">
                        <Button
                          onClick={() => handleEditBusinessArea(item)}
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
          ) : (
            <EmptyState />
          )}

          <div className="mt-5 flex gap-1">
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Bật Trạng Thái Các Lựa Chọn"}
              colorBgr={"bg-blue-500"}
              colorText={"text-white"}
              colorHover={"bg-blue-800"}
              onClick={() => handleChangeStatusOnManyItems(isCheckedItems)}
            />
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Tắt Trạng Thái Các Lựa Chọn"}
              colorBgr={"bg-yellow-500"}
              colorText={"text-white"}
              colorHover={"bg-yellow-800"}
              onClick={() => handleChangeStatusOff(isCheckedItems)}
            />
          </div>
        </Card.Content>
        {businessAreaList.length ? (
          <PaginationV2
            total={count}
            current={searchParams.get("page") || 1}
            pageSize="6"
            onChange={handleChangePage}
          />
        ) : null}
      </Card>

      <Modal
        open={openNewForm}
        setOpen={setOpenNewForm}
        title={"Thêm mới lĩnh vực kinh doanh"}
        classNameChildren={"w-[600px]"}
        displayButtonCancel={false}
      >
        <FormBusinessAreaNew setOpen={setOpenNewForm} fetchData={fetchData} />
      </Modal>

      {businessAreaItem && (
        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          title={"Sửa lĩnh vực kinh doanh"}
          classNameChildren={"w-[600px]"}
          displayButtonCancel={false}
        >
          <FormBusinessAreaEdit
            businessAreaItem={businessAreaItem}
            setOpen={setOpenEditForm}
            fetchData={fetchData}
          />
        </Modal>
      )}

      <Modal
        open={openDeleteForm}
        setOpen={setOpenDeleteForm}
        title={"Xóa lĩnh vực kinh doanh"}
        classNameChildren={"w-[600px]"}
      >
        <FormBusinessAreaDelete idBusinessArea={idBusinessArea} />
      </Modal>
    </>
  );
};

export default BusinessArea;

import React, { useContext, useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Buttons/Button";
import Modal from "../../../components/Modal/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";
import FormNew from "./FormNew";
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";
import axios from "axios";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";
const EventManager = () => {
  const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventList, setEventList] = useState([]);
  const [count, setCount] = useState();
  const [eventItem, setEventItem] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [dateStartValue, setDateStartValue] = useState(null);
  const [dateEndValue, setDateEndValue] = useState(null);

  const page = searchParams.get("page") || 1;
  const searchKey = searchParams.get("searchKey") || "";
  const dateStart = searchParams.get("dateStart") || "";
  const dateEnd = searchParams.get("dateEnd") || "";

  const [searchName, setSearchName] = useState(searchKey);

  const queryParams = {
    page,
    searchKey,
    dateStart,
    dateEnd,
  };
  const handleFetchData = async (item) => {
    setEventItem(item);
    setOpenEdit(true);
  };

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const search = searchKey ? searchKey : "";
      const date_start = dateStart ? dateStart : "";
      const date_end = dateEnd ? dateEnd : "";
      const result = await axios.get(
        `${DOMAIN}/api/event/getAllEvent?page=${sheet}&searchKey=${search}&dateStart=${date_start}&dateEnd=${date_end}`,
        {
          withCredentials: true,
        }
      );

      setEventList(result.data.eventList);
      setCount(result.data.countEvent);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchKey, dateStart, dateEnd]);

  const handleSearchName = async (e) => {
    setSearchName(e.target.value);
    setSearchParams({ ...queryParams, page: 1, searchKey: e.target.value });
  };

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  const handleDateStart = async (e) => {
    setDateStartValue(e.target.value);
    setSearchParams({
      ...queryParams,
      page: 1,
      dateStart: e.target.value,
    });
  };

  const handleDateEnd = async (e) => {
    setDateEndValue(e.target.value);
    setSearchParams({
      ...queryParams,
      page: 1,
      dateEnd: e.target.value,
    });
  };

  const handleResetQuery = () => {
    setSearchParams({
      page: 1,
      searchKey: "",
      dateStart: "",
      dateEnd: "",
    });
    setDateStartValue(null);
    setDateEndValue(null);
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = eventList?.every((item) =>
      isCheckedItems.includes(item.id)
    );
    setIsCheckedAll(isAllChecked);
  }, [eventList, isCheckedItems]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = eventList.map((item) => item.id);
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
    try {
      const option = window.confirm("Are you sure");
      if (!option) {
        return;
      }
      await axios.delete(`${DOMAIN}/api/event/deletedManyEvent`, {
        data: items,
        withCredentials: true,
      });
      fetchData();
      toast.success("Xóa các sự kiện thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (item) => {
    setEventItem(item);
    setOpenDelete(true);
  };

  return (
    <>
      <Button
        title="Thêm Mới"
        colorBgr="bg-blue-500"
        colorText="text-white mb-2"
        onClick={() => {
          setOpen(true);
        }}
      />

      <Card title={"Danh Sách Sự Kiện"}>
        <div className="grid grid-cols-3">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sự kiện"
            className="col-span-1 border-[#ccc] rounded-sm mt-2 ml-4"
            onChange={handleSearchName}
            value={searchName}
          />
          <div className="flex items-center justify-center mt-2">
            <label>Ngày bắt đầu: </label>
            <input
              type="date"
              onChange={(e) => handleDateStart(e)}
              value={dateStartValue}
              className="rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <label>Ngày kết thúc: </label>
            <input
              type="date"
              onChange={(e) => handleDateEnd(e)}
              value={dateEndValue}
              className="rounded-lg"
            />
            <button
              onClick={handleResetQuery}
              className="ml-2 py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor"
            >
              <GrPowerReset />
            </button>
          </div>
        </div>
        <Card.Content>
          {eventList.length ? (
            <table className="border border-blue-400 w-full bg-white">
              <thead>
                <tr>
                  <th scope="col" className="p-4 border border-blue-400">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={isCheckedAll}
                        onChange={handleCheckAll}
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th className="border border-blue-400">Thời gian diễn ra</th>
                  <th className="border border-blue-400">Sự kiện</th>
                  <th className="border border-blue-400">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {eventList.map((item) => {
                  return (
                    <tr>
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <input
                            checked={isCheckedItems.includes(item.id)}
                            onChange={(event) =>
                              handleCheckItem(event, item.id)
                            }
                            id="checkbox-table-search-1"
                            type="checkbox"
                            classNmae="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="text-center">
                        <div>
                          <div>
                            {dayjs(item.date_start).format("DD/MM/YYYY")}{" "}
                            {item.date_end
                              ? `- ${dayjs(item.date_end).format("DD/MM/YYYY")}`
                              : ""}
                          </div>
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="text-center line-clamp-1 w-[600px] leading-[48px]">
                        {item.title}
                      </td>
                      <td className="">
                        <div className="flex items-center justify-center p-2">
                          <Button
                            onClick={() => handleFetchData(item)}
                            colorText={"text-white"}
                            colorBgr={"bg-blue-600"}
                            colorHover={"bg-blue-700"}
                            icon={<TbEdit className="text-[18px]" />}
                          />
                          <Button
                            onClick={() => handleDelete(item)}
                            colorText={"text-white"}
                            colorBgr={"bg-red-700"}
                            colorHover={"bg-red-800"}
                            icon={<AiOutlineDelete className="text-[18px]" />}
                          />
                        </div>
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
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
              onClick={() => handleDeleteManyItems(isCheckedItems)}
            />
          </div>
          {eventList.length ? (
            <PaginationV2
              total={count}
              current={searchParams.get("page") || 1}
              pageSize="8"
              onChange={handleChangePage}
            />
          ) : null}
        </Card.Content>
      </Card>

      <Modal
        open={open}
        setOpen={setOpen}
        title={"Thêm mới sự kiện"}
        classNameChildren={"w-[1000px]"}
      >
        <FormNew setOpen={setOpen} fetchData={fetchData} />
      </Modal>

      <Modal
        open={openEdit}
        setOpen={setOpenEdit}
        title={"Sửa sự kiện"}
        classNameChildren={"w-[1000px]"}
      >
        <FormEdit
          eventItem={eventItem}
          open={openEdit}
          setOpen={setOpenEdit}
          fetchData={fetchData}
        />
      </Modal>

      <Modal open={openDelete} setOpen={setOpenDelete}>
        {eventItem ? (
          <FormDelete
            eventItem={eventItem}
            setOpen={setOpenDelete}
            fetchData={fetchData}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default EventManager;

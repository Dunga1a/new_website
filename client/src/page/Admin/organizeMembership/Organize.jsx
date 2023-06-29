import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button";
import Card from "../../../components/Card/Card";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import Modal from "../../../components/Modal/Modal";
import OrganizeNew from "./OrganizeNew";
import OrganizeEdit from "./OrganizeEdit";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

const Organize = () => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const [openNewForm, setOpenNewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [organizeItem, setOrganizeItem] = useState();

  const [organizeList, setOrganizeList] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  //   const page = searchParams.get("page") || 1;
  const searchKey = searchParams.get("searchKey") || "";
  const [searchName, setSearchName] = useState(searchKey);
  const queryParams = {
    searchKey,
  };
  const handleSearchName = async (e) => {
    setSearchName(e.target.value);
    setSearchParams({ ...queryParams, searchKey: e.target.value });
  };
  const fetchData = async () => {
    try {
      const search = searchKey ? searchKey : "";
      const result = await axios.get(
        `${DOMAIN}/api/organize-membership-title?searchKey=${search}`
      );
      setOrganizeList(result.data);
      //   setCount(result.data.countBusinessAreas);
      console.log(result);
      // setBusinessArea(newData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchKey]);

  const handleEditOrganization = (item) => {
    setOrganizeItem(item);
    setOpenEditForm(true);
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = organizeList?.every((item) =>
      isCheckedItems.includes(item.id_organize_membership)
    );
    setIsCheckedAll(isAllChecked);
  }, [organizeList, isCheckedItems]);

  const handleCheckAll = (event) => {
    console.log("vao day: ", organizeList);
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = organizeList.map(
        (item) => item.id_organize_membership
      );
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

  const handleChangeStatusOn = async (items) => {
    try {
      const status = 1; // Giá trị status muốn truyền
      const data = {
        ids: items,
        status: status,
      };
      await axios.put(
        `${DOMAIN}/api/organize-membership-title/updateStatusOn`,
        data,
        {
          withCredentials: true,
        }
      );
      fetchData();
      setIsCheckedItems([]);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
      console.log(error.message);
    }
  };

  const handleChangeStatusOff = async (items) => {
    try {
      const status = 2; // Giá trị status muốn truyền
      const data = {
        ids: items,
        status: status,
      };
      await axios.put(
        `${DOMAIN}/api/organize-membership-title/updateStatusOn`,
        data,
        {
          withCredentials: true,
        }
      );
      fetchData();
      setIsCheckedItems([]);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
      console.log(error.message);
    }
  };

  const handleDeleteManyItems = async (items) => {
    try {
      const option = window.confirm("Bạn có chắc muốn xóa không");
      if (!option) {
        return;
      }
      await axios.delete(
        `${DOMAIN}/api/organize-membership-title/deletedManyOrganize`,
        {
          data: items,
          withCredentials: true,
        }
      );

      fetchData();
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <>
      <Button
        title="Thêm Mới"
        colorBgr="bg-blue-500"
        colorText="text-white mb-2"
        onClick={() => {
          setOpenNewForm(true);
        }}
      />
      <Card title={"Chức vụ trong hội"}>
        <div className="grid grid-cols-3">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên"
            className="col-span-1 border-[#ccc] rounded-sm mt-2 ml-4"
            onChange={handleSearchName}
          />
        </div>
        <Card.Content>
          {organizeList ? (
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
                  <th className="border border-blue-400">Tên Gọi</th>
                  <th className="border border-blue-400">Trạng Thái</th>
                  <th className="border border-blue-400">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {organizeList.map((item) => {
                  return (
                    <tr>
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <input
                            checked={isCheckedItems.includes(
                              item.id_organize_membership
                            )}
                            onChange={(event) =>
                              handleCheckItem(
                                event,
                                item.id_organize_membership
                              )
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
                          onClick={() => handleEditOrganization(item)}
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
          <div className="mt-5 flex gap-1">
            {/* <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
              onClick={() => handleDeleteManyItems(isCheckedItems)}
            /> */}
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Bật Trạng Thái Các Lựa Chọn"}
              colorBgr={"bg-blue-500"}
              colorText={"text-white"}
              colorHover={"bg-blue-800"}
              onClick={() => handleChangeStatusOn(isCheckedItems)}
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
      </Card>

      <Modal
        open={openNewForm}
        setOpen={setOpenNewForm}
        title={"Thêm mới chức vụ trong hội"}
        classNameChildren={"w-[600px]"}
      >
        <OrganizeNew setOpen={setOpenNewForm} fetchData={fetchData} />
      </Modal>

      {organizeItem && (
        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          title={"Sửa chức vụ trong hội"}
          classNameChildren={"w-[600px]"}
        >
          <OrganizeEdit
            organizeItem={organizeItem}
            setOpen={setOpenEditForm}
            fetchData={fetchData}
          />
        </Modal>
      )}
    </>
  );
};

export default Organize;

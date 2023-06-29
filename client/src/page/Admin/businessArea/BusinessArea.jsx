import React from "react";
import Card from "../../../components/Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import TableV2 from "../../../components/Table/TableV2";
import Button from "../../../components/Buttons/Button";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal/Modal";
import FormBusinessAreaNew from "./FormBusinessAreaNew";
import FormBusinessAreaEdit from "./FormBusinessAreaEdit";
import FormBusinessAreaDelete from "./FormBusinessAreaDelete";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PaginationV2 from "../../../components/Pagination/PaginationV2";

const BusinessArea = () => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
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
  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const search = searchKey ? searchKey : "";
      const result = await axios.get(
        `${DOMAIN}/api/business-areas?page=${sheet}&searchKey=${search}`
      );
      setBusinessAreaList(result.data.businessAreas);
      setCount(result.data.countBusinessAreas);
      console.log(result);
      // setBusinessArea(newData);
    } catch (error) {
      console.log(error.message);
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
    console.log("vao day: ", businessAreaList);
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
    console.log(items);
  };

  const handleEditBusinessArea = (item) => {
    setBusinessAreaItem(item);
    setOpenEditForm(true);
  };

  const handleChangeStatusOnManyItems = async (items) => {
    try {
      const result = await axios.put(
        "http://localhost:3001/api/business-areas/updateStatusOn",
        items,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      fetchData();
      setIsCheckedItems([]);
    } catch (error) {
      console.log(error.message);
    }
    console.log(items);
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
          {businessAreaList ? (
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
              onClick={() => handleChangeStatusOnManyItems(isCheckedItems)}
            />
          </div>
        </Card.Content>
        <PaginationV2
          total={count}
          current={searchParams.get("page") || 1}
          pageSize="3"
          onChange={handleChangePage}
        />
      </Card>

      <Modal
        open={openNewForm}
        setOpen={setOpenNewForm}
        title={"Thêm mới lĩnh vực kinh doanh"}
        classNameChildren={"w-[600px]"}
      >
        <FormBusinessAreaNew setOpen={setOpenNewForm} fetchData={fetchData} />
      </Modal>

      {businessAreaItem && (
        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          title={"Sửa lĩnh vực kinh doanh"}
          classNameChildren={"w-[600px]"}
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

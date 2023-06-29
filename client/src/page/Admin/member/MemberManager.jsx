import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/Buttons/Button";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import MemberEdit from "./MemberEdit";
import ConfirmMemberForm from "./ConfirmMemberForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginationV2 from "../../../components/Pagination/PaginationV2";

import EmptyState from "../../../components/EmptyState/EmptyState";

const options_status = [
  { value: 0, label: "Chưa kích hoạt" },
  { value: 1, label: "Đã kích hoạt" },
  { value: 2, label: "Đã khóa" },
];

const MemberManager = () => {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const [member, setMember] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const [memberItem, setMemberItem] = useState();
  const [count, setCount] = useState();

  const [businessAreas, setBusinessAreas] = useState([]);
  const [roleAssociations, setRoleAssociations] = useState([]);
  const [selectedOptionBusiness, setSelectedOptionBusiness] = useState(null);
  const [selectedRoleAssociation, setSelectedRoleAssociation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const roleAssociationParam = searchParams.get("roleAssociationParam") || "";
  const businessIdParam = searchParams.get("businessIdParam") || "";
  const memberStatus = searchParams.get("memberStatus") || "";

  const queryParams = {
    page,
    roleAssociationParam,
    businessIdParam,
    memberStatus,
  };

  const fetchDataStatic = async () => {
    try {
      const search = "";

      const result = await axios.get(
        "http://localhost:3001/api/business-areas/getListBusinessArea"
      );
      const resultTwo = await axios.get(
        `http://localhost:3001/api/organize-membership-title?searchKey=${search}`
      );

      const data = result.data.map((item) => {
        return {
          label: item.name,
          value: item.id_business_areas,
        };
      });

      const dataTwo = resultTwo.data.map((item) => {
        return {
          label: item.name,
          value: item.id_organize_membership,
        };
      });

      console.log(dataTwo);

      setRoleAssociations(dataTwo);
      setBusinessAreas(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, []);

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const roleAssociationParamId = roleAssociationParam
        ? roleAssociationParam
        : "";

      const businessIdParamId = businessIdParam ? businessIdParam : "";
      const status = memberStatus ? memberStatus : "";

      const result = await axios.get(
        `http://localhost:3001/api/member?page=${sheet}&roleAssociationParam=${roleAssociationParamId}&businessIdParam=${businessIdParamId}&memberStatus=${status}`,
        {
          withCredentials: true,
        }
      );

      console.log(result.data.memberList);
      setMember(result.data.memberList);
      setCount(result.data.countMemberList);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, roleAssociationParam, businessIdParam, memberStatus]);

  const handleEditMember = async (id) => {
    try {
      console.log(id);
      const result = await axios.get(`http://localhost:3001/api/member/${id}`, {
        withCredentials: true,
      });
      setMemberItem(result.data);
      setOpenEditForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirmMember = async (item) => {
    try {
      setMemberItem(item);
      setOpenConfirmForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  const handleChangeRoleAssociations = async (idRoleAssociationParams) => {
    console.log(idRoleAssociationParams);
    setSearchParams({
      ...queryParams,
      roleAssociationParam: idRoleAssociationParams.toString(),
      page: 1,
    });
    setSelectedRoleAssociation(idRoleAssociationParams);
  };

  const handleChangeBusinessIdParam = async (idBusinessIdParams) => {
    console.log(idBusinessIdParams);
    setSearchParams({
      ...queryParams,
      businessIdParam: idBusinessIdParams.toString(),
      page: 1,
    });
    setSelectedOptionBusiness(idBusinessIdParams);
  };

  const handleChangeStatusMember = async (status) => {
    console.log(status);
    setSearchParams({
      ...queryParams,
      memberStatus: status.toString(),
      page: 1,
    });
    setSelectedStatus(status);
  };

  const selectedOptionRole = roleAssociations.find(
    (option) => option.value === Number(roleAssociationParam)
  );

  const selectedOption = businessAreas.find(
    (option) => option.value === Number(businessIdParam)
  );

  const selectedChooseStatus = options_status.find(
    (option) => option.value === Number(memberStatus)
  );

  console.log(selectedChooseStatus);

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = member?.every((item) =>
      isCheckedItems.includes(item.id)
    );
    setIsCheckedAll(isAllChecked);
  }, [member, isCheckedItems]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = member.map((item) => item.id);
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

  const handleDeleteItems = async (items) => {
    try {
      const option = window.confirm("Bạn chắc chắn muốn xóa?");
      if (!option) {
        return;
      }
      console.log(items);
      const result = await axios.delete(
        "http://localhost:3001/api/member/deleteManyMember",

        {
          data: items,
          withCredentials: true,
        }
      );
      console.log(result);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteMember = async (idMember) => {
    try {
      const result = await axios.delete(
        `http://localhost:3001/api/member/${idMember}`,
        {
          withCredentials: true,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleResetQuery = () => {
    setSearchParams({
      page: 1,
      roleAssociationParam: "",
      businessIdParam: "",
    });
    setSelectedOptionBusiness(null);
    setSelectedRoleAssociation(null);
    setSelectedStatus(null);
  };
  return (
    <div className="relative transition-all ease-linear">
      <div className="bg-white p-4 rounded-xl drop-shadow-new transition-all ease-linear">
        <div className="grid grid-cols-7 gap-4">
          <Select
            options={roleAssociations}
            className="col-span-2"
            placeholder={
              selectedOptionRole
                ? `------ Tìm theo ${selectedOptionRole.label} ------`
                : `------ Lọc theo chức vụ trong hội ------`
            }
            value={selectedRoleAssociation}
            onChange={(e) => handleChangeRoleAssociations(e.value)}
          />
          <Select
            options={options_status}
            className="col-span-2"
            placeholder={
              selectedChooseStatus
                ? `------ Lọc theo ${selectedChooseStatus.label} ------`
                : "------ Lọc theo trạng thái hội viên ------"
            }
            onChange={(e) => handleChangeStatusMember(e.value)}
            value={selectedStatus}
          />
          <Select
            options={businessAreas}
            className="col-span-2"
            placeholder={
              selectedOption
                ? `------ Lọc theo ${selectedOption.label} ------`
                : "----- Lọc theo lĩnh vực kinh doanh -----"
            }
            onChange={(e) => handleChangeBusinessIdParam(e.value)}
            value={selectedOptionBusiness}
          />
          <button
            className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor"
            onClick={handleResetQuery}
          >
            Đặt lại
          </button>
        </div>
        <table className="border border-blue-400 w-full mt-10 bg-white overflow-y-auto relative">
          <thead>
            <tr>
              <th scope="col" className="p-4 border border-blue-400">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    // onChange={handleCheckAll}
                    // checked={isCheckedAll}
                    checked={isCheckedAll}
                    onChange={handleCheckAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="border border-blue-400">Tên doanh nghiệp</th>
              <th className="border border-blue-400">Người đại diện</th>
              <th className="border border-blue-400">Chức vụ</th>
              <th className="border border-blue-400">Mô tả</th>
              <th className="border border-blue-400">Số điện thoại</th>
              <th className="border border-blue-400">Lĩnh vực hoạt động</th>
              <th className="border border-blue-400">Trạng thái</th>
              <th className="border border-blue-400">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {member.length ? (
              member.map((item) => {
                return (
                  <tr>
                    <td className="w-4 p-4 text-center">
                      <div className="flex items-center">
                        <input
                          checked={isCheckedItems.includes(item.id)}
                          onChange={(event) => handleCheckItem(event, item.id)}
                          id={`checkbox-table-search-${item.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="text-center line-clamp-1 w-[100px]">
                      {item.name_company}
                    </td>
                    <td className="text-center">{item.representative}</td>
                    <td className="text-center">{item.role_name}</td>
                    <td className="text-center line-clamp-1 w-[200px]">
                      <div dangerouslySetInnerHTML={{ __html: item.intro }} />
                    </td>
                    <td className="text-center">{item.phone}</td>
                    <td className="text-center">
                      {item.id_business_areas.name}
                    </td>
                    <td className="text-center text-[12px]">
                      {item.status === 0
                        ? "Chưa Kích Hoạt"
                        : item.status === 1
                        ? "Đã Kích Hoạt"
                        : "Đã Khóa"}
                    </td>
                    <td className="flex items-center justify-center p-2">
                      {item.status === 0 && (
                        <Button
                          onClick={() => handleConfirmMember(item)}
                          icon={<FiAlertCircle className="text-[18px]" />}
                          colorBgr={
                            "bg-yellow-400 text-white hover:bg-yellow-800"
                          }
                        />
                      )}
                      {item.status !== 0 && (
                        <Button
                          colorText={"text-white"}
                          colorBgr={"bg-blue-600"}
                          colorHover={"bg-blue-700"}
                          icon={<TbEdit className="text-[18px]" />}
                          onClick={() => handleEditMember(item.id)}
                        />
                      )}

                      {/* <Button
                        colorText={"text-white"}
                        colorBgr={"bg-red-700"}
                        colorHover={"bg-red-800"}
                        icon={<AiOutlineDelete className="text-[18px]" />}
                        onClick={() => handleDeleteMember(item.id)}
                      /> */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>

        <div className="mt-5">
          <div className="flex">
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
              onClick={() => handleDeleteItems(isCheckedItems)}
            />
          </div>
        </div>

        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          title={"Chi Tiết Doanh Nghiệp"}
          classNameChildren={"w-[1000px]"}
        >
          <MemberEdit
            memberItem={memberItem}
            setOpen={setOpenEditForm}
            fetchData={fetchData}
          />
        </Modal>

        <Modal
          open={openConfirmForm}
          setOpen={setOpenConfirmForm}
          title={"Cấp Tài Khoản Cho Hội Viên"}
        >
          {memberItem && (
            <ConfirmMemberForm
              memberItem={memberItem}
              setOpen={setOpenConfirmForm}
              fetchData={fetchData}
            />
          )}
        </Modal>

        <PaginationV2
          total={count}
          current={searchParams.get("page") || 1}
          pageSize="4"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default MemberManager;

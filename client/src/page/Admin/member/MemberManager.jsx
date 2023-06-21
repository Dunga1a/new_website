import React from "react";
import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/Buttons/Button";
import ReactQuillEditor from "../../../components/ReactQuill";
import { FiAlertCircle } from "react-icons/fi";
import Modal from "../../../components/Modal/Modal";
import MemberEdit from "./MemberEdit";
import MemberInsert from "./MemberInsert";
import { useNavigate } from "react-router-dom";
const options = [
  { label: "Hội viên", value: "hoi_vien" },
  { label: "Ban chấp hành", value: "ban_chap_hanh" },
  { label: "Chủ tịch hiệp hội", value: "chu_tich_hiep_hoi" },
  { label: "Ủy viên Ban chấp hành", value: "uy_vien_ban_chap_hanh" },
  { label: "Phó chủ tịch", value: "pho_chu_tich" },
];

const options_status = [
  { value: "chua_duyet", label: "Chưa duyệt" },
  { value: "da_duyet", label: "Đã duyệt" },
];

const options_field = [{ value: "day_cuoa", label: "Vòng bi - dây curoa" }];

const MemberManager = () => {
  const navigate = useNavigate();
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="relative transition-all ease-linear">
      <div className="bg-white p-4 rounded-xl drop-shadow-new transition-all ease-linear">
        <div className="grid grid-cols-7 gap-4">
          <Select
            options={options}
            className="col-span-2"
            placeholder={"------ Tìm theo chức vụ hội viên ------"}
          />
          <Select
            options={options_status}
            className="col-span-2"
            placeholder={"------ Lọc theo trạng thái hội viên ------"}
          />
          <Select
            options={options_field}
            className="col-span-2"
            placeholder={"------ Lọc theo lĩnh vực ------"}
          />
          <button className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor">
            Tìm kiếm
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
            <tr>
              <td className="w-4 p-4 text-center">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="text-center line-clamp-1 w-[100px]">
                HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh
              </td>
              <td className="text-center">Mạnh Dũng</td>
              <td className="text-center">Chủ tịch hiệp hội</td>
              <td className="text-center line-clamp-1 w-[200px]">
                HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh
              </td>
              <td className="text-center">01651651516</td>
              <td className="text-center">Vòng bi - dây curoa</td>
              <td className="text-center text-[12px]">Chưa duyệt</td>
              <td className="flex items-center justify-center p-2">
                <Button
                  //onClick={() => setOpenAlertModal(true)}
                  onClick={() => navigate(`/admin/member/1`)}
                  icon={<FiAlertCircle className="text-[18px]" />}
                  colorBgr={"bg-yellow-400 text-white hover:bg-yellow-800"}
                />
                <Button
                  onClick={() => setOpenEditModal(true)}
                  colorText={"text-white"}
                  colorBgr={"bg-blue-600"}
                  colorHover={"bg-blue-700"}
                  icon={<TbEdit className="text-[18px]" />}
                />
                <Button
                  colorText={"text-white"}
                  colorBgr={"bg-red-700"}
                  colorHover={"bg-red-800"}
                  icon={<AiOutlineDelete className="text-[18px]" />}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5">
          <div className="flex">
            <Button
              onClick={() => setOpenInsertModal(true)}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
              title={"Thêm Doanh nghiệp"}
              colorBgr={"border border-gray-700 hover:bg-gray-200"}
            />
            <Button
              icon={<AiOutlineCheckCircle className="text-[18px]" />}
              title={"Duyệt các lựa chọn"}
              colorBgr={"bg-green-400 hover:bg-green-600"}
              colorText={"text-white"}
            />
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
            />
          </div>
        </div>
        <Modal
          classNameChildren={"w-[800px]"}
          open={openEditModal}
          setOpen={setOpenEditModal}
        >
          <MemberEdit />
        </Modal>
        <Modal
          classNameChildren={"w-[800px]"}
          open={openInsertModal}
          setOpen={setOpenInsertModal}
        >
          <MemberInsert />
        </Modal>
      </div>
    </div>
  );
};

export default MemberManager;

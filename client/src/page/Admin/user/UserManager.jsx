import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import Toggle from "../../../components/Toggle/Toggle";
import TableV2 from "../../../components/Table/TableV2";
import Button from "../../../components/Buttons/Button";
import { FiAlertCircle } from "react-icons/fi";
import {
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import Modal from "../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import UserEdit from "./UserEdit";
import RegisterPage from "../../login/RegisterPage";
import UserInsert from "./UserInsert";

const columnsTable = [
  <input type="checkbox" name="" id="" />,
  "Tài khoản",
  "Họ và Tên",
  "Email",
  "Ngày tạo",
  "Trạng thái",
  "Chức năng",
];
const UserManager = () => {
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const TableData = [
    [
      <input type="checkbox" name="" id="" />,
      "manhdung",
      "Mạnh Dũng",
      "dung@gmail.com",
      "27/05/2019",
      "Đang hoạt động",
      <div className="flex justify-center">
        <Button
          icon={<FiAlertCircle className="text-[18px]" />}
          colorBgr={"bg-yellow-400 text-white hover:bg-yellow-800"}
        />
        <Button
          icon={<TbEdit className="text-[18px]" />}
          colorBgr={"bg-green-500 text-white hover:bg-green-800"}
        />
        <Button
          icon={<AiOutlineDelete className="text-[18px]" />}
          colorBgr={"bg-red-600 text-white hover:bg-red-800"}
        />
      </div>,
    ],
    [
      <input type="checkbox" name="" id="" />,
      "manhdung",
      "Mạnh Dũng",
      "dung@gmail.com",
      "27/05/2019",
      "Chưa duyệt",
      <div className="flex justify-center">
        <Button
          onClick={() => navigate(`/admin/user/1`)}
          icon={<FiAlertCircle className="text-[18px]" />}
          colorBgr={"bg-yellow-400 text-white hover:bg-yellow-800"}
        />
        <Button
          onClick={() => setOpenEditModal(true)}
          icon={<TbEdit className="text-[18px]" />}
          colorBgr={"bg-green-500 text-white hover:bg-green-800"}
        />
        <Button
          onClick={() => setOpenDeleteModal(true)}
          icon={<AiOutlineDelete className="text-[18px]" />}
          colorBgr={"bg-red-600 text-white hover:bg-red-800"}
        />
      </div>,
    ],
  ];

  const [isPublic, setIsPublic] = useState(false);
  return (
    <div>
      <Card title={"Thông tin chung"} className="overflow-visible">
        <Card.Content>
          <h3>I Love You So Much</h3>
          <Toggle
            label="Công khai"
            value={!!isPublic}
            onChange={(e) => setIsPublic(e)}
          />
          <TableV2 dataSource={TableData} columns={columnsTable} />
          <div className="mt-3 flex">
            <Button
              onClick={() => setOpenInsertModal(true)}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
              title={"Thêm tài khoản"}
              colorBgr={"border border-gray-700 hover:bg-gray-200"}
            />
            <Button
              icon={<AiOutlineCheckCircle className="text-[18px]" />}
              title={"Duyệt các lựa chọn"}
              colorBgr={"bg-green-600 hover:bg-green-800 text-white"}
            />
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-600 hover:bg-red-900 text-white"}
            />
          </div>
        </Card.Content>
      </Card>

      <Modal
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
      </Modal>
    </div>
  );
};

export default UserManager;

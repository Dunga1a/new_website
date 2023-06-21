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

const BusinessArea = () => {
  const [openNewForm, setOpenNewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [businessArea, setBusinessArea] = useState([]);
  const [idBusinessArea, setIdBusinessArea] = useState();
  const columns = ["STT", "Tên gọi lĩnh vực kinh doanh", "Trạng Thái", ""];
  const fetchData = () => {
    const data = [
      {
        name: "Bất động sản",
        status: true,
      },
      {
        name: "Công nghệ thông tin",
        status: false,
      },
    ];
    const newData = data.map((item, idx) => {
      return [
        <p>{idx + 1}</p>,
        <p>{item.name}</p>,
        <input type="checkbox" name="" id="" checked={item.status} />,
        <div className="flex gap-1">
          <Button
            colorText={"text-white"}
            colorBgr={"bg-blue-600"}
            colorHover={"bg-blue-700"}
            icon={<TbEdit className="text-[18px]" />}
            onClick={() => {
              setOpenEditForm(true);
              setIdBusinessArea(idx);
            }}
          />
          <Button
            colorText={"text-white"}
            colorBgr={"bg-red-700"}
            colorHover={"bg-red-800"}
            icon={<AiOutlineDelete className="text-[18px]" />}
            onClick={() => {
              setOpenDeleteForm(true);
              setIdBusinessArea(idx);
            }}
          />
        </div>,
      ];
    });
    setBusinessArea(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Card.Content>
          <TableV2 columns={columns} dataSource={businessArea} />
        </Card.Content>
      </Card>

      <Modal
        open={openNewForm}
        setOpen={setOpenNewForm}
        title={"Thêm mới lĩnh vực kinh doanh"}
        classNameChildren={"w-[600px]"}
      >
        <FormBusinessAreaNew />
      </Modal>

      <Modal
        open={openEditForm}
        setOpen={setOpenEditForm}
        title={"Sửa lĩnh vực kinh doanh"}
        classNameChildren={"w-[600px]"}
      >
        <FormBusinessAreaEdit idBusinessArea={idBusinessArea} />
      </Modal>

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

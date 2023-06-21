import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import TableV2 from "../../../components/Table/TableV2";
import Button from "../../../components/Buttons/Button";
import FormEvent from "./FormEvent";
import Modal from "../../../components/Modal/Modal";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import FormNew from "./FormNew";
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";

const initValue = {
  title: "",
  address: "",
  leader: "",
  date_start: "",
  date_end: "",
  time_end: "",
  content: "",
  image: [],
};

const EventManager = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [eventOne, setEventOne] = useState();
  const handleFetchData = () => {
    // setValue({
    //   title: "Đây là title lấy ở api lên",
    //   address: "Đây là địa chỉ lấy ở api lên",
    //   leader: "Đây là chủ tịch lấy ở api lên",
    //   date_start: "2023-05-26",
    //   date_end: "2023-05-26",
    //   time_end: "11:12",
    //   time_start: "11:12",
    //   content: "Đây là lấy từ api ",
    //   image: [
    //     "https://supabase.com/dashboard/project/tsddbwptfwiyathksqae/storage/buckets/images",
    //   ],
    // });
    setOpenEdit(true);
  };
  const columns = [
    <input type="checkbox" name="" id="" />,
    "Thời Gian Diễn Ra",
    "Sự Kiện",
    "Thao Tác",
  ];

  const data = [
    [
      <input type="checkbox" name="" id="" />,

      <p>
        <p>16/04/2019</p>
        <span>"7:30 - 11:30"</span>
      </p>,
      <span>
        "Hội nghị Lãnh đạo thành phố gặp gỡ chuyên gia tri thức, doanh nhân kiều
        ...
      </span>,
      <div className="flex justify-center gap-1">
        <Button
          icon={<AiFillEdit className="text-[18px]" />}
          onClick={handleFetchData}
          colorBgr={"bg-green-500 text-white hover:bg-green-800"}
        />
        <Button
          icon={<AiOutlineDelete className="text-[18px]" />}
          colorBgr={"bg-red-600 text-white hover:bg-red-800"}
          onClick={(id) => handleDeleteOne(5)}
        />
      </div>,
    ],
  ];

  const handleDeleteOne = async (id) => {
    setEventOne({ id: id });
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
        <Card.Content>
          <TableV2 columns={columns} dataSource={data} />
        </Card.Content>
      </Card>

      <Modal
        open={open}
        setOpen={setOpen}
        title={"Thêm mới sự kiện"}
        classNameChildren={"w-[1000px]"}
      >
        <FormNew initValue={initValue} />
      </Modal>

      <Modal
        open={openEdit}
        setOpen={setOpenEdit}
        title={"Sua sự kiện"}
        classNameChildren={"w-[1000px]"}
      >
        <FormEdit />
      </Modal>

      <Modal open={openDelete} setOpen={setOpenDelete}>
        {eventOne ? <FormDelete eventOne={eventOne} /> : null}
      </Modal>
    </>
  );
};

export default EventManager;

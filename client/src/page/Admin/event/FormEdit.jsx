import React from "react";
import FormEvent from "./FormEvent";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";

const FormEdit = ({ eventItem, setOpen, fetchData }) => {
  const [value, setValue] = useState({
    id: eventItem.id,
    title: eventItem.title,
    address: eventItem.address,
    leader: eventItem.leader,
    date_start: dayjs(eventItem.date_start).format("YYYY-MM-DD"),
    date_end: eventItem.date_end
      ? dayjs(eventItem.date_end).format("YYYY-MM-DD")
      : "",
    time: eventItem.time,
    content: eventItem.content,
    image: [],
    file_pdf: eventItem.file_pdf,
  });
  console.log("vao day: ", eventItem);

  const onSave = async (data) => {
    try {
      const { image, selectedFiles, ...values } = data;
      // console.log(data);
      const result = await axios.post(
        "http://localhost:3001/api/event/editEvent",
        { ...values, id: eventItem.id },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setOpen(false);
      fetchData();
      toast.success("Sửa sự kiện thành công");
    } catch (error) {
      toast.error("Sửa sự kiện thất bại");
    }
  };
  return (
    <div>
      <FormEvent initValue={value} onSave={onSave} />
    </div>
  );
};

export default FormEdit;

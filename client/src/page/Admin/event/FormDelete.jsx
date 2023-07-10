import React from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

const FormDelete = ({ eventItem }) => {
  return (
    <>
      <div className="text-[18px] ">
        <AiOutlineCloseCircle className="w-[60px] h-[60px] text-red-600 m-auto" />
        <p className="font-bold">Bạn có chắc muốn xóa:</p>{" "}
        <span>{eventItem.title}</span>
      </div>
    </>
  );
};

export default FormDelete;

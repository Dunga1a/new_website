import axios from "axios";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const FormDelete = ({ setOpen, value, fetchData }) => {
  const handleDelete = async () => {
    const commentDelete = value.map((item) => item.id);
    try {
      await axios
        .delete(`${DOMAIN}/api/comment/deletedManyEvent`, {
          data: commentDelete,
          withCredentials: true,
        })
        .then(() => {
          toast.success("Xóa bình luân thành công");
          setOpen(false);
          fetchData();
        });
    } catch (error) {
      console.log(error.message);
    }
    // console.log("commentDelete: ", commentDelete);
  };
  return (
    <div className="text-[18px] ">
      <AiOutlineCloseCircle className="w-[60px] h-[60px] text-red-600 m-auto" />
      <p className="font-bold">Bạn có chắc muốn xóa bình luận không ?</p>{" "}
      <div className="flex justify-around bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className={`bg-red-600 text-white  w-[30%] mt-3 inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
          onClick={handleDelete}
        >
          Đồng Ý
        </button>

        <button
          type="button"
          className={`w-[30%] inline-flex
                    mt-3  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={() => setOpen(false)}
        >
          Thoát
        </button>
      </div>
    </div>
  );
};

export default FormDelete;

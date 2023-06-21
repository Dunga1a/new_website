import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import RightBar from "../../components/list/RightBar";
import Breadcrumbs from "../../components/Breadcrumb";

const menuOffice = [
  {
    id: 1,
    title: "Văn phòng",
    href: "/office",
  },
  {
    id: 2,
    title: "Ban tổ chức",
    href: "/office",
  },
  {
    id: 3,
    title: "Ban tuyên giáo",
    href: "/office",
  },
  {
    id: 4,
    title: "Ban Dân vận",
    href: "/office",
  },
  {
    id: 5,
    title: "Ủy ban kiểm tra",
    href: "/office",
  },
  {
    id: 6,
    title: "Ban nội chính",
    href: "/office",
  },
];
const Incorporation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ulRef = useRef(null);
  const handleClick = (item) => {
    navigate(item.href, { state: { item } });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ulRef.current && !ulRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ulRef]);
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Cơ Cấu tổ chức"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
          <div className="flex items-center justify-between">
            <h2 className=" cursor-pointer text-[#0707CE] font-bold hover:opacity-70 hover:underline">
              <div
                onClick={() =>
                  handleClick({ id: 7, title: "Ban tổ chức", href: "/oganize" })
                }
              >
                Ban Tổ Chức
              </div>
            </h2>
            <div className=" relative phone:hidden laptop:block desktop:block tablet:hidden ">
              <button
                className="px-2 py-1 hover:bg-gray-100 border-[1px] border-[#838383] rounded"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <IoMdArrowDropdown />
              </button>
              {open && (
                <ul
                  ref={ulRef}
                  className=" cursor-pointer w-[150px] bg-white z-20 drop-shadow-new text-sm py-3 border-[1px] border-solid border-[#ababab] rounded-xl absolute left-0"
                >
                  {menuOffice.map((item) => (
                    <li className="py-1 px-6 hover:bg-gray-100" key={item.id}>
                      {" "}
                      <div onClick={() => handleClick(item)}>
                        {item.title}
                      </div>{" "}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="relative overflow-x-auto mt-4">
            <table className="table-auto border border-collapse w-full text-center border-[#dddddd] text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 border border-collapse border-[#dddddd]"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className=" border border-collapse border-[#dddddd] px-6 py-3"
                  >
                    Họ tên
                  </th>
                  <th
                    scope="col"
                    className=" border border-collapse border-[#dddddd] px-6 py-3"
                  >
                    Chức danh chính
                  </th>
                  <th
                    scope="col"
                    className=" border border-collapse border-[#dddddd] px-6 py-3"
                  >
                    Ảnh
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 border border-collapse border-[#dddddd] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4 text-[#0707CE] border border-collapse border-[#dddddd] font-bold hover:opacity-70 hover:underline">
                    <a href="">Nguyễn Hùng Dũng</a>
                  </td>
                  <td className=" text-[#333] border border-collapse border-[#dddddd] px-6 py-4">
                    <strong>Chủ tịch - Trưởng ban</strong>
                  </td>
                  <td className=" border border-collapse border-[#dddddd] px-6 py-4">
                    <a href="">
                      <img
                        src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                        className="max-w-[60px] text-center inline"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Incorporation;

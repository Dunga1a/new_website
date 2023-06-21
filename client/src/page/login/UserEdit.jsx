import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";

const arrContent = [
  { title: "Cơ bản", slug: "basic" },
  { title: "Hình đại điện", slug: "avatar" },
  { title: "Email", slug: "email" },
  { title: "Mật khẩu", slug: "password" },
  { title: "Xác thực hai bước", slug: "two-step-veri" },
  { title: "Câu hỏi bảo mật", slug: "question" },
  { title: "Nhóm", slug: "group" },
  { title: "Chế độ an toàn", slug: "safe-mode" },
];

const logOut = () => {
  //confirm("Are you sure you want to log out?");
  localStorage.setItem("user", null);
  window.location.reload();
};

const UserEdit = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const logOut = () => {
    alert("Tài khoản của bạn sẽ đăng xuất?");
    localStorage.setItem("user", null);
    window.location.reload();
  };
  return (
    <div>
      <h3 className="mt-5 mb-4 font-bold text-[19px]">Thiết lập tài khoản</h3>
      <ul className="flex flex-wrap">
        {arrContent.map((item, idx) => (
          <li
            className={`${
              idx === active ? "bg-[#428bca] text-white" : "hover:bg-gray-100"
            } px-2 py-1 rounded-md text-[14px] phone:text-[16px] laptop:text-[14px] tablet:text-[14px] mr-1 text-[#494949] cursor-pointer`}
            key={idx}
            onClick={() => {
              setActive(idx);
              navigate(`/user/editinfo/${item.slug}`);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className="bg-[#eeeeee] p-4 mt-3 border-[1px] shadow-sm rounded-md border-[#ccc]">
        <Outlet />
      </div>
      <ul className="flex justify-start gap-3 mt-3 text-[13px]">
        <li className="flex items-center cursor-pointer">
          <BsFillCaretRightFill />
          <span>Thông tin thành viên</span>
        </li>
        <li className="flex items-center cursor-pointer" onClick={logOut}>
          <BsFillCaretRightFill />
          <span>Thoát</span>
        </li>
      </ul>
    </div>
  );
};

export default UserEdit;

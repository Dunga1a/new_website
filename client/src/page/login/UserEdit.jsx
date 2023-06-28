import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";

const arrContent = [
  { title: "Cơ bản", slug: "basic" },
  { title: "Hình đại điện", slug: "avatar" },
  { title: "Email", slug: "email" },
  { title: "Mật khẩu", slug: "password" },
];

const UserEdit = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const path = new URL(url).pathname;
  const lastSegment = path.split("/").pop();
  const [pathCurrent, setPathCurrent] = useState(lastSegment);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (pathCurrent !== "") {
      navigate(`/user/editinfo/${pathCurrent}`);
    }
  }, [pathCurrent]);

  const handleClick = (item) => {
    navigate(`/user/editinfo/${item.slug}`);
    setPathCurrent(item.slug);
  };
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
              item.slug === pathCurrent
                ? "bg-[#428bca] text-white"
                : "hover:bg-gray-100"
            } px-2 py-1 rounded-md text-[14px] phone:text-[16px] laptop:text-[14px] tablet:text-[14px] mr-1 text-[#494949] cursor-pointer`}
            key={idx}
            onClick={() => handleClick(item)}
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

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Button";

const arrContent = [
  { title: "Cơ bản", slug: "/user/editinfo/basic" },
  { title: "Hình đại điện", slug: "/user/editinfo/avatar" },
  { title: "Email", slug: "/user/editinfo/email" },
  { title: "Mật khẩu", slug: "/user/editinfo/password" },
];

const UserEdit = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const url = window.location.href;
  const path = new URL(url).pathname;

  const [pathCurrent, setPathCurrent] = useState(path);

  useEffect(() => {
    if (pathCurrent !== path) {
      navigate(pathCurrent);
    }
  }, [pathCurrent]);

  const handleClick = (item) => {
    setPathCurrent(item.slug);
  };

  const logOut = () => {
    //alert("Tài khoản của bạn sẽ đăng xuất?");
    localStorage.setItem("user", null);
    window.location.reload();
  };

  console.log("vao day: ", url, path, pathCurrent);
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
        <li
          onClick={() => {
            navigate("/user/", { replace: true, state: { reload: true } });
            window.location.reload();
          }}
          className="flex items-center cursor-pointer"
        >
          <BsFillCaretRightFill />
          <span>Thông tin thành viên</span>
        </li>
        <li
          className="flex items-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BsFillCaretRightFill />
          <span>Thoát</span>
        </li>
      </ul>
      <Modal open={open} setOpen={setOpen} title={"Bạn muốn đăng xuất ?"}>
        <div className=" flex justify-center">
          <Button
            title={"Có"}
            colorBgr={"text-white bg-red-700 hover:bg-red-800 px-8"}
            onClick={logOut}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserEdit;

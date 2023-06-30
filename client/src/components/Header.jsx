import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Modal from "./Modal/Modal";
import Button from "./Buttons/Button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const logOut = () => {
    //confirm("Bạn chắc chắn muốn đăng xuất?");
    localStorage.setItem("user", null);
    window.location.href = "/";
  };
  return (
    <div className="max-w-[1080px] m-auto relative drop-shadow-new">
      <div className="w-full h-[30px] bg-[#1f9cf8]">
        {currentUser && (
          <ul className="flex float-right text-[#fff] text-[12px] justify-center items-center pt-[5px] mx-[10px]">
            <li
              onClick={() => navigate("/user/")}
              className=" cursor-pointer inline-block px-[5px] border-r-[1px] border-r-[#fff] relative hover:text-gray-200"
            >
              <div className="text-[14px]">{currentUser.username}</div>
            </li>
            <li
              onClick={() => setOpen(true)}
              className="cursor-pointer inline-block px-[5px] hover:text-gray-200"
            >
              <div className="text-[14px]">Đăng xuất</div>
            </li>
          </ul>
        )}
      </div>
      <div className=" header_banner_img items-center grid grid-flow-col auto-cols-max desktop:gap-6 laptop:gap-6 phone:gap-4 tablet:gap-4 relative">
        <img
          onClick={() => navigate("/")}
          src="/assets/images/logo-107x107.png"
          alt=""
          className="pl-[10px] py-[12px] desktop:w-auto desktop:h-auto phone:w-[90px]"
        />
        <div>
          <span className="text-[21px] text-[#0256f4]">
            Cổng thông tin điện tử
          </span>
          <h2 className="font-bold desktop:text-[25px] laptop:text-[25px] phone:text-[14px] tablet:text-[15px] text-[#0256f4]">
            Hội Doanh Nhân Thanh Hóa Tại Hà Nội
          </h2>
        </div>
      </div>
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

export default Header;

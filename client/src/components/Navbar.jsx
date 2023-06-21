import React from "react";
import NavbarArr from "./NavbarArr";
import { IoHome } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillCaretDown } from "react-icons/ai";
import SideBar from "./Sidebar";

const contentArr = [
  [
    { href: "/news" },

    [
      {
        title: "Tin tức",
        slug: "tin-tuc",
        subCategory: [
          {
            title: "Tin Hội Viên",
            slug: "tin-hoi-vien",
          },
          {
            title: "Tin Tức Thanh Hóa",
            slug: "tin-tuc-thanh-hoa",
          },
          {
            title: "Tin Hoạt Động",
            slug: "tin-hoat-dong",
          },
        ],
      },
      {
        title: "Hoạt động",
        slug: "hoat-dong",
      },
    ],
  ],
  [
    { href: "/user" },

    [
      {
        title: "Đăng nhập",
        slug: "login",
      },
      {
        title: "Đăng ký",
        slug: "register",
      },
      {
        title: "Khôi phục mật khẩu",
        slug: "lostpass",
      },
      {
        title: "Thiết lập tài khoản",
        slug: "editinfo",
      },
      {
        title: "Danh sách thành viên",
        slug: "",
      },
      {
        title: "Thoát",
        slug: "quyen-loi-hoi-voi",
      },
    ],
  ],
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  return (
    <div className="max-w-[1080px] m-auto">
      <div className=" laptop:flex desktop:flex tablet:hidden phone:hidden relative bg-[#0083eb] flex items-center justify-between z-30">
        <div className="menu-conner-left drop-shadow-xl"></div>
        <div className="menu-conner-right drop-shadow-xl tablet:hidden laptop:hidden desktop:block"></div>
        <ul className="flex items-center  text-[#fff] uppercase desktop:text-[12px] laptop:text-[12px] tablet:text-[7px] font-bold">
          <li className="block hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA] tablet:text-[12px]">
            <div
              className="laptop:h-[44px] laptop:text-[16px] laptop:px-4 desktop:px-4 desktop:text-[18px] tablet:h-[40px] px-[14px] tablet:px-[8px] flex items-center"
              onClick={() => navigate("/")}
            >
              <span>
                <IoHome />
              </span>
            </div>
          </li>
          <li className="block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              onClick={() => navigate("/introduction")}
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px] px-6 flex items-center cursor-pointer"
            >
              <span>Giới thiệu</span>
              <span className="text-[12px] ml-[3px]">
                <AiFillCaretDown />
              </span>
            </div>
            <ul className="bg-[#fff] w-[200px] drop-shadow-xl top-[44px] absolute hidden text-black group-hover:block transition duration-350 ease-in-out">
              <li className="block">
                {" "}
                <div
                  className="cursor-pointer block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                  onClick={() => navigate("/introduction")}
                >
                  Giới Thiệu Hiệp Hội
                </div>{" "}
              </li>
              <li>
                {" "}
                <div
                  className="cursor-pointer block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                  onClick={() => navigate("/regulations")}
                >
                  điều lệ hoạt động
                </div>{" "}
              </li>
              <li
                className="block cursor-pointer"
                onClick={() => navigate("/ban-chap-hanh-hiep-hoi")}
              >
                {" "}
                <div className="block py-[6px] px-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                  Ban chấp hành hiệp hội
                </div>{" "}
              </li>
              <li>
                {" "}
                <div
                  className="cursor-pointer block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                  onClick={() => navigate("/solution")}
                >
                  Phương hướng hoạt động
                </div>{" "}
              </li>
            </ul>
          </li>

          <li className="block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              href="#"
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px] px-6 flex items-center cursor-pointer"
              onClick={() => navigate("/member")}
            >
              <span>Hội Viên</span>
              <span className="text-[12px] ml-[3px]">
                <AiFillCaretDown />
              </span>
            </div>
            <ul className="bg-[#fff] w-[200px] drop-shadow-xl top-[44px] absolute hidden text-black group-hover:block transition duration-350 ease-in-out">
              <li
                className="block cursor-pointer"
                onClick={() => navigate("/member")}
              >
                {" "}
                <div className="block py-[6px] px-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                  Danh sách hội viên
                </div>{" "}
              </li>
              <li
                className="block cursor-pointer"
                onClick={() => navigate("/quyen-loi-hoi-vien")}
              >
                {" "}
                <div className="block py-[6px] px-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                  Quyền lợi hội viên
                </div>{" "}
              </li>
              <li
                className="block cursor-pointer"
                onClick={() => navigate("/dang-ky-hoi-vien")}
              >
                {" "}
                <div className="block py-[6px] px-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                  Đăng ký hội viên
                </div>{" "}
              </li>
            </ul>
          </li>
          <li className="cursor-pointer block group/item relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              onClick={() => navigate("/news")}
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px] px-6 flex items-center"
            >
              <span>Điểm tin</span>
              <span className="text-[12px] ml-[3px]">
                <AiFillCaretDown />
              </span>
            </div>
            <NavbarArr arr={contentArr[0]} />
          </li>

          <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
              onClick={() => navigate("/events-page")}
            >
              <span>Sự kiện</span>
            </div>
          </li>
          <li className="block group/item cursor-pointer relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              href="#"
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
              onClick={() => navigate("/user")}
            >
              <span>Thành Viên</span>
              <span className="text-[12px] ml-[3px]">
                <AiFillCaretDown />
              </span>
            </div>
            <NavbarArr arr={contentArr[1]} />
          </li>
          <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              onClick={() => navigate("/contact-page")}
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px] px-6 flex items-center"
            >
              <span>Liên hệ</span>
              <span className="text-[12px] ml-[3px]">
                <AiFillCaretDown />
              </span>
            </div>
            <ul className="bg-[#fff] w-[200px] drop-shadow-xl top-[44px] absolute hidden text-black group-hover:block transition duration-350 ease-in-out">
              <li className="block">
                {" "}
                <div className="block py-[6px] px-[8px] font-light truncate hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                  Ban biên tập Cổng thông tin điện tử Hội Doanh Nhân Thanh Hóa
                  Tại Hà Nội
                </div>{" "}
              </li>
            </ul>
          </li>
          <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
              onClick={() => navigate("/search")}
            >
              <span>Tìm kiếm</span>
            </div>
          </li>
        </ul>
      </div>
      <div className=" laptop:hidden desktop:hidden phone:block tablet:block">
        <SideBar props={contentArr} />
      </div>
    </div>
  );
};

export default Navbar;

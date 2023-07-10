import { Outlet, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { SiLevelsdotfyi } from "react-icons/si";
import { BiNews, BiCategoryAlt, BiBell } from "react-icons/bi";
import {
  MdCardMembership,
  MdOutlineConnectWithoutContact,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { TbTimelineEventText } from "react-icons/tb";

import { IoLogOutOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";

import { IoIosBusiness } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/authContext";

const prevHref = "/admin";

const navigation = [
  {
    name: "Dashboard",
    href: `${prevHref}`,
    icon: AiFillDashboard,
    current: true,
  },
  {
    name: "Quản Lý Chức Vụ",
    href: `${prevHref}/role`,
    icon: SiLevelsdotfyi,
    current: false,
  },
  {
    name: "Quản Lý Danh Mục",
    href: `${prevHref}/category`,
    icon: BiCategoryAlt,
    current: false,
  },
  {
    name: "Quản Lý Tin Tức",
    href: `${prevHref}/news`,
    icon: BiNews,
    current: false,
  },
  {
    name: "Quản Lý Lĩnh Vực Kinh Doanh",
    href: `${prevHref}/business-area`,
    icon: IoIosBusiness,
    current: false,
  },
  {
    name: "Quản Lý Chức Vụ Hội Viên",
    href: `${prevHref}/organize`,
    icon: MdCardMembership,
    current: false,
  },
  {
    name: "Quản Lý Hội Viên",
    href: `${prevHref}/member`,
    icon: HiUserGroup,
    current: false,
  },
  {
    name: "Quản Lý Người Dùng",
    href: `${prevHref}/user`,
    icon: FaUserAlt,
    current: false,
  },
  {
    name: "Quản Lý Sự Kiện",
    href: `${prevHref}/event`,
    icon: TbTimelineEventText,
    current: false,
  },
  {
    name: "Quản Lý Liên Hệ",
    href: `${prevHref}/contact`,
    icon: MdOutlineConnectWithoutContact,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const url = window.location.href;
  const path = new URL(url).pathname;
  const [pathCurrent, setPathCurrent] = useState(path);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (pathCurrent !== "") {
      navigate(pathCurrent);
    }
  }, [pathCurrent]);

  const handleClick = (item) => {
    setPathCurrent(item.href);
  };

  const logOut = () => {
    //confirm("Bạn chắc chắn muốn đăng xuất?");
    localStorage.setItem("user", null);
    window.location.href = "/";
  };

  return (
    <>
      <div
        onClick={() => {
          setOpenAlert(false);
          setOpenUser(false);
        }}
      >
        {/* Static sidebar for desktop */}
        <div className="desktop:fixed desktop:inset-y-0 desktop:z-20 desktop:flex desktop:w-72 desktop:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-16 w-auto mt-3"
                src="/assets/images/logo-107x107.png"
                alt="Your Company"
                onClick={() => navigate("/")}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item)}
                          href={item.href}
                          className={classNames(
                            item.href === pathCurrent
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <div
                    onClick={() => navigate("/user")}
                    className=" cursor-pointer flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src={
                        currentUser && currentUser.image !== null
                          ? `/uploads/${currentUser.image}`
                          : "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                      }
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      {currentUser && currentUser.username}
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-10 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm ">
          <span className="sr-only">Open sidebar</span>
          {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>
          <div className="relative mr-8 drop-shadow-new">
            <BiBell
              className="text-[26px] text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();

                setOpenAlert(true);
                setOpenUser(false);
              }}
            />
            {openAlert && (
              <div className=" absolute min-w-[400px] right-0 transition-all ease-in-out duration-300 delay-1000 bg-white rounded-lg overflow-hidden py-2">
                <ul className=" overflow-y-auto max-h-[320px]">
                  <li
                    className="flex flex-row p-2 border-b border-b-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("oke");
                    }}
                  >
                    <span className="">
                      <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348838487_642247323999866_2890462815359171085_n.jpg?stp=dst-jpg_p600x600&_nc_cat=107&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KBlAgJK_fiIAX-rmWFp&_nc_ht=scontent.fhan17-1.fna&oh=00_AfB_NQAEixWXo48pX9oIW__PZNiiuI461HFOzMkqWMAvcQ&oe=647B5BA7"
                        alt=""
                        className="w-[220px] h-[80px] object-cover"
                      />
                    </span>
                    <span className="ml-2">
                      <b>Tên bài viết</b>
                      <p>Tác giả</p>
                      <p className="line-clamp-2">
                        Mình không nghĩ trai trường Mỏ tồi như thế đâu, thả
                        thích cho lắm xong ghost con nhà người ta luôn được :))
                        Thật sự thấy các bạn nên học lại đạo đức đi ạ
                      </p>
                    </span>
                  </li>
                  <li className="flex flex-row p-2 border-b border-b-red-600">
                    <span className="">
                      <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348838487_642247323999866_2890462815359171085_n.jpg?stp=dst-jpg_p600x600&_nc_cat=107&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KBlAgJK_fiIAX-rmWFp&_nc_ht=scontent.fhan17-1.fna&oh=00_AfB_NQAEixWXo48pX9oIW__PZNiiuI461HFOzMkqWMAvcQ&oe=647B5BA7"
                        alt=""
                        className="w-[220px] h-[80px] object-cover"
                      />
                    </span>
                    <span className="ml-2">
                      <b>Tên bài viết</b>
                      <p>Tác giả</p>
                      <p className="line-clamp-2">
                        Mình không nghĩ trai trường Mỏ tồi như thế đâu, thả
                        thích cho lắm xong ghost con nhà người ta luôn được :))
                        Thật sự thấy các bạn nên học lại đạo đức đi ạ
                      </p>
                    </span>
                  </li>
                  <li className="flex flex-row p-2 border-b border-b-red-600">
                    <span className="">
                      <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348838487_642247323999866_2890462815359171085_n.jpg?stp=dst-jpg_p600x600&_nc_cat=107&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KBlAgJK_fiIAX-rmWFp&_nc_ht=scontent.fhan17-1.fna&oh=00_AfB_NQAEixWXo48pX9oIW__PZNiiuI461HFOzMkqWMAvcQ&oe=647B5BA7"
                        alt=""
                        className="w-[220px] h-[80px] object-cover"
                      />
                    </span>
                    <span className="ml-2">
                      <b>Tên bài viết</b>
                      <p>Tác giả</p>
                      <p className="line-clamp-2">
                        Mình không nghĩ trai trường Mỏ tồi như thế đâu, thả
                        thích cho lắm xong ghost con nhà người ta luôn được :))
                        Thật sự thấy các bạn nên học lại đạo đức đi ạ
                      </p>
                    </span>
                  </li>
                  <li className="flex flex-row p-2 border-b border-b-red-600">
                    <span className="">
                      <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/348838487_642247323999866_2890462815359171085_n.jpg?stp=dst-jpg_p600x600&_nc_cat=107&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=KBlAgJK_fiIAX-rmWFp&_nc_ht=scontent.fhan17-1.fna&oh=00_AfB_NQAEixWXo48pX9oIW__PZNiiuI461HFOzMkqWMAvcQ&oe=647B5BA7"
                        alt=""
                        className="w-[220px] h-[80px] object-cover"
                      />
                    </span>
                    <span className="ml-2">
                      <b>Tên bài viết</b>
                      <p>Tác giả</p>
                      <p className="line-clamp-2">
                        Mình không nghĩ trai trường Mỏ tồi như thế đâu, thả
                        thích cho lắm xong ghost con nhà người ta luôn được :))
                        Thật sự thấy các bạn nên học lại đạo đức đi ạ
                      </p>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800 cursor-pointer"
              src={
                currentUser && currentUser.image !== null
                  ? `/uploads/${currentUser.image}`
                  : "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt=""
              onClick={(e) => {
                e.stopPropagation();

                setOpenAlert(false);
                setOpenUser(true);
              }}
            />
            {openUser && (
              <ul className=" absolute right-0 min-w-[100px] bg-white rounded-lg drop-shadow-2xl overflow-hidden">
                <li
                  className="px-3 py-2 cursor-pointer font-medium hover:bg-gray-100"
                  onClick={() => navigate("/user")}
                >
                  Your profile
                </li>
                <li
                  onClick={logOut}
                  className="flex items-center px-3 py-2 cursor-pointer font-medium hover:bg-gray-100 hover:scale-[1.1]"
                >
                  <IoLogOutOutline />
                  LogOut
                </li>
              </ul>
            )}
          </div>
        </div>

        <main className="py-10 desktop:pl-72">
          <div className="px-4 phone:px-6 desktop:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

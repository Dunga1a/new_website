import React from "react";
import { useNavigate } from "react-router";
import {
  MdOutlineRememberMe,
  MdOutlineNewspaper,
  MdOutlineEvent,
  MdOutlineSend,
  MdOutlineLogout,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
const SideBar = ({ props }) => {
  const navigate = useNavigate();
  // console.log(props[1]);
  // console.log(props[1][1][1]);
  const href = props[0][0].href;
  const hrefLog = props[1][0].href;
  const handleClick = (item) => {
    navigate(`${hrefLog}/${item.slug}`, { state: { item } });
    window.location.reload();
  };

  const handleSubItemClick = (subItem) => {
    navigate(`${href}/${subItem.slug}`, { state: { item: subItem } });
    window.location.reload();
  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Giới thiệu
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-pages" className="hidden py-2 space-y-2">
                <li>
                  <div
                    onClick={() => {
                      navigate("/introduction");
                      window.location.reload();
                    }}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Giới thiệu hiệp hội
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigate("//regulations");
                      window.location.reload();
                    }}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Điều lệ hoạt động
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigate("/ban-chap-hanh-hiep-hoi");
                      window.location.reload();
                    }}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Ban chấp hành hiệp hội
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigate("/solution");
                      window.location.reload();
                    }}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Phương hướng hoạt động
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
              >
                <MdOutlineRememberMe className="text-[26px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Hội viên
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-sales" className="hidden py-2 space-y-2">
                <li>
                  <div
                    onClick={() => navigate("/member")}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Danh sách hội viên
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate("/quyen-loi-hoi-vien")}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Quyền lợi hội viên
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate("/dang-ky-hoi-vien")}
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Đăng ký hội viên
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-authentication"
                data-collapse-toggle="dropdown-authentication"
              >
                <MdOutlineNewspaper className="text-[26px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Điểm tin
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-authentication"
                className="hidden py-2 space-y-2"
              >
                {props[0][1].map((item, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      aria-controls="dropdown-li"
                      data-collapse-toggle="dropdown-li"
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {item.subCategory ? (
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {item.title}
                        </span>
                      ) : (
                        <span
                          className="flex-1 ml-3 text-left whitespace-nowrap"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubItemClick(item);
                          }}
                        >
                          {item.title}
                        </span>
                      )}
                      {item.subCategory && (
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </button>
                    <ul id="dropdown-li" className="hidden py-2 space-y-2">
                      {item.subCategory &&
                        item.subCategory.map((subItem, idx) => (
                          <li key={idx}>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubItemClick(subItem);
                              }}
                              className="flex items-center p-2 pl-20 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                              {subItem.title}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
                {/* <li>
                  <button
                    type="button"
                    aria-controls="dropdown-li"
                    data-collapse-toggle="dropdown-li"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Tin tức
                    </span>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <ul id="dropdown-li" className="hidden py-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-20 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Tin hoạt động
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-20 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Tin tức Thanh Hóa
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 pl-20 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Tin tức Hội viên
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Hoạt động
                  </a>
                </li> */}
              </ul>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/events-page");
                  window.location.reload();
                }}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineEvent className="text-[26px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Sự kiện</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/contact-page");
                  window.location.reload();
                }}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineSend className="text-[26px]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Liên hệ</span>
              </div>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-question"
                data-collapse-toggle="dropdown-question"
              >
                <FaUsers className="text-[26px]" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Thành viên
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-question" className="hidden py-2 space-y-2">
                {props[1][1].map((item, idx) => (
                  <li key={idx}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(item);
                      }}
                      className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {item.title === "Thoát" ? (
                        <>
                          <MdOutlineLogout className="text-[26px]" />
                          Thoát
                        </>
                      ) : (
                        item.title
                      )}
                    </div>
                  </li>
                ))}
                {/* <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Đăng nhập
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Đăng ký
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Khôi phục mật khẩu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Thiết lập tài khoản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Danh sách thành viên
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <MdOutlineLogout className="text-[26px]" />
                    Thoát
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

import React, { useContext } from "react";
import NavbarArr from "./NavbarArr";
import { IoHome, IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AiFillCaretDown } from "react-icons/ai";
import SideBar from "./Sidebar";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

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
        title: "Thành viên",
        slug: "",
      },

      {
        title: "Thoát",
        slug: "",
        onClick: true,
      },
    ],
  ],
];

const DOMAIN = process.env.REACT_APP_DOMAIN;
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
  const [arr, setArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [count, setCount] = useState();
  const [keysearch, setKeySearch] = useState("");
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
  const { currentUser } = useContext(AuthContext);

  const groupCommentsByFatherId = (comments) => {
    const commentMap = {};
    const topLevelComments = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const comment of comments) {
      const commentId = comment.news_category_id;

      if (!commentMap[commentId]) {
        commentMap[commentId] = {
          ...comment,
          children: [],
        };
      }

      const mappedComment = commentMap[commentId];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (comment.father_id) {
        if (!commentMap[comment.father_id]) {
          commentMap[comment.father_id] = {
            children: [],
          };
        }

        commentMap[comment.father_id].children.push(mappedComment);
      } else {
        topLevelComments.push(mappedComment);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (commentMap[commentId].children.length > 0) {
        mappedComment.children = commentMap[commentId].children;
      }
    }

    return topLevelComments;
  };

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const category = await axios.get(
        `${DOMAIN}/api/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      const group = groupCommentsByFatherId(category.data.newsCategories);

      setArr(group);
      setNewsCategory(category.data.newsCategories);
      setCount(category.data.countCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleClick = (item) => {
    navigate(`/news/${item.slug}`, { state: { item } });
  };

  const handleSubItemClick = (subItem) => {
    navigate(`/news/${subItem.slug}`, { state: { item: subItem } });
  };

  const handleSearch = () => {
    if (keysearch) {
      navigate(`/search?keyword=${keysearch}`);
      setIsOpen(false);
      setKeySearch("");
    } else {
      toast.warn("Vui lòng nhập từ khóa tìm kiếm", {
        autoClose: 3000,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Nếu người dùng nhấn phím Enter
      handleSearch();
    }
  };
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
            {/* <NavbarArr arr={arr} /> */}
            <ul className="bg-[#fff] w-[200px]  drop-shadow-xl top-[44px] absolute hidden text-black group-hover/item:block transition duration-350 ease-in-out">
              {arr &&
                arr.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        handleClick(item);
                      }}
                      className={`cursor-pointer relative ${
                        item.children ? "a" : ""
                      }`}
                    >
                      {" "}
                      <div className="cursor-pointer truncate block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
                        {item.name}
                      </div>{" "}
                      <ul
                        className={`absolute right-[-75%] top-0 ${
                          item.children ? "b" : ""
                        } bg-[#ccc]  w-[150px]  drop-shadow-xl  text-black group-hover:block transition duration-350 ease-in-out`}
                      >
                        {item.children &&
                          item.children.map((subItem, idx) => (
                            <li
                              className="cursor-pointer truncate block py-[6px] pl-[8px] pr-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubItemClick(subItem);
                              }}
                            >
                              {subItem.name}
                            </li>
                          ))}
                      </ul>
                    </li>
                  );
                })}
            </ul>
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
            </div>
          </li>
          {/* <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
            <div
              className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
              onClick={() => navigate("/search")}
            >
              <span>Tìm kiếm</span>
            </div>
          </li> */}

          {/* Nếu là hội viên thì hiển thị "Đăng bài viết" */}
          {currentUser && currentUser.member && (
            <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
              <div
                className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
                onClick={() => navigate("/memberManager/newsPost")}
              >
                <span>Quản lí bài viết</span>
              </div>
            </li>
          )}

          {currentUser &&
            currentUser.roles &&
            currentUser.roles.some((item) => item.name === "admin") && (
              <li className="cursor-pointer block group relative hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]">
                <div
                  className="laptop:h-[44px] tablet:h-[40px] desktop:text-[14px] laptop:text-[14px]  px-6 flex items-center"
                  onClick={() => navigate("/admin")}
                >
                  <span>Quản lí site</span>
                </div>
              </li>
            )}
        </ul>
        <div className="relative cursor-pointer">
          <span
            className="block p-[10px] pl-[13px] text-[#fff] border-l-[2px] text-[18px] hover:bg-gradient-to-b from-[#82b2dc] to-[#428BCA]  border-l-[#085798]"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <IoSearch />
          </span>
          {isOpen && (
            <div
              class="w-[400px] bg-gradient-to-l from-[#30cfd0] to-[#330867] rounded-lg absolute drop-shadow-new group-active:block left-[-360px] bottom-[-60px] py-[12px] px-[10px]"
              ref={inputRef}
            >
              <div class="sm:col-span-12">
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setKeySearch(e.target.value);
                      //console.log(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                    value={keysearch}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    className="block w-full text-[#0c0c0c] rounded-md font-normal text-[15px] border-0 bg-gradient-to-l from-[rgba(84,212,228,1)-0.2%] to-[rgba(170,221,241,1)-100%] py-1 pr-8 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[#66afe9]"
                  />
                  {/* background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%); */}
                  {/* background-image: linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%,   ); */}
                  {/* background-image: linear-gradient(to top, #30cfd0 0%, #330867
                  100%); */}
                  {/* background-image: linear-gradient( 270.3deg,
                  rgba(84,212,228,1) 0.2%, 100% ); */}
                  <span className=" absolute right-[10px] top-[8px] text-[18px] font-bold text-black">
                    <IoSearch onClick={handleSearch} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" laptop:hidden desktop:hidden phone:block tablet:block">
        <SideBar props={contentArr} />
      </div>
    </div>
  );
};

export default Navbar;

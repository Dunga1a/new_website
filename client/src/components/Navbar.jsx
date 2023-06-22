import React from "react";
import NavbarArr from "./NavbarArr";
import { IoHome } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AiFillCaretDown } from "react-icons/ai";
import SideBar from "./Sidebar";
import axios from "axios";

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
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState();

  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
  const [newsCategoryDelete, setNewsCategoryDelete] = useState([]);
  const [newsCategoryEdit, setNewsCategoryEdit] = useState();
  const [arr, setArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [count, setCount] = useState();
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
        `http://localhost:3001/api/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      const group = groupCommentsByFatherId(category.data.newsCategories);
      console.log(group);
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

  // console.log(arr);
  const handleClick = (item) => {
    navigate(`/news/${item.slug}`, { state: { item } });
  };

  const handleSubItemClick = (subItem) => {
    navigate(`/news/${subItem.slug}`, { state: { item: subItem } });
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

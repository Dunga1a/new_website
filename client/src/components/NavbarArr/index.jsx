import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./index.css";
import ModalV1 from "../Modal/ModalV1";
import { HiOutlineLogout } from "react-icons/hi";
import Button from "../Buttons/Button";
const NavbarArr = ({ arr }) => {
  const navigate = useNavigate();
  const href = arr[0].href;
  const [open, setOpen] = useState(false);

  const handleClick = (item) => {
    navigate(`${href}/${item.slug}`, { state: { item } });
  };

  const handleSubItemClick = (subItem) => {
    navigate(`${href}/${subItem.slug}`, { state: { item: subItem } });
  };
  const openModalLogout = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };
  return (
    <ul className="bg-[#fff] w-[200px] drop-shadow-xl absolute hidden text-black group-hover/item:block transition duration-350 ease-in-out">
      {arr[1].map((item, idx) => {
        return (
          <li
            key={idx}
            onClick={() => {
              if (item.onClick) {
                openModalLogout();
              }
              handleClick(item);
            }}
            className={`cursor-pointer relative ${item.subCategory ? "a" : ""}`}
          >
            {" "}
            <div className="cursor-pointer truncate block py-[6px] pl-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out">
              {item.title}
            </div>{" "}
            <ul
              className={`absolute right-[-75%] top-0 ${
                item.subCategory ? "b" : ""
              } bg-[#ccc]  w-[150px]  drop-shadow-xl  text-black group-hover:block transition duration-350 ease-in-out`}
            >
              {item.subCategory &&
                item.subCategory.map((subItem, idx) => (
                  <li
                    className="cursor-pointer truncate block py-[6px] pl-[8px] pr-[8px] font-light hover:bg-yellow-300 hover:text-[#fff] hover:font-bold transition duration-0 hover:duration-150 ease-in-out"
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubItemClick(subItem);
                    }}
                  >
                    {subItem.title}
                  </li>
                ))}
            </ul>
          </li>
        );
      })}
      <ModalV1
        classNameChildren={"desktop:w-[20%] phone:w-full tablet:w-[50%]"}
        open={open}
        setOpen={setOpen}
        title={<HiOutlineLogout className="w-12 h-12 m-auto " />}
      >
        <h1 className="font-semibold text-[18px]">
          Bạn có chắc muốn đăng xuất?
        </h1>
        <div className="flex justify-center mt-3">
          <Button
            title={"Đồng Ý"}
            colorBgr={"text-white bg-red-700 hover:bg-red-800 px-8"}
            onClick={handleLogout}
          />
        </div>
      </ModalV1>
    </ul>
  );
};

export default NavbarArr;

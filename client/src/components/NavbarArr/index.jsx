import React from "react";
import { useNavigate } from "react-router";
import "./index.css";
const NavbarArr = ({ arr }) => {
  const navigate = useNavigate();
  const href = arr[0].href;
  console.log(href);
  const handleClick = (item) => {
    navigate(`${href}/${item.slug}`, { state: { item } });
  };

  const handleSubItemClick = (subItem) => {
    navigate(`${href}/${subItem.slug}`, { state: { item: subItem } });
  };

  return (
    <ul className="bg-[#fff] w-[200px]  drop-shadow-xl top-[44px] absolute hidden text-black group-hover/item:block transition duration-350 ease-in-out">
      {arr[1].map((item, idx) => {
        return (
          <li
            key={idx}
            onClick={() => {
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
    </ul>
  );
};

export default NavbarArr;

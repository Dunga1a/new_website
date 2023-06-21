import React from "react";
import { BiRss } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const RssNav = ({ arr }) => {
  const navigate = useNavigate();
  //console.log(arr);
  const handleClick = (item) => {
    navigate(`/feeds/${item.slug}`, { state: { item } });
  };
  return (
    <ul className="pl-8">
      {arr.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className={`relative after:content after:h-[1px] after:w-[27px] after:absolute after:border-t-[#999] after:border-t-solid after:border-t-[1px] after:top-[22px] after:left-[-21px] ${
              item.sublink
                ? "before:content before:absolute before:w-[1px] before:h-[68%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[38px] before:left-[15px]"
                : ""
            }`}
          >
            <span className="inline-flex text-[14px] px-[8px] py-[3px] items-center border-solid border-[1px] border-[#999] rounded">
              <BiRss className="text-[#8a6d3b]" />
              <div>{item.title}</div>
            </span>
            {item.sublink ? (
              <ul className="pl-8">
                {item.sublink.map((sub) => (
                  <li
                    key={index}
                    onClick={() => handleClick(item)}
                    className="relative after:content after:h-[1px] after:w-[27px] after:absolute after:border-t-[#999] after:border-t-solid after:border-t-[1px] after:top-[22px] after:left-[-21px]"
                  >
                    <span className="inline-flex text-[14px] px-[8px] py-[3px] items-center border-solid border-[1px] border-[#999] rounded">
                      <BiRss className="text-[#8a6d3b]" />
                      <div>{sub.title}</div>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RssNav;

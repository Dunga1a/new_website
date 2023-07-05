import React from "react";

const Button = ({
  title,
  colorText,
  colorBgr,
  colorHover,
  onClick,
  icon,
  type,
}) => {
  //console.log(click);
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${colorText} ${colorBgr} hover:${colorHover} flex items-center focus:outline-none rounded  px-3 py-2 text-center mr-2`}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;

import React from "react";

const HeaderTitle = ({ title }) => {
  return (
    <div className="flex items-center">
      <img
        src="https://doanhnhanthanhhoahanoi.com/themes/egov/images/bg-national-emblem.png"
        alt=""
        className="pr-5"
      />
      <h2 className="font-bold uppercase text-lg text-[#333]">{title}</h2>
    </div>
  );
};

export default HeaderTitle;

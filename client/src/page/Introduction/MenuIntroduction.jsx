import React from "react";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const MenuIntroduction = () => {
  return (
    <div className=" mt-3 text-[#494949] border-[1px] border-solid border-[#646262] px-6 py-4 rounded">
      <div className="mb-2">
        <MdKeyboardDoubleArrowRight />
        <a href="" className="font-semibold text-[14px]">
          <span>Điều lệ hoạt động</span>
        </a>
      </div>
      <div className="mb-2">
        <MdKeyboardDoubleArrowRight />
        <a href="" className="font-semibold text-[14px]">
          <span>Ban chấp hành</span>
        </a>
      </div>
      <div className="mb-2">
        <MdKeyboardDoubleArrowRight />
        <a href="" className="font-semibold text-[14px]">
          <span>Giải pháp cho Doanh nghiệp</span>
        </a>
      </div>
    </div>
  );
};

export default MenuIntroduction;

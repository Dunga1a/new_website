import React from "react";

import Social from "./Social";
import MenuIntroduction from "./MenuIntroduction";
import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";

import Breadcrumbs from "../../components/Breadcrumb";
const ExCommittee = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Giới thiệu"} />
      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4">
          <div className="border-[1px] border-solid border-[#4f4f4f] px-6 py-4 rounded">
            <h2 className="font-semibold text-[20px] mb-5">Ban chấp hành</h2>
            <Social
              url={
                "https://doanhnhanthanhhoahanoi.com/vi/about/Ban-chap-hanh.html"
              }
            />
            <h3>Danh sách ban chấp hành</h3>
          </div>
          <MenuIntroduction />
        </div>
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default ExCommittee;

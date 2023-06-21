import React from "react";

import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";

import Breadcrumbs from "../../components/Breadcrumb";
import { useNavigate } from "react-router";
const Solution = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Phương Hướng Hoạt Động"} />

      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
          <div
            className="flex justify-between gap-3 mb-5 laptop:flex-row desktop:flex-row tablet:flex-col phone:flex-col"
            onClick={() =>
              navigate(
                "/trung-tam-nghien-cuu-khoa-hoc-va-xet-nghiem-cong-nghe-cao-hstc"
              )
            }
          >
            <div>
              <img
                src="
            http://dntpthanhhoa.vn/wp-content/uploads/2021/05/13-500x350.jpg"
                alt=""
                className="cursor-pointer laptop:w-[240px] desktop:w-[240px] tablet:w-full phone:w-full"
              />
            </div>
            <div>
              <h3 className="font-bold text-[#333] mb-5 cursor-pointer">
                TRUNG TÂM NGHIÊN CỨU KHOA HỌC VÀ XÉT NGHIỆM CÔNG NGHỆ CAO HSTC
              </h3>
              <p className="text-[12px]">
                Trung tâm xét nghiệm công nghệ cao HSTC: " SỰ NÂNG ĐỠ TỪ TÂM "
                ----------------------------------- Trung tâm Nghiên cứu Khoa
                học và Xét nghiệm...
              </p>
            </div>
          </div>
        </div>
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Solution;

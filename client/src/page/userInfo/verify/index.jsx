import React from "react";
import Breadcrumbs from "../../../components/Breadcrumb";
import RightBar from "../../../components/list/RightBar";
import { useNavigate } from "react-router-dom";

const StartVerify = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"Xác thực hai bước"}
        link={"/two-step-verification"}
      />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="col-span-3 border-gray-100 rounded-md">
          <div className="border-[1px] border-gray-100 rounded-md ">
            <div className="bg-[#f5f5f5] border-[1px] border-gray-200">
              <h3 className="font-bold text-[14px] p-2 ml-1">
                Xác thực hai bước
              </h3>
            </div>
            <div className="px-4 py-3">
              <div>
                <p className="text-[14px]">
                  Xác thực hai bước đang:{" "}
                  <span className="text-red-800 uppercase font-bold">Tắt</span>
                </p>
              </div>
              <div className="mt-2">
                <button
                  className="text-[14px] bg-[#5bc0de] rounded-md py-[6px] px-[12px] cursor-pointer hover:text-white"
                  onClick={() => navigate("/two-step-verification/setup")}
                >
                  Thiết lập xác thực hai bước
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default StartVerify;

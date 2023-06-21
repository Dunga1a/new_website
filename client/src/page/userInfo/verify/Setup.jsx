import React from "react";
import RightBar from "../../../components/list/RightBar";
import Breadcrumbs from "../../../components/Breadcrumb";
import { MdKey } from "react-icons/md";
// const apiKey = "AIzaSyDd9_2wpzjtf0Va54pGqGBus_PbsN3qZOY"
const Setup = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"Xác thực hai bước"}
        link={"/two-step-verification"}
      />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="col-span-3 rounded-md">
          <div className=" border-[1px] border-gray-400 rounded-md overflow-hidden">
            <div className="bg-[#f5f5f5] border-[1px] border-gray-200">
              <h3 className="font-bold text-[14px] p-2 ml-1">B1: Quét mã QR</h3>
            </div>
            <div className="px-4 py-3">
              <div>
                <div className="text-center border-b-[1px] border-[#cccccc] pb-6">
                  <img
                    src="/qr-code.png"
                    alt=""
                    className="w-[228px] h[228px] m-auto border-[1px] border-[#ccc]"
                  />
                </div>
                <div className="mt-4 text-[14px]">
                  Quét mã QR-code bên trên bằng phần mềm Two-Factor
                  Authentication (Ví dụ Google Authenticator) trên điện thoại
                  của bạn. Nếu bạn không thể sử dụng Camera hãy nhập đoạn mã này
                  thủ công.
                </div>
              </div>
            </div>
          </div>
          <p className="text-14px] my-[9px]">
            Sau khi quét mã hoặc nhập thủ công thành công, ứng dụng sẽ hiển thị
            một chuỗi 6 chữ số, nhập chuỗi đó vào ô bên dưới để xác nhận
          </p>
          <div className=" border-[1px] border-gray-400 rounded-md overflow-hidden">
            <div className="bg-[#f5f5f5] border-[1px] border-gray-200">
              <h3 className="font-bold text-[14px] p-2 ml-1">
                B2: Nhập mã từ ứng dụng
              </h3>
            </div>
            <div className="px-4 py-3">
              <div>
                <div className="border-[1px] border-[#cccccc] text-[14px] bg-gray-100 px-3 py-2 rounded-md">
                  Mã xác nhận gồm 6 chữ số hiển thị trên màn hình của ứng dụng
                  trên điện thoại của bạn
                </div>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center w-full mt-4 border border-gray-500 h-[35px] rounded-md relative">
                    <div className="py-1 px-2 ">
                      <MdKey className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="w-full h-full border-l border-gray-500">
                      <input
                        type="text"
                        className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md"
                        required
                        placeholder="123456"
                      />
                    </div>
                    <span className=" text-red-600 text-[18px] absolute top-[50%] right-[5%] translate-y-[-30%]">
                      *
                    </span>
                  </div>
                  <div className="text-center">
                    <button
                      className="bg-[#428bca] p-2 rounded-lg text-white text-[13px] mt-4"
                      type="submit"
                    >
                      Chấp nhận
                    </button>
                  </div>
                </form>
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

export default Setup;

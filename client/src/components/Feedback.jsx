import React from "react";
import { useNavigate } from "react-router-dom";
const Feedback = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 gap-3 rounded-t-xl p-6 bg-white mt-3">
      <div className=" cursor-pointer">
        <img
          src="https://doanhnhanthanhhoahanoi.com/uploads/menu/lay-y-kien.png"
          alt=""
          className="float-left"
        />
        <div
          onClick={() => navigate("/feedbackPage")}
          className=" uppercase rounded bg-[#10bcff] text-[14px] font-bold block text-center leading-[40px] text-[#fff] font-['Roboto_Condensed']"
        >
          <span>lấy ý kiến người dân</span>
        </div>
      </div>
      <div className=" cursor-pointer">
        <img
          src="https://doanhnhanthanhhoahanoi.com/uploads/menu/y-kien-du-thao.png"
          alt=""
          className="float-right"
        />
        <div className=" uppercase rounded rounded-r-xl bg-[#10bcff] text-[12px] font-bold block text-center leading-[40px] text-[#fff] font-['Roboto_Condensed']">
          <span>Lấy ý kiến dự thảo văn bản</span>
        </div>
      </div>
      <div className=" cursor-pointer">
        <img
          src="https://doanhnhanthanhhoahanoi.com/uploads/menu/duong-day-nong.png"
          alt=""
          className="float-left"
        />
        <div className=" uppercase rounded rounded-l-xl bg-[#10bcff] text-[14px] font-bold block text-center leading-[20px] text-[#fff] font-['Roboto_Condensed']">
          Đường dây nóng
          <span className="inline-block text-[10px]">
            Sở/ Ban ngành/ Quận/ Huyện
          </span>
        </div>
      </div>
      <div className=" cursor-pointer">
        <img
          src="https://doanhnhanthanhhoahanoi.com/uploads/menu/chi-dan-thu-tuc.png"
          alt=""
          className="float-right"
        />
        <div className=" uppercase rounded rounded-r-xl bg-[#10bcff] text-[12px] font-bold block text-center leading-[20px] text-[#fff] font-['Roboto_Condensed']">
          chỉ dẫn thủ tục hành chính
          <span className="inline-block text-[8px]">
            Hỗ trợ trực tuyến qua điện thoại
          </span>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

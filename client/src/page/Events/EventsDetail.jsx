import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";

const EventsDetail = () => {
  const { id } = useParams();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Sự kiện"} link={"/events-page"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4 ">
          <h1 className="font-semibold text-xl mb-5">
            HỘI NGHỊ XÚC TIẾN ĐẦU TƯ VÀO THÀNH PHỐ HỒ CHÍ MINH NĂM 2019
          </h1>
          <div>
            <strong>Date/Time</strong>
            <p>Date(s) - 16/04/2019</p>
            <p>07:30 - 11:30</p>
          </div>
          <div>
            <strong>Nhóm sự kiện</strong>
            <p>
              Hiệp Hội Doanh Nhân Việt Nam Ở Nước Ngoài(BAOOV) xin gửi đến Quý
              Hội viên thông tin chương trình “Hội nghị xúc tiến Đầu tư vào
              thành phố Hồ Chí Minh năm 2019” do Trung tâm Xúc tiến Thương mại
              và Đầu tư (ITPC) phối hợp Sở Kế hoạch và Đầu tư tổ chức.
            </p>
            <img
              src="https://doanhnhanvietnam.org.vn/media/2019/04/chuong-trinh-chi-tiet..jpg"
              alt=""
            />
            <p>- Thời gian: 07:30 - 12:00, thứ Ba, ngày 16/04/2019</p>
            <p>
              - Địa điểm: Phòng Lotus, Khách sạn Rex, 141 Nguyễn Huệ, Quận 1,
              TP.HCM
            </p>
            <p>- Chủ trì: Lãnh đạo thành phố Hồ Chí Minh.</p>
            <p>Thông tin chi tiết xin vui lòng xem file đính kèm</p>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default EventsDetail;

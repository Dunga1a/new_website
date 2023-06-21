import React from "react";

import Social from "./Social";
// import Category from "../../components/list/Category";
// import RightBar from "../../components/list/RightBar";
// import MenuIntroduction from "./MenuIntroduction";

// import Login from "../../Users/Login";
import Breadcrumbs from "../../components/Breadcrumb";
const Introduction = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Giới Thiệu"} />

      <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
        <div className="border-[1px] border-solid border-[#ccc] px-6 py-4 rounded">
          <h2 className="font-semibold text-[20px] mb-5">Giới thiệu chung</h2>
          <Social
            url={
              "https://doanhnhanthanhhoahanoi.com/vi/about/Gioi-thieu-chung.html"
            }
          />
          <div className="font-medium">
            <p className="">
              &nbsp;Hiệp hội Doanh nghiệp thành phố Thanh Hóa, đ­ược thành lập
              theo Quyết định số 1622/QĐ – UBND ngày 03/05/2019, , Hiệp hội
              Doanh nghiệp thành phố Thanh Hóa sẽ có vai trò là cầu nối giữa các
              Doanh nghiệp với chính quyền địa ph­ương và các cơ quan quản lý
              nhà n­ước. Tham gia xây dựng cơ chế, chính sách pháp luật, nhằm
              phát triển kinh tế – văn hoá xã hội, đảm bảo ANTT, an toàn xã hội,
              anh ninh quốc phòng, xoá đói, giảm nghèo và chính sách an sinh xã
              hội.
              <br />
              <br />
            </p>

            <p>
              &nbsp;Là một tổ chức xã hội nghề nghiệp của các Doanh nghiệp, tự
              nguyện thành lập nhằm mục đích hợp tác, liên kết, hỗ trợ nhau
              trong việc phát triển nghề nghiệp, nâng cao hiệu quả sản xuất kinh
              doanh, dịch vụ, tuyên truyền quảng bá, xúc tiến thư­ơng mại, bảo
              vệ quyền hợp pháp của các hội viên, giúp hội viên tiếp thu, thực
              hiện tốt các chủ trư­ơng, chính sách pháp luật của Đảng, nhà nư­ớc
              và quan hệ hợp tác với các tổ chức kinh tế trong và ngoài nước.{" "}
              <br />
              <br />
            </p>

            <p>
              Trong nền kinh tế thị trư­ờng và hội nhập kinh tế quốc tế, Đảng,
              nhà nước và nhân dân ta luôn trân trọng và đánh giá cao vị trí,
              vai trò của Doanh nghiệp, Doanh nhân trong sự nghiệp xây dựng và
              bảo vệ tổ quốc. Đảng bộ, chính quyền và nhân dân thành phố Thanh
              Hoá luôn dành cho giới Doanh nhân Xứ Thanh sự quan tâm, tình cảm
              sâu sắc cũng như­ tạo mọi điều kiện thuận lợi để Hiệp hội phát huy
              vai trò, chức năng của mình, đóng góp tích cực cho sự nghiệp phát
              triển kinh tế – xã hội, xoá đói, giảm nghèo. Hơn bao giờ hết mỗi
              Doanh nghiệp, Doanh nhân cần xác định rõ trách nhiệm của mình với
              xã hội với nhân dân, phát huy tinh thần đoàn kết, năng động, sáng
              tạo, nâng cao năng lực cạnh tranh, kinh doanh phát triển, tạo ra
              nhiều sản phẩm, hàng hoá có chất l­ượng phục vụ nhân dân ngày càng
              tốt hơn.&nbsp;&nbsp;&nbsp;
              <br />
              <br />
            </p>

            <p>
              Hy vọng trong thời gian tới bằng sự nỗ lực tuyên truyền, vận động
              của Hiệp hội, sự hỗ trợ giúp đỡ của các cấp, các ngành, đặc biệt
              sự tham gia hưởng ứng tích cực, trách nhiệm của các Doanh nghiệp,
              Doanh nhân. Hiệp hội sẽ triển khai thực hiện thắng lợi các ch­ương
              trình, mục tiêu, kế hoạch đã đề ra, thu hút đông đảo Doanh nghiệp,
              Doanh nhân trên địa bàn thành phố tham gia Hiệp hội doanh nghiệp,
              xây dựng mái nhà chung của cộng đồng doanh nghiệp ngày càng phát
              triển lớn mạnh, bền vững.
            </p>
          </div>
        </div>
        {/* <Login />
          <MenuIntroduction /> */}
      </div>
    </div>
  );
};

export default Introduction;

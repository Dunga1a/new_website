import React, { useEffect, useState } from "react";

import Social from "./Social";
// import Category from "../../components/list/Category";
// import RightBar from "../../components/list/RightBar";
// import MenuIntroduction from "./MenuIntroduction";

// import Login from "../../Users/Login";
import Breadcrumbs from "../../components/Breadcrumb";
const Introduction = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  });
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Giới Thiệu"} />

      <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
        {load && (
          <div className="flex items-center justify-center dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {load === false && (
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
                Doanh nghiệp thành phố Thanh Hóa sẽ có vai trò là cầu nối giữa
                các Doanh nghiệp với chính quyền địa ph­ương và các cơ quan quản
                lý nhà n­ước. Tham gia xây dựng cơ chế, chính sách pháp luật,
                nhằm phát triển kinh tế – văn hoá xã hội, đảm bảo ANTT, an toàn
                xã hội, anh ninh quốc phòng, xoá đói, giảm nghèo và chính sách
                an sinh xã hội.
                <br />
                <br />
              </p>

              <p>
                &nbsp;Là một tổ chức xã hội nghề nghiệp của các Doanh nghiệp, tự
                nguyện thành lập nhằm mục đích hợp tác, liên kết, hỗ trợ nhau
                trong việc phát triển nghề nghiệp, nâng cao hiệu quả sản xuất
                kinh doanh, dịch vụ, tuyên truyền quảng bá, xúc tiến thư­ơng
                mại, bảo vệ quyền hợp pháp của các hội viên, giúp hội viên tiếp
                thu, thực hiện tốt các chủ trư­ơng, chính sách pháp luật của
                Đảng, nhà nư­ớc và quan hệ hợp tác với các tổ chức kinh tế trong
                và ngoài nước. <br />
                <br />
              </p>

              <p>
                Trong nền kinh tế thị trư­ờng và hội nhập kinh tế quốc tế, Đảng,
                nhà nước và nhân dân ta luôn trân trọng và đánh giá cao vị trí,
                vai trò của Doanh nghiệp, Doanh nhân trong sự nghiệp xây dựng và
                bảo vệ tổ quốc. Đảng bộ, chính quyền và nhân dân thành phố Thanh
                Hoá luôn dành cho giới Doanh nhân Xứ Thanh sự quan tâm, tình cảm
                sâu sắc cũng như­ tạo mọi điều kiện thuận lợi để Hiệp hội phát
                huy vai trò, chức năng của mình, đóng góp tích cực cho sự nghiệp
                phát triển kinh tế – xã hội, xoá đói, giảm nghèo. Hơn bao giờ
                hết mỗi Doanh nghiệp, Doanh nhân cần xác định rõ trách nhiệm của
                mình với xã hội với nhân dân, phát huy tinh thần đoàn kết, năng
                động, sáng tạo, nâng cao năng lực cạnh tranh, kinh doanh phát
                triển, tạo ra nhiều sản phẩm, hàng hoá có chất l­ượng phục vụ
                nhân dân ngày càng tốt hơn.&nbsp;&nbsp;&nbsp;
                <br />
                <br />
              </p>

              <p>
                Hy vọng trong thời gian tới bằng sự nỗ lực tuyên truyền, vận
                động của Hiệp hội, sự hỗ trợ giúp đỡ của các cấp, các ngành, đặc
                biệt sự tham gia hưởng ứng tích cực, trách nhiệm của các Doanh
                nghiệp, Doanh nhân. Hiệp hội sẽ triển khai thực hiện thắng lợi
                các ch­ương trình, mục tiêu, kế hoạch đã đề ra, thu hút đông đảo
                Doanh nghiệp, Doanh nhân trên địa bàn thành phố tham gia Hiệp
                hội doanh nghiệp, xây dựng mái nhà chung của cộng đồng doanh
                nghiệp ngày càng phát triển lớn mạnh, bền vững.
              </p>
            </div>
          </div>
        )}
        {/* <Login />
          <MenuIntroduction /> */}
      </div>
    </div>
  );
};

export default Introduction;

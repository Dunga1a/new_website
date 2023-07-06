import React, { useEffect, useState } from "react";

const MembershipBenefits = () => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  });
  return (
    <>
      {load && (
        <div className="flex items-center justify-center bg-white py-6 dark:bg-gray-800 dark:border-gray-700">
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
        <div className="bg-white py-6 px-10">
          <strong>
            Quyền lợi của hội viên của Hiệp hội doanh nghiệp Thành phố Thanh
            Hóa:
          </strong>
          <ul className="list-decimal">
            <li className="py-1">
              Được đóng góp ý kiến, kiến nghị thông qua Hiệp hội và được Hiệp
              hội bảo vệ quyền, lợi ích hợp pháp phù hợp với nhiệm vụ, quyền hạn
              của Hiệp hội theo quy định của pháp luật;
            </li>
            <li className="py-1">
              Được cung cấp những thông tin phục vụ cho việc nghiên cứu sản xuất
              và kinh doanh. Tham gia các hội nghị, hội thảo, tập huấn, đào tạo
              tay nghề do Hiệp hội tổ chức hoặc Hiệp hội được mời tham gia;
            </li>
            <li className="py-1">
              Được tham gia các công việc của Hiệp hội, được yêu cầu Hiệp hội
              làm trung gian hoặc tư vấn trong các giao dịch liên quan đến hoạt
              động sản xuất, kinh doanh, đào tạo nguồn nhân lực;
            </li>
            <li className="py-1">
              Được Hiệp hội cung cấp thông tin, giúp đỡ hòa giải khi có tranh
              chấp, được tham gia các hình thức liên kết do Hiệp hội tổ chức;
            </li>
            <li className="py-1">
              Được ứng cử, đề cử, bầu cử vào các cơ quan lãnh đạo của Hiệp hội,
              thảo luận, biểu quyết các Nghị quyết của Hiệp hội, được tham gia
              các Đại hội, các hội nghị, hội thảo của Hiệp hội. Được phê bình,
              chất vấn Ban Chấp hành Hiệp hội về mọi chủ trương và hoạt động của
              Hiệp hội;
            </li>
            <li className="py-1">
              Được ra khỏi Hiệp hội trong vòng 30 ngày kể từ ngày nhận được văn
              bản đồng ý của Hiệp hội;
            </li>
            <li className="py-1">
              Hội viên danh dự và hội viên liên kết được hưởng các quyền như hội
              viên chính thức, trừ quyền ứng cử, bầu cử vào chức danh lãnh đạo
              của Hiệp hội và quyền biểu quyết các vấn đề của Hiệp hội;
            </li>
            <li className="py-1">Được cấp giấy chứng nhận Hội viên.</li>
            <li className="py-1">
              Được khen thưởng theo quy định của Hiệp hội.
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MembershipBenefits;

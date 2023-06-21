import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
const MemberDetail = () => {
  const { id } = useParams();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Hội viên"} link={"/member"} />
      <div className=" pb-14 grid grid-cols-4 gap-4 pt-4 px-6">
        <div className="pt-4 col-span-3 phone:col-span-4 desktop:col-span-3 tablet:col-span-4 laptop:col-span-3">
          ID: {id}
          <div className=" flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full">
            <img
              className="object-cover w-full rounded-t-lg h-96 desktop:h-auto desktop:w-48 desktop:rounded-none desktop:rounded-l-lg"
              src="http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 pl-8 leading-normal">
              <p className="mb-1 tracking-tight text-gray-900 dark:text-white">
                <span className="font-semibold text-[#333333] text-[14px]">
                  Tên doanh nghiệp:{" "}
                </span>
                Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu
              </p>

              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  SĐT :{" "}
                </span>
                0'977910112
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Email:{" "}
                </span>
                anhminh050581@gmail.com
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Lĩnh vực hoạt động:{" "}
                </span>
                Vòng bi - dây curoa
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Website:{" "}
                </span>
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Địa chỉ:{" "}
                </span>
                484 Trần Phú - Phường Ba Đình- TPTH
              </p>
            </div>
          </div>
          <div className=" flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full">
            <img
              className="object-cover w-full rounded-t-lg h-96 desktop:h-auto desktop:w-48 desktop:rounded-none desktop:rounded-l-lg"
              src="http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg"
              alt=""
            />
            <div className=" p-4 pl-8 leading-normal">
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Người đại diện :{" "}
                </span>
                Nguyễn Ngọc Bắc
              </p>
              <p class="mt-3 font-semibold text-red-600 dark:text-gray-400">
                Hội viên
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl my-2 mt-4">
              Giới thiệu về doanh nghiệp
            </h2>
            <p className="text-black mb-1">
              Công ty thương mại và dịch vụ số 1 Minh Châu: là công ty thương
              mại chuyên cung cấp vòng bi , dây curoa , nhông xích , que hàn,
              phớt và các phụ tùng máy công nhiệp, nông nghiệp . Sản phẩm được
              nhập khẩu từ các nước Nhật Bản , Trung Quốc , Việt Nam . Các mặt
              hàng của công ty đã cung cấp cho các đại lý ở các tỉnh Thái Nguyên
              , Nam Định , Vĩnh Phúc , Nghệ An và tất cả các huyện , các nhà máy
              ( Dệt may , bao bì , gạch , xi măng , sữa chữa ô tô …)trên địa bàn
              tỉnh Thanh Hóa . Bằng sự uy tín từ nguồn hàng chính hãng và giá cả
              cạnh tranh , Minh Châu đã trở thành nhà cung cấp tin cậy cho các
              đại lý và các nhà máy trong và ngoài tỉnh.
            </p>
            <p className="text-black">
              Với số lượng hàng trữ kho lớn , thời gian giao hàng nhanh , cùng
              với đội ngũ nhân viên nhiệt tình , chu đáo . Minh Châu luôn sẵn
              sang phục vụ quý khách một cách hài lòng nhất . Bất cứ khi nào quý
              khách có nhu cầu về vòng bi , dây curoa ,… hãy liên hệ với chúng
              tôi . Đó sẽ là vinh dự lớn của chúng tôi để hợp tác kinh doanh với
              quý khách hàng .
            </p>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
const MemberDetail = () => {
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Hội viên"} link={"/member"} />
      <div className=" pb-14 grid grid-cols-4 gap-4 pt-4 px-6">
        <div className="pt-4 col-span-3 desktop:col-span-3 tablet:col-span-3 laptop:col-span-3 phone:col-span-4">
          <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow laptop:flex-row laptop:max-w-full desktop:flex-row desktop:max-w-full tablet:flex-row tablet:max-w-full">
            <img
              className="object-cover w-full rounded-t-lg h-60 desktop:h-auto laptop:w-48 tablet:h-auto tablet:w-48 laptop:h-auto desktop:w-48 desktop:rounded-none desktop:rounded-l-lg tablet:rounded-l-lg laptop:rounded-l-lg "
              src={`${
                state.image_company
                  ? `/uploads/${state.image_company}`
                  : "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg"
              }`}
              alt=""
            />
            <div className="flex flex-col py-3 justify-between pl-8 leading-normal">
              <p className="mb-1 tracking-tight text-gray-900 dark:text-white">
                <span className="font-semibold text-[#333333] text-[14px]">
                  Tên doanh nghiệp:{" "}
                </span>
                {state.name_company}
              </p>

              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  SĐT :{" "}
                </span>
                {state.phone}
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Email:{" "}
                </span>
                {state.email}
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Lĩnh vực hoạt động:{" "}
                </span>
                {state.id_business_areas.name}
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Website: {state.website ? state.website : null}
                </span>
              </p>
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Địa chỉ:{" "}
                </span>
                {state.address}
              </p>
            </div>
          </div>
          <div className=" flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full laptop:flex-row laptop:max-w-full tablet:flex-row tablet:max-w-full ">
            <img
              className="object-cover w-full rounded-t-lg h-60 tablet:h-auto tablet:w-48 laptop:w-48 laptop:h-auto desktop:h-auto desktop:w-48 desktop:rounded-none desktop:rounded-l-lg tablet:rounded-l-lg laptop:rounded-l-lg"
              src={`${
                state.image_person
                  ? `/uploads/${state.image_person}`
                  : "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg"
              }`}
              alt=""
            />
            <div className=" p-4 pl-8 leading-normal">
              <p>
                <span className="font-semibold text-[#333333] text-[14px]">
                  Người đại diện :{" "}
                </span>
                {state.representative}
              </p>
              <p class="mt-3 font-semibold text-red-600 dark:text-gray-400">
                {state.id_role_associations.name}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl my-2 mt-4">
              Giới thiệu về doanh nghiệp
            </h2>
            <p>
              {/* <div />. */}
              <div dangerouslySetInnerHTML={{ __html: state.intro }} />
            </p>
            {/* <p className="text-black mb-1">
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
            </p> */}
          </div>
        </div>
        <div className="">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;

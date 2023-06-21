import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import HeaderTitle from "../../components/HeaderTitle";
import { useSearchParams } from "react-router-dom";
import RightBar from "../../components/list/RightBar";
import Paginate from "../../components/Pagination";
const members = [
  {
    id_member: 1,
    name_member: "Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu",
    position: "Hội viên",
    representative: "Nguyễn Ngọc Bắc",
    phone_member: "0927135123",
    email_member: "anhminh050581@gmail.com",
    field: "Vòng bi - dây curoa",
    website: "",
    address: "484 Trần Phú - Phường Ba Đình- TPTH",
    image:
      "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg",
    desc: "Công ty thương mại và dịch vụ số 1 Minh Châu: là công ty thương mại chuyên cung cấp vòng bi , dây curoa , nhông xích , que hàn, phớt và các phụ tùng máy công nhiệp, nông nghiệp . Sản phẩm được nhập khẩu từ các nước Nhật Bản , Trung Quốc , Việt Nam . Các mặt hàng của công ty đã cung cấp cho các đại lý ở các tỉnh Thái Nguyên , Nam Định , Vĩnh Phúc , Nghệ An và tất cả các huyện , các nhà máy ( Dệt may , bao bì , gạch , xi măng , sữa chữa ô tô …)trên địa bàn tỉnh Thanh Hóa . Bằng sự uy tín từ nguồn hàng chính hãng và giá cả cạnh tranh , Minh Châu đã trở thành nhà cung cấp tin cậy cho các đại lý và các nhà máy trong và ngoài tỉnh.",
  },
  {
    id_member: 2,
    name_member: "Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu",
    position: "Ban Chấp Hành",
    representative: "Nguyễn Ngọc Bắc",
    phone_member: "0927135123",
    email_member: "anhminh050581@gmail.com",
    field: "Vòng bi - dây curoa",
    website: "nppkhoithu.com",
    address: "484 Trần Phú - Phường Ba Đình- TPTH",
    image:
      "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg",
    desc: "Công ty thương mại và dịch vụ số 1 Minh Châu: là công ty thương mại chuyên cung cấp vòng bi , dây curoa , nhông xích , que hàn, phớt và các phụ tùng máy công nhiệp, nông nghiệp . Sản phẩm được nhập khẩu từ các nước Nhật Bản , Trung Quốc , Việt Nam . Các mặt hàng của công ty đã cung cấp cho các đại lý ở các tỉnh Thái Nguyên , Nam Định , Vĩnh Phúc , Nghệ An và tất cả các huyện , các nhà máy ( Dệt may , bao bì , gạch , xi măng , sữa chữa ô tô …)trên địa bàn tỉnh Thanh Hóa . Bằng sự uy tín từ nguồn hàng chính hãng và giá cả cạnh tranh , Minh Châu đã trở thành nhà cung cấp tin cậy cho các đại lý và các nhà máy trong và ngoài tỉnh.",
  },
  {
    id_member: 3,
    name_member: "Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu",
    position: "Chủ Tịch Hiệp Hội",
    representative: "Nguyễn Ngọc Bắc",
    phone_member: "0927135123",
    email_member: "anhminh050581@gmail.com",
    field: "Vòng bi - dây curoa",
    website: "",
    address: "484 Trần Phú - Phường Ba Đình- TPTH",
    image:
      "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg",
  },
  {
    id_member: 4,
    name_member: "Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu",
    position: "Ủy viên Ban chấp hành",
    representative: "Nguyễn Ngọc Bắc",
    phone_member: "0927135123",
    email_member: "anhminh050581@gmail.com",
    field: "Vòng bi - dây curoa",
    website: "nppkhoithu.com",
    address: "484 Trần Phú - Phường Ba Đình- TPTH",
    image:
      "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg",
  },
  {
    id_member: 5,
    name_member: "Công ty TNHH Thương mại và dịch vụ số 1 Minh Châu",
    position: "Phó Chủ Tịch",
    representative: "Nguyễn Ngọc Bắc",
    phone_member: "0927135123",
    email_member: "anhminh050581@gmail.com",
    field: "Vòng bi - dây curoa",
    website: "nppkhoithu.com",
    address: "484 Trần Phú - Phường Ba Đình- TPTH",
    image:
      "http://dntpthanhhoa.vn/wp-content/uploads/2020/09/96385e1d7e0e8150d81f-150x150.jpg",
  },
];
const itemsPerPage = 4;
const Member = () => {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/member/${id}`);
  };
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(members.length / itemsPerPage);
  const currentItems = members.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % members.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Hội viên"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4">
          <div>
            {currentItems.map((member) => (
              <div
                key={member.id_member}
                onClick={() => handleItemClick(member.id_member)}
                className=" cursor-pointer flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 desktop:h-auto desktop:w-48 desktop:rounded-none desktop:rounded-l-lg"
                  src={member.image}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 pl-8 leading-normal">
                  <p className="mb-1 tracking-tight text-gray-900 dark:text-white">
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Tên doanh nghiệp:{" "}
                    </span>
                    {member.name_member}
                  </p>
                  <p className="mb-1 font-semibold text-red-600 dark:text-gray-400">
                    {member.position}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Người đại diện :{" "}
                    </span>
                    {member.representative}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      SĐT :{" "}
                    </span>
                    {member.phone_member}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Email:{" "}
                    </span>
                    {member.email_member}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Lĩnh vực hoạt động:{" "}
                    </span>
                    {member.field}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Website:{" "}
                    </span>
                    {member.website ? member.website : ""}
                  </p>
                  <p>
                    <span className="font-semibold text-[#333333] text-[14px]">
                      Địa chỉ:{" "}
                    </span>
                    {member.address}
                  </p>
                  <p className="">
                    <span className=" text-[#333333] text-[14px] line-clamp-2">
                      <b>Mô tả:</b> {member.desc}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
          </div>
        </div>

        <RightBar />
      </div>
    </div>
  );
};

export default Member;

import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import { FaDownload } from "react-icons/fa";
import { FcExpired, FcFeedback } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SelectSearch from "../../components/SelectSearch";
import RightBar from "../../components/list/RightBar";
const documents = [
  {
    id: 1,
    numberSymbol: "/2017/TT-BLĐTB&XH",
    epitomize:
      "Bộ Lao động - Thương binh và Xã hội đang soạn thảo dự thảo Thông tư quy định tiêu chuẩn chức danh nghề nghiệp viên chức tư vấn viên dịch vụ việc làm. Cổng TTĐT Chính phủ xin giới thiệu toàn văn và đề nghị các cơ quan, tổ chức, cá nhân trong và ngoài nước nghiên cứu, đóng góp ý kiến",
    filePdf: "",
    timeStart: "01/09/2017",
    timeEnd: "03/12/2017",
    category: "Thông tư",
    sphere: "Giáo dục",
    department: "Phòng LĐTB&XH",
  },
  {
    id: 2,
    numberSymbol: "/2017/BKH&DT",
    epitomize:
      "Bộ Lao động - Thương binh và Xã hội đang soạn thảo dự thảo Thông tư quy định tiêu chuẩn chức danh nghề nghiệp viên chức tư vấn viên dịch vụ việc làm. Cổng TTĐT Chính phủ xin giới thiệu toàn văn và đề nghị các cơ quan, tổ chức, cá nhân trong và ngoài nước nghiên cứu, đóng góp ý kiến",
    filePdf: "",
    timeStart: "",
    timeEnd: "",
    category: "Thông tư",
    sphere: "Giáo dục",
    department: "Phòng LĐTB&XH",
  },
  {
    id: 3,
    numberSymbol: "279/2016/TT-BTC",
    epitomize:
      "Bộ Tài chính đang soạn thảo dự thảo Thông tư Sửa đổi Thông tư số 279/2016/TT-BTC ngày 14/11/2016  của Bộ Tài chính quy định mức thu, chế độ thu, nộp, quản lý  và sử dụng phí trong công tác an toàn vệ sinh thực phẩm. Cổng TTĐT Chính phủ xin giới thiệu toàn văn và đề nghị các cơ quan, tổ chức, cá nhân trong và ngoài nước nghiên cứu, đóng góp ý kiến.",
    filePdf: "",
    timeStart: "01/09/2017",
    timeEnd: "",
    category: "Thông tư",
    sphere: "Giáo dục",
    department: "Phòng LĐTB&XH",
  },
];
const options_1 = [
  {
    value: "Tất cả lĩnh vực",
    label: "Tất cả lĩnh vực",
  },
  {
    value: "Giáo dục",
    label: "Giáo dục",
  },
  {
    value: "Pháp quy",
    label: "Pháp quy",
  },
];

const options_2 = [
  {
    value: "Tất cả chủ đề",
    label: "Tất cả chủ đề",
  },
  {
    value: "Lấy ý kiến người dân >> Công văn",
    label: "Lấy ý kiến người dân >> Công văn",
  },
  {
    value: "Lấy ý kiến người dân >> Thông tư",
    label: "Lấy ý kiến người dân >> Thông tư",
  },
  {
    value: "Lấy ý kiến người dân >> Quyết định",
    label: "Lấy ý kiến người dân >> Quyết định",
  },
  {
    value: "Lấy ý kiến người dân >> Nghị định",
    label: "Lấy ý kiến người dân >> Nghị định",
  },
  {
    value: "Lấy ý kiến người dân >> Thông báo",
    label: "Lấy ý kiến người dân >> Thông báo",
  },
  {
    value: "Lấy ý kiến người dân >> Hướng dẫn",
    label: "Lấy ý kiến người dân >> Hướng dẫn",
  },
  {
    value: "Lấy ý kiến người dân >> Báo cáo",
    label: "Lấy ý kiến người dân >> Báo cáo",
  },
  {
    value: "Lấy ý kiến người dân >> Chỉ thị",
    label: "Lấy ý kiến người dân >> Chỉ thị",
  },
  {
    value: "Lấy ý kiến người dân >> Kế hoạch",
    label: "Lấy ý kiến người dân >> Kế hoạch",
  },
];
const options_3 = [
  {
    value: "Tất cả trạng thái",
    label: "Tất cả trạng thái",
  },
  {
    value: "Chưa thông qua",
    label: "Chưa thông qua",
  },
  {
    value: "Đã thông qua",
    label: "Đã thông qua",
  },
];
const options_4 = [
  {
    value: "Tất cả",
    label: "Tất cả",
  },
  {
    value: "Bùi Văn Ga",
    label: "Bùi Văn Ga",
  },
  {
    value: "Khác",
    label: "Khác",
  },
];
const options_5 = [
  {
    value: "Tất cả cơ quan ban nghành",
    label: "Tất cả cơ quan ban nghành",
  },
  {
    value: "Bộ GD&ĐT",
    label: "Bộ GD&ĐT",
  },
  {
    value: "Bộ kế hoạch và đầu tư",
    label: "Bộ kế hoạch và đầu tư",
  },
  {
    value: "Bộ tài chính",
    label: "Bộ tài chính",
  },
  {
    value: "Phòng LĐTB&XH",
    label: "Phòng LĐTB&XH",
  },
  {
    value: "Bộ nội vụ",
    label: "Bộ nội vụ",
  },
  {
    value: "Khác",
    label: "Khác",
  },
];
const options_6 = [
  {
    value: "Cơ quan thẩm tra",
    label: "Cơ quan thẩm tra",
  },
];
const FeedbackPage = () => {
  const navigate = useNavigate();
  const [valueSearch, setvalueSearch] = useState("");

  const clearvalueSearch = () => {
    setvalueSearch("");
  };
  // const [currentDate, setCurrentDate] = useState("");

  // useEffect(() => {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");
  //   setCurrentDate(`${day}-${month}-${year}`);
  //   console.log(date);
  // }, []);
  // //   console.log(documents.timeEnd ? new Date(documents[0].timeEnd) : "");
  // console.log(new Date(documents[0].timeEnd));
  return (
    <div className="bg-white py-6">
      <Breadcrumbs title={"Lấy ý kiến người dân"} />
      <div className="grid grid-cols-4 gap-3 pr-2">
        <div className="col-span-3">
          <div className="p-5">
            <table className="border-collapse border border-slate-400 w-full text-[14px]">
              <thead className="">
                <tr>
                  <th className="border border-slate-300 text-center">STT</th>
                  <th className="border border-slate-300 text-center">
                    Số kí hiệu
                  </th>
                  <th className="border border-slate-300">Trích yếu</th>
                  <th className="border border-slate-300">File đính kèm</th>
                  <th className="border border-slate-300">Gửi góp ý</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-slate-300 text-center">
                      {item.id}
                    </td>
                    <td
                      className="border border-slate-300 text-center cursor-pointer"
                      onClick={() =>
                        navigate(`/detailFeedback?feedbackId=${item.id}`)
                      }
                    >
                      {item.numberSymbol}
                    </td>
                    <td className="border border-slate-300 p-2 cursor-pointer">
                      <div
                        onClick={() =>
                          navigate(`/detailFeedback?feedbackId=${item.id}`)
                        }
                      >
                        {item.epitomize}
                      </div>
                      <span className="block text-[#8a6d3b] ">
                        {item.timeStart ? `Từ ${item.timeStart}` : ""}{" "}
                        {item.timeEnd ? `- Đến ${item.timeEnd}` : ""}
                      </span>
                    </td>
                    <td className="border border-slate-300 min-w-[100px] cursor-pointer">
                      <div className="flex items-center justify-center">
                        <FaDownload />
                        <span>Tải tệp tin</span>
                      </div>
                    </td>
                    {new Date(item.timeEnd) < new Date() ? (
                      <td className="border border-slate-300 min-w-[90px] text-2xl cursor-pointer">
                        <div
                          title="hết hạn"
                          className="flex items-center justify-center"
                          onClick={() =>
                            navigate(`/detailFeedback?feedbackId=${item.id}`)
                          }
                        >
                          {" "}
                          <FcExpired />
                        </div>
                      </td>
                    ) : (
                      <td className="border border-slate-300 min-w-[90px] text-2xl">
                        <div
                          title="Gửi góp ý"
                          className="flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            navigate(`/detailFeedback?feedbackId=${item.id}`)
                          }
                        >
                          {" "}
                          <FcFeedback />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <div>
              <label
                htmlFor="keySearch"
                className="inline-block mb-2 text-[14px] font-bold text-gray-900 dark:text-white"
              >
                Từ khóa
              </label>
              <input
                type="text"
                id="keySearch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter keywords..."
                value={valueSearch}
                onChange={(e) => setvalueSearch(e.target.value)}
              />
            </div>
          </div>
          <SelectSearch
            options={options_1}
            label={"Lĩnh vực"}
            forId={"linh_vuc"}
          />
          <SelectSearch
            options={options_2}
            label={"Chủ đề"}
            forId={"linh_vuc"}
          />
          <SelectSearch
            options={options_3}
            label={"Trạng thái"}
            forId={"linh_vuc"}
          />
          <SelectSearch
            options={options_4}
            label={"Người ký"}
            forId={"linh_vuc"}
          />
          <SelectSearch
            options={options_5}
            label={"Cơ quan ban nghành"}
            forId={"linh_vuc"}
          />
          <SelectSearch
            options={options_6}
            label={"Cơ quan thẩm tra"}
            forId={"linh_vuc"}
          />

          <div className="text-center my-4">
            <button
              onClick={clearvalueSearch}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-2 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Xóa trắng
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-3 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tìm kiếm
            </button>
          </div>
          <RightBar />

          {/* <Select options={Field} /> */}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

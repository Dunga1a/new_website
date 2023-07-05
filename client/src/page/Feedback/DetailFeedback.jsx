import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";

import { FaDownload, FaFilePdf } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FcExpired, FcFeedback } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import generateCaptcha from "../../uitls";
import ReactQuillEditor from "../../components/ReactQuill";
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
const DetailFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("feedbackId");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [openPdf, setOpenPdf] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);

  // const { feedbackId } = useParams();
  // console.log(feedbackId);

  // console.log(id);
  const onSubmit = (data) => {
    //console.log(data);
    //console.log(captcha);
    if (data.checkCaptcha !== captcha) {
      return console.log("ngu");
    }
    return console.log("khôn");
    //reset();
  };

  const handleOpenPdf = () => {
    setOpenPdf(!openPdf);
  };

  const onReset = (data) => {
    reset();
  };

  const resetCaptcha = (data) => {
    setCaptcha(generateCaptcha);
    reset(data.checkCaptcha);
  };

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Lấy ý kiến người dân"} />
      <div className="grid grid-cols-4 gap-3 p-3">
        <div className="col-span-3 p-2">
          <div>
            <h3 className="font-bold leading-[25px] py-[10px] mb-[5px] text-[20px] text-[#02659d] border-b-solid border-b-[1px] border-b-[#cccccc] font-['Roboto_Condensed']">
              Dự thảo Thông tư quy định tiêu chuẩn chức danh nghề nghiệp viên
              chức tư vấn viên dịch vụ việc làm
            </h3>
            <p className="text-[14px] mb-[10px]">
              Bộ Lao động - Thương binh và Xã hội đang soạn thảo dự thảo Thông
              tư quy định tiêu chuẩn chức danh nghề nghiệp viên chức tư vấn viên
              dịch vụ việc làm. Cổng TTĐT Chính phủ xin giới thiệu toàn văn và
              đề nghị các cơ quan, tổ chức, cá nhân trong và ngoài nước nghiên
              cứu, đóng góp ý kiến.
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[14px] mb-3">
              <tbody>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Số kí hiệu
                  </td>
                  <td className="border border-slate-300 p-2">
                    /2017/TT-BLĐTB&XH
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Bắt đầu lấy ý kiến
                  </td>
                  <td className="border border-slate-300 p-2">
                    Không giới hạn
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Kết thúc lấy ý kiến
                  </td>
                  <td className="border border-slate-300 p-2">
                    Không giới hạn
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Trạng thái
                  </td>
                  <td className="border border-slate-300 p-2">
                    Chưa thông qua
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Thể loại
                  </td>
                  <td className="border border-slate-300 p-2">Thông tư</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Lĩnh vực
                  </td>
                  <td className="border border-slate-300 p-2">Pháp quy</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Cơ quan ban hành
                  </td>
                  <td className="border border-slate-300 p-2">
                    Cơ quan ban hành
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 w-[160px] text-right p-2">
                    Người ký
                  </td>
                  <td className="border border-slate-300 p-2">Khác</td>
                </tr>
              </tbody>
            </table>
            <h3 className="flex font-bold leading-[25px] py-[10px] text-[20px] text-[#02659d] font-['Roboto_Condensed']">
              <FaDownload className="mr-2 " />
              File đính kèm
            </h3>
            <div className="p-3 border border-slate-300 rounded">
              <div className="flex items-center justify-between text-[12px]">
                <a href="" className="text-[14px]">
                  {" "}
                  Tải tệp tin : <strong>demo.pdf</strong>
                </a>

                <span
                  className="p-1 rounded-full border bg-[#5cb85c] text-center cursor-pointer hover:opacity-80"
                  onClick={handleOpenPdf}
                >
                  <FaFilePdf className="text-white text-[14px]" />
                </span>
              </div>
              {openPdf && (
                <div className="mt-3 transition-all">
                  <iframe
                    src="/upload/Chuong1_TongQuanML_P1.pdf"
                    frameborder="0"
                    width="100%"
                    height={"600"}
                  ></iframe>
                </div>
              )}
            </div>

            <div className="p-5 border border-slate-300 rounded mt-5">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <p className="flex items-center">
                  <IoChatbubbles /> Ý kiến bạn đọc
                </p>
                <select
                  name=""
                  id=""
                  className=" rounded text-[12px] h-8 leading-4"
                >
                  <option value="">Sắp xếp theo bình luận mới</option>
                  <option value="">Sắp xếp theo bình luận cũ</option>
                  <option value="">Sắp xếp theo số lượt thích</option>
                </select>
              </div>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Tên của bạn"
                      className={`rounded w-full py-1 px-2 h-8 leading-4 text-[13px] border-[#cccccc] ${
                        errors.name ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("name", {
                        required: "Vui lòng nhập tên của bạn",
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ messages }) => {
                        //console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className="ml-2 text-[14px] text-red-500"
                                key={type}
                              >
                                {message}
                              </p>
                            ))
                          : null;
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className={`rounded w-full py-1 px-2 h-8 leading-4 text-[13px] border-[#cccccc] ${
                        errors.email ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("email", {
                        required: "Vui lòng nhập địa chỉ email của bạn",
                        pattern: {
                          value:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: `Vui lòng nhập đúng email VD: 'ten123@gmail.com'`,
                        },
                      })}
                    />

                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ messages }) => {
                        //console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className="ml-2 text-[14px] text-red-500"
                                key={type}
                              >
                                {message}
                              </p>
                            ))
                          : null;
                      }}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <ReactQuillEditor />
                </div>

                <div className="">
                  <label htmlFor="" className=" font-bold w-40 inline-block">
                    Đính kèm file
                  </label>
                  <input type="file" name="" id="" />
                </div>
                <div className="flex items-center mt-5">
                  <div className="wrapper">
                    <h2 className="title">{captcha}</h2>
                  </div>
                  <button type="button" className="ml-3" onClick={resetCaptcha}>
                    <GrPowerReset />
                  </button>
                  <input
                    type="text"
                    placeholder="Nhập mã"
                    className="rounded py-1 px-2 h-8 leading-4 text-[13px] border-[#cccccc] ml-5"
                    {...register("checkCaptcha", {
                      required: "Vui lòng nhập mã bảo mật",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="checkCaptcha"
                    render={({ messages }) => {
                      //console.log("messages", messages);
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="ml-2 text-[14px] text-red-500"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                </div>
                <div className="text-center mt-5">
                  <button
                    type="button"
                    onClick={onReset}
                    className="border-[1px] border-solid border-[#ccc] px-3 py-2 text-[13px] rounded mr-2 hover:bg-slate-200"
                  >
                    Thiết lập lại
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 px-3 py-2 text-white text-[13px] rounded hover:bg-blue-700"
                  >
                    Gửi bình luận
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="font-bold leading-[25px] py-[10px] mb-[5px] text-[20px] text-[#02659d]">
                Các văn bản cùng thể loại{" "}
                <a href="" className="text-[#333333]">
                  "Thông tư"
                </a>
              </h3>
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
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DetailFeedback;

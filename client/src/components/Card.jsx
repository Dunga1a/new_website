import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { WiTime9 } from "react-icons/wi";

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropright,
} from "react-icons/io";

import RightBar from "./list/RightBar";

const titleArr = [
  {
    title: "Điểm tin",
    border: true,
  },
  {
    title: "Tin Tức",
    border: true,
  },
  {
    title: "tin hoạt động",
    border: false,
  },
];

const contentArr = [
  [
    {
      title: "Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",
      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 2",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",
      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 3",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 4",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 5",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 6",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
  ],
  [
    {
      title: "tile 7",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 8",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
  ],
  [
    {
      title: "tile 9",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 10",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",

      date: "19/04/2023",
      time: "08:52",
    },
    {
      title: "tile 11",
      des: "Theo các nhà quan sát nước ngoài, “Việt Nam đã khôn khoan không bỏ hết trứng vào giỏ TPP” và Việt Nam không chỉ có “kế hoạch B” mà còn có cả kế hoạch...",
      date: "19/04/2023",
      time: "08:52",
    },
  ],
];

const Card = () => {
  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const [isActive, setIsActive] = useState(0);
  const [content, setContent] = useState(contentArr[0]);
  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-6 bg-white rounded-xl">
        <div className="col-span-3 phone:col-span-4 laptop:col-span-3 desktop:col-span-3 border-t-[1px] border-t-solid border-t-gray-400 mt-[25px]">
          <div className="bgr_card phone:hidden laptop:block desktop:block">
            <ul className="flex items-center justify-around text-[20px]">
              <div>
                {titleArr.map((item, idx) => (
                  <li
                    className={`${
                      item.border
                        ? "uppercase inline-block px-5 border-r-[1px] border-r-solid border-r-gray-400"
                        : "uppercase inline-block px-5"
                    } cursor-pointer`}
                    key={idx}
                    onClick={() => {
                      setIsActive(idx);
                      setContent(contentArr[idx]);
                    }}
                  >
                    <h2>
                      <span
                        className={`${
                          isActive === idx ? "text-[#000]" : "text-[#a5a5a5]"
                        } block my-[5px] leading-[22px]"`}
                      >
                        {item.title}
                      </span>
                    </h2>
                  </li>
                ))}
              </div>
              <li className="inline-block">
                <div className="flex items-center">
                  <span
                    className="border-[1px] border-solid border-[#717171] mr-1"
                    onClick={previous}
                  >
                    <IoIosArrowBack />
                  </span>
                  <span
                    className="border-[1px] border-solid border-[#717171]"
                    onClick={next}
                  >
                    <IoIosArrowForward />
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="laptop:border-b-[1px] desktop:border-b-[1px]  bobder-b-solid border-b-gray-400 mb-[25px] phone:hidden laptop:block desktop:block phone:border-none">
            <div className="pb-8">
              <Slider
                autoplay={true}
                autoplaySpeed={3000}
                slidesToShow={2}
                slidesToScroll={2}
                dots={true}
                ref={sliderRef}
                button={false}
              >
                {content.map((item, idx) => (
                  <div className="p-2" key={idx}>
                    <a
                      href="#"
                      className="grid grid-cols-3 gap-5 p-4 bg-[#f4f4f4] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div>
                        <img
                          className="object-cover w-full h-96 tablet:h-auto tablet:w-48 tablet:rounded-lg"
                          src="https://doanhnhanthanhhoahanoi.com/uploads/no-image.jpg"
                          alt=""
                        />
                        <div className="flex items-center text-[#999999]">
                          <span>
                            <WiTime9 />
                          </span>
                          {item.date}
                        </div>
                        <div className="inline-block text-[#999999]">
                          {item.time}
                        </div>
                      </div>
                      <div className=" col-span-2 flex flex-col justify-between leading-normal overflow-hidden h-[210px] text-ellipsis">
                        <h3 className="mb-2 text-[16px] font-bold text-[#494949]">
                          {item.title}
                        </h3>
                        <p className="mb-3 text-[14px] text-gray-700 dark:text-gray-400 line-clamp-4">
                          {item.des}
                        </p>
                        <div>
                          <span className=" bg-[#10bcff] text-[12px] text-white p-1">
                            Chi tiết
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="grid laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 phone:grid-cols-1 gap-3 pb-8 border-b-[1px] bobder-b-solid border-b-gray-400 ">
            <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Tin hoạt động
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div>
            <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Tin xứ thanh
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div>
            {/* <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Công trình đề tài
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div> */}
            {/* <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Thông tin kinh tế - xã hội
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div> */}
            <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Tin hội viên
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div>
            <div className="p-[15px] border-[1px] border-solid border-gray-400 rounded">
              <div className="py-3">
                <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                  <a href="" className=" block leading-[1.5]">
                    Phương thức hoạt động
                  </a>
                </h2>
              </div>

              <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                <a href="">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/197d0083412t2690l8-2.jpg"
                    alt=""
                    className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                  />
                </a>
                <h3 className="text-[16px] font-bold text-[#494949]">
                  <a href="">Đại hội Hội Doanh nhân Thanh Hóa tại Hà Nội</a>
                </h3>
                <p className="text-[14px]">
                  Chiều 10-9, tại Trung tâm Hội nghị quốc gia Mỹ Đình, Hội Doanh
                  nhân Thanh Hóa tại Hà Nội đã tổ chức Đại hội lần thứ V, nhiệm
                  kỳ 2022-2027. Dự Đại hội có các đồng chí: Trịnh Tuấn Sinh, Phó
                  Bí thư Tỉnh ủy; Nguyễn Văn Thi, Ủy viên Ban Thường vụ Tỉnh ủy,
                  Phó Chủ tịch Thường trực UBND tỉnh; đại diện một số ban, bộ,
                  ngành ở Trung ương; Hội đồng hương Thanh Hoá tại Hà Nội; lãnh
                  đạo Hiệp hội Doanh nghiệp tỉnh, VCCI Thanh Hóa, Câu lạc bộ
                  Doanh nhân Thanh Hóa tại thành phố Hồ Chí Minh và các tỉnh
                  phía Nam, Hiệp hội Doanh nghiệp một số tỉnh, thành phía Bắc.
                </p>
              </div>
              <p className="mt-3 text-[#1f9cf8]">
                <a href="" className="flex items-center float-right">
                  <span>Xem tiếp</span>
                  <IoMdArrowDropright />
                </a>
              </p>
            </div>
          </div>
          {/* <div className="grid grid-cols-2 phone:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-2">
            <div>
              <div className="bgr_card">
                <h2 className="uppercase text-[#353535] font-bold text-[20px] pl-3">
                  <a href="" className=" block">
                    Chỉ Đạo
                  </a>
                </h2>
              </div>
              <div>
                <h2 className=" uppercase text-[14px] mb-[20px] px-[22px] py-[4px] bg-[#1f9cf8] text-white rounded">
                  Chỉ đạo điều hành
                </h2>
                <div className="flex">
                  <img
                    src="https://doanhnhanthanhhoahanoi.com/assets/news/2017_08/ptt1.jpg"
                    alt=""
                    className="w-[102px] mr-4"
                  />
                  <h3>
                    <a
                      href=""
                      title="Quyết tâm cao để đẩy mạnh CCHC thực chất, hiệu quả hơn"
                      className="text-[#494949] text-[14px]"
                    >
                      Quyết tâm cao để đẩy mạnh CCHC thực chất, hiệu quả hơn
                    </a>
                  </h3>
                </div>
                <p className="mt-3 text-[14px] font-semibold text-[#1f9cf8]">
                  <a href="" className="flex items-center float-right">
                    <span>Xem tiếp</span>
                    <IoMdArrowDropright />
                  </a>
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="p-3 pt-6 laptop:block desktop:block phone:hidden">
          {/* <div className=" border-[1px] bobder-solid border-gray-400 rounded">
            <h2 className=" uppercase font-semibold text-[16px] px-[20px] py-[6px] bg-[#1f9cf8] text-white rounded">
              <a href="">lãnh đạo, chỉ đạo</a>
            </h2>
            <div className="p-3">
              <a
                href="
            "
              >
                <img
                  src="https://doanhnhanthanhhoahanoi.com/assets/news/2017_08/ptt1.jpg"
                  alt=""
                  className="w-[50px] float-left mr-2"
                />
              </a>
              <h3>
                <a
                  href=""
                  className="text-[#494949] text-[13px] font-normal leading-[1.2]"
                >
                  Quyết tâm cao để đẩy mạnh CCHC thực chất, hiệu quả hơn
                </a>
              </h3>
            </div>
          </div> */}
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default Card;

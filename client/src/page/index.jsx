import React, { useEffect, useState } from "react";

import Breadcrumbs from "../components/Breadcrumb";

import { AiFillStar } from "react-icons/ai";

import SliderPage from "../components/Slider";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const slides = [
  {
    id: 1,
    img: "https://doanhnhanthanhhoahanoi.com/uploads/banners/slider1.jpg",
  },
  {
    id: 2,
    img: "https://doanhnhanthanhhoahanoi.com/uploads/banners/slider1.jpg",
  },
  {
    id: 3,
    img: "https://doanhnhanthanhhoahanoi.com/uploads/banners/slider1.jpg",
  },
];
const DOMAIN = process.env.REACT_APP_DOMAIN;
const HomePage = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/posts/allPost`);
      console.log(res.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  //console.log(data.slice(0, 1));
  return (
    <div className="max-w-[1080px] m-auto drop-shadow-new">
      <SliderPage slides={slides} />
      <div className="rounded-b-xl bg-white grid grid-cols-5 relative top-[-5px] gap-3 px-[14px] py-8">
        {data &&
          data.length > 0 &&
          data.slice(0, 1).map((item) => (
            <div
              className="col-span-2 desktop:col-span-2 phone:col-span-5 laptop:col-span-2"
              key={item.id}
              onClick={() => navigate(`/${item.slug}`)}
            >
              <div className="bg-gray-200 w-[110%] phone:w-full">
                <img
                  src="https://doanhnhanthanhhoahanoi.com/data/tmp/news_17_197d0083412t2690l8-2_320-0.jpg"
                  alt=""
                  className="m-auto phone:m-auto w-[90%] h-[215px]"
                />
              </div>
              <div>
                <h2 className="mt-2 font-bold text-lg text-gray-700">
                  <a href="#">{item.title}</a>
                </h2>
                <span
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></span>
              </div>
            </div>
          ))}
        <div className="col-span-2 desktop:col-span-2 px-3 phone:hidden laptop:col-span-2 desktop:block laptop:block">
          <div className="flex items-center bg-blue-500 text-white text-xl p-2 mb-3">
            <AiFillStar />
            <h3 className="font-bold ml-2">TIN NỔI BẬT</h3>
          </div>

          <ul>
            {data &&
              data.length > 0 &&
              data.slice(0, 3).map((item) => (
                <li
                  key={item.id}
                  className=" cursor-pointer h-[85px] border-b-[1px] border-solid border-[#dadada] last:border-none mb-3"
                >
                  <div
                    onClick={() => navigate(`/${item.slug}`)}
                    title={`${item.title}`}
                    className="flex justify-between text-[14px] "
                  >
                    {item.title}
                    <img
                      className="ml-[20px]"
                      src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/screenshot-2022-11-24-145502.png"
                      alt=""
                    />
                  </div>
                </li>
              ))}
            {/* <li className="h-[85px] border-b-[1px] border-solid border-[#dadada] last:border-none mb-3">
              <a
                href=""
                title="HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh"
                className="flex justify-between text-[14px] "
              >
                HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh
                <img
                  className="ml-[20px]"
                  src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/screenshot-2022-11-24-145502.png"
                  alt=""
                />
              </a>
            </li>
            <li className="h-[85px] border-b-[1px] border-solid border-[#dadada] mb-3">
              <a
                href=""
                title="HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh"
                className="flex justify-between text-[14px] "
              >
                Doanh nhân Hội viên HTBC ủng hộ Quỹ Vì Người Nghèo Thành phố
                <img
                  className="ml-[20px]"
                  src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/screenshot-2022-11-24-145502.png"
                  alt=""
                />
              </a>
            </li>
            <li className="h-[85px]">
              <a
                href=""
                title="HTBC tham gia Hội nghị Xúc tiến và Kết nối đầu tư, kinh doanh"
                className="flex justify-between text-[14px] "
              >
                Doanh nhân Thanh Hóa - những người “truyền lửa” cho thế hệ trẻ
                <img
                  className="ml-[20px]"
                  src="https://doanhnhanthanhhoahanoi.com/assets/news/2022_11/screenshot-2022-11-24-145502.png"
                  alt=""
                />
              </a>
            </li> */}
          </ul>
        </div>
        <div className="desktop:col-span-1 desktop:block phone:hidden laptop:col-span-1 laptop:block">
          <div className="flex items-center mb-4">
            <img
              src="https://doanhnhanthanhhoahanoi.com/themes/egov/images/bg-tittle-map.png"
              alt=""
            />
            <h3 className="font-bold ml-2">BẢN ĐỒ HÀNH CHÍNH</h3>
          </div>
          <div>
            <img src="/assets/images/bandohc.jpg" alt="" />
          </div>
        </div>
      </div>
      <Card />
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";

import SliderPage from "../components/Slider";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const DOMAIN = process.env.REACT_APP_DOMAIN;

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

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${DOMAIN}/api/posts/allPost`);

      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    window.open(
      "https://www.google.com/maps/@21.0730303,105.7703402,15z?entry=ttu",
      "_blank"
    );
  };

  return (
    <div className="max-w-[1080px] m-auto drop-shadow-new">
      <SliderPage slides={slides} />
      <div className="rounded-b-xl bg-white grid grid-cols-5 laptop:grid-cols-5 tablet:grid-cols-5 desktop:grid-cols-5 phone:grid-cols-1 relative top-[-5px] gap-3 px-[14px] py-8">
        {data &&
          data.length > 0 &&
          data.slice(0, 1).map((item) => (
            <div
              className=" desktop:col-span-2 tablet:col-span-3 phone:col-span-1 laptop:col-span-2 cursor-pointer"
              key={item.id}
              onClick={() => navigate(`/${item.slug}`)}
            >
              <div className="bg-gray-200 w-[110%] phone:w-full">
                <img
                  src={`${item.image}`}
                  alt=""
                  className="m-auto phone:m-auto w-[90%] h-[215px]"
                />
              </div>
              <div>
                <h2 className="mt-2 font-bold text-lg text-gray-700">
                  <p>{item.title}</p>
                </h2>
                <span className="text-sm">{item.subcontent}</span>
              </div>
            </div>
          ))}
        <div className=" desktop:col-span-2 px-3 tablet:col-span-2 phone:col-span-1 laptop:col-span-2 desktop:block laptop:block">
          <div className="flex items-center bg-blue-500 text-white text-xl p-2 mb-3">
            <AiFillStar />
            <h3 className="font-bold ml-2">TIN NỔI BẬT</h3>
          </div>

          <ul>
            {loading ? (
              <LoadingPage />
            ) : (
              data &&
              data.length > 0 &&
              data.slice(0, 3).map((item) => (
                <li
                  key={item.id}
                  className=" cursor-pointer h-[85px] border-b-[1px] border-solid border-[#dadada] last:border-none mb-3"
                >
                  <div
                    onClick={() => navigate(`/${item.slug}`)}
                    title={`${item.title}`}
                    className="grid grid-cols-3 text-[14px] gap-3"
                  >
                    <span className=" col-span-2">
                      <p className="line-clamp-3 font-semibold">{item.title}</p>
                    </span>
                    <span className="">
                      <img
                        className=" h-[70px] w-full object-cover"
                        src={item.image}
                        alt=""
                      />
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="desktop:col-span-1 desktop:block phone:hidden laptop:col-span-1 laptop:block">
          <div className="flex items-center mb-4">
            <a
              href="https://www.google.com/maps/@21.0730303,105.7703402,15z?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center "
            >
              <img
                src="https://doanhnhanthanhhoahanoi.com/themes/egov/images/bg-tittle-map.png"
                alt=""
              />
              <h3 className="font-bold ml-2">BẢN ĐỒ HÀNH CHÍNH</h3>
            </a>
          </div>
          <div onClick={handleClick} className="cursor-pointer">
            <img src="/assets/images/bandohc.jpg" alt="" />
          </div>
        </div>
      </div>
      <Card />
    </div>
  );
};

export default HomePage;

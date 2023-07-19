import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import EmptyState from "./EmptyState/EmptyState";
import LoadingPage from "./LoadingPage";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const Card = () => {
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);
  const [arrContent, setArrContent] = useState([]);
  const [arrNew, setArrNew] = useState([]);
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;
      const category = await axios.get(
        `${DOMAIN}/api/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );

      const sortedCategories = category.data.getListCategory
        .filter((item) => item.father_id === null)
        .sort((a, b) => b.news_category_id - a.news_category_id);

      const firstTwoCategories = sortedCategories.slice(0, 2);

      const promises = firstTwoCategories.map(async (item) => {
        const result = await axios.get(
          `${DOMAIN}/api/posts/getPostBySlugOfCategory/${item.news_category_id}?page=${sheet}`
        );
        return result.data.query;
      });

      const posts = await Promise.all(promises);
      const promisesTwo = category.data.getListCategory
        .sort((a, b) => b.news_category_id - a.news_category_id)
        .map(async (item) => {
          const result = await axios.get(
            `${DOMAIN}/api/posts/getPostBySlugOfCategory/${item.news_category_id}?page=${sheet}`
          );
          return result.data.query;
        });
      const postsTwo = await Promise.all(promisesTwo);

      const mergedArrayWithMaxId = postsTwo.map((array) => {
        if (array.length === 0) {
          return null; // hoặc có thể trả về một giá trị mặc định khác
        }

        const maxItem = array.reduce((prevItem, currItem) => {
          return currItem.id > prevItem.id ? currItem : prevItem;
        });

        return maxItem;
      });
      const idSet = new Set();
      const filteredArray = mergedArrayWithMaxId.filter((item) => {
        if (item === null) {
          return false;
        }

        if (idSet.has(item.id)) {
          return false;
        }

        idSet.add(item.id);
        return true;
      });

      // console.log("postsTwo: ", postsTwo);
      // console.log("mergedArrayWithMaxId: ", mergedArrayWithMaxId);
      // console.log("filteredArray: ", filteredArray);
      setArrNew(filteredArray);
      setArrContent([posts.flat(), posts[0], posts[1]]);

      setArr([
        {
          name: "Điểm tin",
          border: true,
        },

        ...firstTwoCategories,
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const [isActive, setIsActive] = useState(0);
  const [content, setContent] = useState(0);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-6 bg-white rounded-xl">
        <div className="col-span-3 phone:col-span-4 laptop:col-span-3 desktop:col-span-3 border-t-[1px] border-t-solid border-t-gray-400 mt-[25px]">
          <div className="bgr_card phone:hidden laptop:block desktop:block">
            <ul className="flex items-center justify-around text-[20px]">
              <div>
                {loading ? (
                  <LoadingPage />
                ) : (
                  arr &&
                  arr.map((item, idx) => {
                    return (
                      <li
                        className={`${
                          idx !== arr.length - 1
                            ? "uppercase inline-block px-5 border-r-[1px] border-r-solid border-r-gray-400"
                            : "uppercase inline-block px-5"
                        } cursor-pointer`}
                        key={idx}
                        onClick={() => {
                          setIsActive(idx);
                          setContent(idx);
                        }}
                      >
                        <h2>
                          <span
                            className={`${
                              isActive === idx
                                ? "text-[#000]"
                                : "text-[#a5a5a5]"
                            } block my-[5px] leading-[22px]"`}
                          >
                            {item.name}
                          </span>
                        </h2>
                      </li>
                    );
                  })
                )}
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
          <div className="laptop:border-b-[1px] desktop:border-b-[1px]  border-b-solid border-b-gray-400 mb-[25px] phone:hidden laptop:block desktop:block phone:border-none">
            <div className="pb-8">
              {loading ? (
                <LoadingPage />
              ) : (
                <Slider
                  autoplay={true}
                  autoplaySpeed={3000}
                  slidesToShow={
                    (arrContent &&
                      arrContent[content] &&
                      (Array.isArray(arrContent[content])
                        ? arrContent[content].length === 0
                        : true)) ||
                    arrContent[content]?.length === 1
                      ? 1
                      : 2
                  }
                  slidesToScroll={2}
                  dots={true}
                  ref={sliderRef}
                  button={false}
                >
                  {arrContent && arrContent[content] ? (
                    arrContent[content].length > 0 ? (
                      arrContent[content].map((item, idx) => {
                        return (
                          <div className="p-2" key={idx}>
                            <div className="grid grid-cols-3 gap-5 p-4 bg-[#f4f4f4] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <div>
                                <img
                                  className="object-cover w-full max-h-[80px] tablet:h-auto tablet:w-48 tablet:rounded-lg"
                                  src={
                                    item.image
                                      ? `${item.image}`
                                      : "/assets/images/new_default.jpg"
                                  }
                                  alt=""
                                />
                                <div className="flex items-center text-[#999999]">
                                  <span className="flex gap-1 items-center">
                                    <WiTime9 />
                                    {dayjs(item.created_at).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </span>
                                </div>
                                <div className="inline-block text-[#999999]">
                                  {dayjs(item.created_at).format("h:mm A")}
                                </div>
                              </div>
                              <div className=" col-span-2 flex flex-col justify-between leading-normal overflow-hidden h-[210px] text-ellipsis">
                                <h3 className="mb-2 text-[16px] font-bold text-[#494949]">
                                  {item.title}
                                </h3>
                                <p className="mb-3 text-[14px] text-gray-700 dark:text-gray-400 line-clamp-4">
                                  {item.subcontent}
                                </p>
                                <div onClick={() => nav(`/${item.slug}`)}>
                                  <span className=" bg-[#10bcff] text-[12px] text-white p-1">
                                    Chi tiết
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <EmptyState />
                    )
                  ) : (
                    <EmptyState />
                  )}
                </Slider>
              )}
            </div>
          </div>
          <div className="grid laptop:grid-cols-2 desktop:grid-cols-2 tablet:grid-cols-1 phone:grid-cols-1 gap-3 pb-8 border-b-[1px] bobder-b-solid border-b-gray-400 ">
            {arrNew.map((item) => {
              return (
                <div
                  className="p-[15px] border-[1px] border-solid border-gray-400 rounded"
                  key={item.id}
                >
                  <div className="py-3">
                    <h2 className="uppercase text-[#494949] font-bold text-[20px] pb-1 border-b-[2px] border-b-solid border-b-[#fba919]">
                      <p className=" block leading-[1.5]">
                        {item.newsCategory.name}
                      </p>
                    </h2>
                  </div>

                  <div className="h-[178px] overflow-hidden py-2 relative after:content after:absolute after:w-full after:h-[20px] after:bg-gradient-to-l from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.6)] after:bottom-[-10px]">
                    <div>
                      <img
                        src={
                          item.image
                            ? item.image
                            : "/assets/images/new_default.jpg"
                        }
                        alt=""
                        className="float-left mt-[4px] mr-[15px] max-width-full w-[170px]"
                      />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#494949]">
                      <p>{item.title}</p>
                    </h3>
                    <p className="text-[14px]">{item.subcontent}</p>
                  </div>
                  <p className="mt-3 text-[#1f9cf8]">
                    <p
                      className="flex items-center float-right cursor-pointer"
                      onClick={() => nav(`/${item.slug}`)}
                    >
                      <span>Xem tiếp</span>
                      <IoMdArrowDropright />
                    </p>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-3 pt-6 laptop:block desktop:block phone:hidden">
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default Card;

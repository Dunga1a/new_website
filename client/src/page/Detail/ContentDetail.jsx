import React, { useEffect, useState } from "react";

import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";

import Breadcrumbs from "../../components/Breadcrumb";
import { CgCalendarDates } from "react-icons/cg";
import ShareFaceBook from "../../components/ShareSocial/ShareFaceBook";
import ShareTwitter from "../../components/ShareSocial/Twitter";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
const ContentDetail = () => {
  // TODO fetch data ở đây
  const [data, setData] = useState(null);
  const { slug } = useParams();
  console.log(slug);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/posts/details-slug/" + slug
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data?.title);
  return (
    <div className="bg-white pt-6">
      {data ? (
        <>
          <Breadcrumbs
            title={"Điểm Tin"}
            // sau khi fetch data thì sẽ lấy theo title ở đây
            subtitle={`${data.title}`}
            link={"/news"}
            // link sẽ theo thằng category
          />

          <div className="grid grid-cols-4 gap-3 p-7">
            <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4 ">
              <h3 className="font-bold text-lg mb-4">{data.title}</h3>
              <p className="flex items-center gap-2 mb-5 border-t-[1px] border-b-[1px] border-[#ccc] py-2">
                <CgCalendarDates />
                <span className="text-[13px] italic">
                  {dayjs(data.created_at).format("DD/MM/YYYY")}
                </span>
              </p>
              <div className="mb-5">
                <img
                  src="http://dntpthanhhoa.vn/wp-content/uploads/2021/05/13.jpg"
                  alt=""
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>

              <div className="flex justify-end items-center gap-3 mt-5 border-t-[1px] border-b-[1px] border-[#ccc] py-4">
                Chia sẻ:
                <ShareFaceBook
                  url={
                    "http://dntpthanhhoa.vn/trung-tam-nghien-cuu-khoa-hoc-va-xet-nghiem-cong-nghe-cao-hstc.html"
                  }
                  icon={<BsFacebook className="text-[20px] text-blue-500" />}
                />
                <ShareTwitter
                  url={
                    "http://dntpthanhhoa.vn/trung-tam-nghien-cuu-khoa-hoc-va-xet-nghiem-cong-nghe-cao-hstc.html"
                  }
                  icon={
                    <AiFillTwitterCircle className="text-[23px] text-blue-500" />
                  }
                />
              </div>
            </div>
            <div className="phone:hidden laptop:block desktop:block tablet:hidden">
              <Category />
              <RightBar />
            </div>
          </div>
        </>
      ) : (
        "Không có dữ liệu"
      )}
    </div>
  );
};

export default ContentDetail;

import React from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";
import { BiRss } from "react-icons/bi";
import RssDetail from "./RssDetail";
import RssNav from "../../components/RssFeedsNav";
import "./rss.css";
const contentArr = [
  [
    {
      title: "Tin hoạt động",
      slug: "tin-hoat-dong",
    },
    {
      title: "Chỉ đạo điều",
      slug: "chi-dao-dieu",
    },
    {
      title: "Thông tin tuyên",
      slug: "thong-tin-tuyen",
    },
    {
      title: "Thông tin kinh",
      slug: "thong-tin-kinh",
    },
    {
      title: "Tin hội viên",
      slug: "tin-hoi-viên",
    },
    {
      title: "Tin doanh nhân",
      slug: "tin-doanh-nhan",
    },
    {
      title: "Tin xứ thanh",
      slug: "tin-xu-thanh",
    },
    {
      title: "Tin kinh tế",
      slug: "tin-kinh-te",
    },
    {
      title: "Tin pháp luật",
      slug: "tin-phap-luat",
    },
  ],
  [
    {
      title: "Công văn",
      slug: "Cong-van",
    },
    {
      title: "Thông tư",
      slug: "Thong-tu",
    },
    {
      title: "Quyết định",
      slug: "Quyet-dinh",
    },
    {
      title: "Nghị định",
      slug: "Nghi-dinh",
    },
    {
      title: "Thông báo",
      slug: "Thong-bao",
    },
    {
      title: "Hướng dẫn",
      slug: "Huong-dan",
    },
    {
      title: "Báo cáo",
      slug: "Bao-cao",
    },
    {
      title: "Chỉ thị",
      slug: "Chi-thi",
    },
    {
      title: "Kế hoạch",
      slug: "Kế-hoạch",
    },
  ],
  [
    {
      title: "Giáo dục và đào tạo",
      slug: "Giao-duc-va-dao-tao",
    },
    {
      title: "Dân sinh",
      slug: "Dan-sinh",
    },
    {
      title: "Kinh tế",
      slug: "kinh-te",
    },
  ],
  [
    {
      title: "Điều kiện tham gia",
      slug: "dieu-kien-tham-gia",
    },
    {
      title: "Quyền lợi Hội Viên",
      slug: "quyen-loi-hoi-vien",
    },
    {
      title: "Hướng dẫn đăng ký",
      slug: "huong-dan-dang-ky",
    },
    {
      title: "Hội Phí",
      slug: "hoi-phi",
    },
  ],
  [
    {
      title: "Doanh nghiệp liên kết",
      slug: "doanh-nghiep-lien-ket",
    },
    {
      title: "Hợp tác đầu tư",
      slug: "hop-tac-dau-tu",
    },
    {
      title: "Xúc tiến thương mại",
      slug: "xuc-tien-thuong-mai",
    },
    {
      title: "Tin tức",
      slug: "hoi-phi",
      sublink: [
        {
          title: "Thông cáo báo chí",
          slug: "thong-cao-bao-chi",
        },
        {
          title: "Thông cáo báo chí",
          slug: "thong-cao-bao-chi",
        },
        {
          title: "Thông cáo báo chí",
          slug: "thong-cao-bao-chi",
        },
      ],
    },
    {
      title: "Sản phẩm",
      slug: "San-pham",
    },
    {
      title: "Đối tác",
      slug: "doi-tac",
    },
    {
      title: "Tuyển dụng",
      slug: "tuyen-dung",
    },
  ],
  [
    {
      title: "Khu vực Duyên hải miền Trung",
      slug: "khu-vuc-duyen-hai-mien-trung",
    },
    {
      title: "Khu vực Đồng bằng sông Hồng",
      slug: "khu-vuc-dong-bang-song-hong",
    },
    {
      title: "Khu vực Bắc Trung Bộ",
      slug: "khu-vuc-bac-trung-bo",
    },
    {
      title: "Khu vực Duyên hải miền Trung",
      slug: "khu-vuc-duyen-hai-mien-trung",
    },
  ],
];
const RssFeeds = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"RSS-feeds"} />
      <div className="grid grid-cols-4 gap-3 px-3">
        <div className="col-span-3 py-5 ">
          <div className="bg-slate-100 py-2 rounded-xl border-inset">
            <ul className="pl-8 relative list_nav">
              <li>
                <span>
                  <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                    <BiRss className="text-[#8a6d3b] font-bold" />
                    <div>Giới thiệu</div>
                  </span>
                </span>
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[86%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Tin tức</div>
                </span>
                <RssNav arr={contentArr[0]} />
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[86%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Lấy ý kiến người dân</div>
                </span>
                <RssNav arr={contentArr[1]} />
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[68%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Các câu hỏi thưởng gặp</div>
                </span>
                <RssNav arr={contentArr[2]} />
              </li>
              <li className=" relative">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Page</div>
                </span>
              </li>
              <li className=" relative">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Điều khoản sử dụng</div>
                </span>
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[75%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Hội viên</div>
                </span>
                <RssNav arr={contentArr[3]} />
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[88%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Hội viên</div>
                </span>
                <RssNav arr={contentArr[4]} />
              </li>
              <li className=" relative before:content before:absolute before:w-[1px] before:h-[76%] before:border-l-[#999] before:border-l-solid before:border-l-[1px] before:top-[41px] before:left-[16px]">
                <span className="inline-flex px-[8px] py-[3px] items-center font-bold border-solid border-[1px] border-[#999] rounded">
                  <BiRss className="text-[#8a6d3b] font-bold" />
                  <div>Dự án</div>
                </span>
                <RssNav arr={contentArr[5]} />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-1 py-5">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default RssFeeds;

import React from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import HomePage from "../";
const NewsPage = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"điểm tin"} />
      <div className="grid grid-cols-3 gap-3">
        <div className=" col-span-3 ">
          <HomePage />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

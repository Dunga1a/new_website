import React from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
const TradePage = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Giao thương"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4  col-span-3 "></div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default TradePage;

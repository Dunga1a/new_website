import React from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import HeaderTitle from "../../components/HeaderTitle";
import { useLocation } from "react-router";
import RightBar from "../../components/list/RightBar";
const DetailProjectPage = () => {
  const { state } = useLocation();
  const props = state.item;
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"Dự án"}
        subtitle={props.title}
        link={"/projects-page"}
      />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="pt-4 col-span-3 ">
          <HeaderTitle title={props.title} />
        </div>
        <div>
          <div>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProjectPage;

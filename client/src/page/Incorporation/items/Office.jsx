import React from "react";
import InCpBreadcrumb from "../InCpBreadcrumb/InCpBreadcrumb";
import Breadcrumbs from "../../../components/Breadcrumb";
import RightBar from "../../../components/list/RightBar";

import { useLocation } from "react-router-dom";
const Office = () => {
  const { state } = useLocation();
  const prop = state.item;
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"cơ cấu tổ chức"}
        subtitle={prop.title}
        link={"/incorporation"}
      />
      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="col-span-3">
          <div className="  rounded border-solid border-[1px] border-sky-500">
            <InCpBreadcrumb title={prop.title} />
            <div className="p-4"></div>
          </div>
        </div>
        <div className="col-span-1">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Office;

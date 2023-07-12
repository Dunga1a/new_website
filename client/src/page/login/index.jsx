import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import Category from "../../components/list/Category";

const UserAuth = () => {
  return (
    <div className="bg-white">
      <div className="">
        <div className="pt-4">
          <Breadcrumbs title={"Thành Viên"} link={"/user"} />
        </div>

        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4">
            <Outlet />
          </div>

          
            <Category />
          
        </div>
      </div>
    </div>
  );
};

export default UserAuth;

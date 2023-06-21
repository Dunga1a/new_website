import React from "react";
import Breadcrumbs from "../../../components/Breadcrumb";
import RightBar from "../../../components/list/RightBar";
const DetailUser = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"Cơ cấu tổ chức"}
        subtitle={"Ban Tổ Chức"}
        link={"/incorporation"}
      />
      <div className="grid grid-cols-4 gap-4 p-7">
        <div className=" col-span-3 ">
          <div className="  rounded border-solid border-[1px] border-slate-500">
            <div className="text-center">
              <h2 className="bg-[#1f9cf8] rounded border-[#1f9cf8] uppercase font-bold text-white py-2">
                thông tin nhân sự
              </h2>
            </div>
            <div className="p-4">
              <div className="relative ">
                <table className="w-full border-collapse border border-slate-200 text-sm text-left text-[#333]">
                  <colgroup>
                    <col className="w-[200px]" />
                  </colgroup>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td
                        rowSpan={3}
                        className=" border-collapse border border-slate-500 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img src="" alt="" className="max-w-[80px]" />
                      </td>
                      <td className="px-3 py-2 border-collapse border border-slate-500">
                        Họ tên
                      </td>
                      <td className="px-3 py-2 border-collapse border border-slate-500">
                        Nguyễn Hùng Dũng
                      </td>
                    </tr>
                    <tr>
                      <td className="border-collapse border border-slate-500 py-2 px-3">
                        Chức danh
                      </td>
                      <td className="border-collapse border border-slate-500 py-2 px-3">
                        Chủ tịch - Trưởng ban
                      </td>
                    </tr>
                    <tr>
                      <td className="border-collapse border border-slate-500 py-2 px-3">
                        Chức danh
                      </td>
                      <td className="border-collapse border border-slate-500 py-2 px-3">
                        Chủ tịch - Trưởng ban
                      </td>
                    </tr>
                    <tr>
                      <td className="border-collapse border border-slate-500 py-2 px-3">
                        Ngày sinh
                      </td>
                      <td
                        className="border-collapse border border-slate-500 py-2 px-3"
                        colSpan={2}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default DetailUser;

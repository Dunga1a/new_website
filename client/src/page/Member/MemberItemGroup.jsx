import React from "react";
import MemberItem from "./MemberItem";

const MemberItemGroup = ({ title, memberArr }) => {
  return (
    <div className="my-2">
      <p className="mb-1 font-bold text-[20px] text-[#4682B4]">{title}</p>

      {/* <div>
        {memberArr.map((member) => {
          return <MemberItem member={member} />;
        })}
      </div> */}
      <div>
        <table class="border-collapse border border-slate-500 w-full">
          <thead>
            <tr>
              <th class="border border-slate-600 p-[2px]">STT</th>
              <th class="border border-slate-600 p-[2px]">Tên doanh nghiệp</th>
              <th class="border border-slate-600 ">Thông tin doanh nghiệp</th>
              <th class="border border-slate-600">Ảnh đại diện</th>
            </tr>
          </thead>
          {memberArr.map((member, idx) => {
            return <MemberItem member={member} stt={idx} />;
          })}
        </table>
      </div>
    </div>
  );
};

export default MemberItemGroup;

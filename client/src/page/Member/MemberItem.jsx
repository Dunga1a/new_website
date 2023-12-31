import React from "react";
import { useNavigate } from "react-router-dom";
const MemberItem = ({ member, stt }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/member/${item.id}`, { state: item });
  };
  // console.log("searchKey: ", searchKey);
  return (
    // <div
    //   key={member.id}
    //   onClick={() => handleItemClick(member)}
    //   className=" cursor-pointer grid grid-cols-3 laptop:grid tablet:grid laptop:grid-cols-3 tablet:grid-cols-3 phone:block gap-4 mb-4 bg-white border border-gray-200 rounded-lg shadow desktop:flex-row desktop:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    // >
    //   <div className=" h-[250px] bg-gray-200">
    // <img
    //   className="w-full object-contain rounded-md h-full  "
    //   src={member.image_company ? `/uploads/${member.image_company}` : ""}
    //   alt=""
    // />
    //   </div>

    //   <div className="col-span-2 flex flex-col justify-between  leading-normal mx-3">
    //     <p className=" tracking-tight text-gray-900 dark:text-white mt-2">
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Tên doanh nghiệp:{" "}
    //       </span>
    //       {member.name_company}
    //     </p>
    //     <p className="mb-1 font-semibold text-red-600 dark:text-gray-400">
    //       {member.role_name}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Người đại diện :{" "}
    //       </span>
    //       {member.representative}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         SĐT :{" "}
    //       </span>
    //       {member.phone}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Email:{" "}
    //       </span>
    //       {member.email}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Lĩnh vực hoạt động:{" "}
    //       </span>
    //       {member.id_business_areas.name}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Website:{" "}
    //       </span>
    //       {member.website ? member.website : ""}
    //     </p>
    //     <p>
    //       <span className="font-semibold text-[#333333] text-[14px]">
    //         Địa chỉ:{" "}
    //       </span>
    //       {member.address}
    //     </p>
    //     <p className="mb-2">
    //       <span className=" text-[#333333] text-[14px] line-clamp-2 ">
    //         <b>Mô tả:</b>
    //         <div dangerouslySetInnerHTML={{ __html: member.intro }} />
    //       </span>
    //     </p>
    //   </div>
    // </div>
    <tbody>
      <tr
        className="cursor-pointer hover:bg-gray-100 border"
        onClick={() => handleItemClick(member)}
      >
        <td class=" text-center font-semibold p-1">{stt + 1}</td>
        <td class="border w-[13%] tablet:w-[13%] phone:w-[50%] p-1">
          <div className="overflow-hidden">
            <div className="line-clamp-[8] ">{member.name_company}</div>
          </div>
        </td>

        <td class="max-w-full p-1 tablet:block phone:hidden laptop:block desktop:block">
          <p>Người đại điện: {member.representative}</p>
          <p>Chức vụ: {member.role_name}</p>
          <p>Số điện thoại: {member.phone}</p>
          <p>Email: {member.email}</p>
          <p>Lĩnh vực hoạt động: {member.id_business_areas.name}</p>
          <p>Website: {member?.website}</p>
          <p>Địa chỉ: {member.address}</p>
          <p className="flex">
            <p className="min-w-[11%]">Mô tả:</p>
            <div
              className="max-w-[90%] line-clamp-1"
              dangerouslySetInnerHTML={{
                __html: member.intro ? `${member.intro}` : "",
              }}
            ></div>
          </p>
        </td>
        <td className="border w-[26%] tablet:w-[26%] phone:w-[40%]">
          <div className="bg-gray-200">
            <img
              className="w-full object-contain rounded-md h-[170px]  "
              src={
                member.image_company
                  ? `/uploads/${member.image_company}`
                  : "/assets/images/default_member.jpg"
              }
              alt=""
            />
          </div>
        </td>
      </tr>
      {/* <tr>
        <td class="border border-slate-700 ...">Ohio</td>
        <td class="border border-slate-700 ...">Columbus</td>
      </tr>
      <tr>
        <td class="border border-slate-700 ...">Michigan</td>
        <td class="border border-slate-700 ...">Detroit</td>
      </tr> */}
    </tbody>
  );
};

export default MemberItem;

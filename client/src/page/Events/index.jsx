import React from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
import { useNavigate } from "react-router-dom";
const events = [
  {
    event_id: 1,
    eventName: "HỘI NGHỊ XÚC TIẾN ĐẦU TƯ VÀO THÀNH PHỐ HỒ CHÍ MINH NĂM 2019",
    timeStart: "7:30 - 11:30",
    dayStart: "16/04/2019",
  },
  {
    event_id: 2,
    eventName:
      "Hội nghị Lãnh đạo thành phố gặp gỡ chuyên gia tri thức, doanh nhân kiều bào hiến kế xây dựng Thành phố Hồ Chí Minh trở thành ' Trung tâm Tài chính ' và ' Đô thị Sáng tạo ' của khu vực",
    timeStart: "Cả ngày",
    dayStart: "25/03/2019 - 30/03/2019",
  },
];
const PageEvents = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Sự kiện"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4 border">
          <div>
            <h1 className="text-xl my-3 text-red-500 font-medium border-b border-b-slate-500">
              Sự Kiện
            </h1>
            <table className="w-full text-center border text-[#080808]">
              <thead className="border ">
                <tr>
                  <th className="border border-slate-400 py-2 text-[16px]">
                    Thời gian diễn ra
                  </th>
                  <th className="border border-slate-400 py-2 text-[16px]">
                    Sự kiện
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr className="border border-slate-400" key={event.event_id}>
                    <td className="border border-slate-400">
                      {event.dayStart} <br /> {event.timeStart}
                    </td>
                    <td className="border border-slate-400 cursor-pointer">
                      <span
                        className="text-blue-700 font-medium hover:underline"
                        onClick={() =>
                          navigate(`/events-page/${event.event_id}`)
                        }
                      >
                        {event.eventName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default PageEvents;

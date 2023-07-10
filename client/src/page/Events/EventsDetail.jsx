import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "react-quill/dist/quill.snow.css";

const EventsDetail = () => {
  const { id } = useParams();
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  // const { url } = useContext(AuthContext);
  const [eventItem, setEventItem] = useState();
  const fetchData = async () => {
    try {
      const result = await axios.get(`${DOMAIN}/api/event/${id}`);

      setEventItem(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Sự kiện"} link={"/events-page"} />
      {eventItem ? (
        <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
          <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4 ">
            <h1 className="font-semibold text-xl mb-5 uppercase">
              {eventItem.title}
              {/* HỘI NGHỊ XÚC TIẾN ĐẦU TƯ VÀO THÀNH PHỐ HỒ CHÍ MINH NĂM 2019 */}
            </h1>
            <div>
              <strong>Date/Time</strong>
              <p>
                Date(s) -{dayjs(eventItem.date_start).format("DD/MM/YYYY")}{" "}
                {eventItem.date_end
                  ? `- ${dayjs(eventItem.date_end).format("DD/MM/YYYY")}`
                  : ""}
              </p>
              <p>{eventItem.time}</p>
            </div>
            <div>
              <strong>Nhóm sự kiện</strong>
              <div>
                <div
                  style={{
                    "max-height": "unset",
                  }}
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: eventItem.content }}
                />
              </div>

              <p>
                - Thời gian: {eventItem.time},{" "}
                {dayjs(eventItem.date_start)
                  .locale("vi")
                  .format("dddd, ngày DD/MM/YYYY")}
                {eventItem.date_end
                  ? `- ${dayjs(eventItem.date_end)
                      .locale("vi")
                      .format("dddd, ngày DD/MM/YYYY")}`
                  : ""}
              </p>
              <p>- Địa điểm: {eventItem.address}.</p>
              <p>- Chủ trì: {eventItem.leader}.</p>

              {eventItem.file_pdf ? (
                <>
                  <p>Thông tin chi tiết xin vui lòng xem file đính kèm</p>
                  {eventItem.file_pdf.split(",").map((item) => {
                    return (
                      <>
                        <a href={`/uploads/pdf/${item.trim()}`} download>
                          {item.substring(item.indexOf("-") + 1).trim()}
                        </a>
                        <br />
                      </>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
          <div>
            <RightBar />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventsDetail;

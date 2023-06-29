import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumb";
import RightBar from "../../components/list/RightBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import PaginationV2 from "../../components/Pagination/PaginationV2";
import { AuthContext } from "../../context/authContext";
const PageEvents = () => {
  const navigate = useNavigate();
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const [eventList, setEventList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState();
  const page = searchParams.get("page") || 1;
  const searchKey = searchParams.get("searchKey") || "";
  const dateStart = searchParams.get("dateStart") || "";
  const dateEnd = searchParams.get("dateEnd") || "";
  const queryParams = {
    page,
  };
  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const search = searchKey ? searchKey : "";
      const date_start = dateStart ? dateStart : "";
      const date_end = dateEnd ? dateEnd : "";
      const result = await axios.get(
        `${DOMAIN}/api/event/getAllEvent?page=${sheet}&searchKey=${search}&dateStart=${date_start}&dateEnd=${date_end}`,
        {
          withCredentials: true,
        }
      );
      setEventList(result.data.eventList);
      setCount(result.data.countEvent);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Sự kiện"} />
      <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
        <div className="px-5 pt-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3 phone:col-span-4 border">
          <div>
            <h1 className="text-xl my-3 text-red-500 font-medium border-b border-b-slate-500">
              Sự Kiện
            </h1>
            {eventList ? (
              <table className="w-full text-center border text-[#080808]">
                <thead className="border ">
                  <tr>
                    <th className="border border-slate-400 py-2 text-[16px] w-[110px]">
                      Thời gian diễn ra
                    </th>
                    <th className="border border-slate-400 py-2 text-[16px]">
                      Sự kiện
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventList.map((event) => (
                    <tr className="border border-slate-400" key={event.id}>
                      <td className="border border-slate-400">
                        {dayjs(event.date_start).format("DD/MM/YYYY")}{" "}
                        {event.date_end
                          ? `- ${dayjs(event.date_end).format("DD/MM/YYYY")}`
                          : ""}
                        <br />
                        {event.time}
                      </td>
                      <td className="border border-slate-400 cursor-pointer">
                        <span
                          className="text-blue-700 font-medium hover:underline"
                          onClick={() => navigate(`/events-page/${event.id}`)}
                        >
                          {event.title}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {eventList && (
              <PaginationV2
                total={count}
                current={searchParams.get("page") || 1}
                pageSize="8"
                onChange={handleChangePage}
              />
            )}
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

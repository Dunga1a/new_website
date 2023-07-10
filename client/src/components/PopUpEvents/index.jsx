import React, { useState, useEffect } from "react";
import "./popup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const PopupEvent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const hasShownPopup = localStorage.getItem("hasShownPopup");

    if (!hasShownPopup) {
      setShowPopup(true);
      localStorage.setItem("hasShownPopup", "true");
    }
    setTimeout(() => {
      localStorage.removeItem("hasShownPopup");
    }, 86000);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchData = async () => {
    try {
      //const sheet = page ? page : 1;

      const result = await axios.get(
        `${DOMAIN}/api/event/getAllEvent?page=1&searchKey=&dateStart=&dateEnd=`,
        {
          withCredentials: true,
        }
      );
      //console.log(result.data);
      setEventList(result.data.eventList[0]);
      //setCount(result.data.countEvent);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    showPopup && (
      <div className="bg-gray-800 bg-opacity-70 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[2000]">
        {/* {eventList.length &&
          eventList.map((item) => {
            <div className="text-bold text-[#333]">{item.time}</div>;
            <div>heeh</div>;
          })} */}
        <div className="relative cursor-pointer hover:opacity-90 top-[-150px] left-32">
          <div
            onClick={() => {
              navigate(`/events-page/${eventList.id}`);
              setShowPopup(false);
            }}
          >
            <img
              src="https://doanhnhanthanhhoahanoi.com/uploads/news/2022_11/dom00292_2.jpg"
              className="img-event"
              alt=""
            />
            {/* {eventList &&
              eventList.length &&
              eventList.map((item) => (
                <div key={item.id}>
                  <div>{item.title}</div>
                </div>
              ))} */}

            {/* Your other components */}
          </div>
          <button
            onClick={handleClosePopup}
            className=" glitch font-bold text-[30px] text-red-600"
            data-glitch="X"
          >
            X
          </button>
        </div>
      </div>
    )
  );
};

export default PopupEvent;

import React, { useState, useEffect } from "react";
import "./popup.css";
const PopupEvent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const currentDate = Date.now().toString();
  const lastViewedDate = localStorage.getItem("lastViewedDate");
  useEffect(() => {
    if (lastViewedDate !== currentDate) {
      setShowPopup(true);
      localStorage.setItem("lastViewedDate", currentDate);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="bg-gray-800 bg-opacity-70 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[2000]">
        <div className=" relative">
          {/* <h1>Welcome to our website!</h1>
          <p>This is your first visit today. Enjoy your stay!</p> */}
          <div className="popup">
            <img
              src="https://doanhnhanthanhhoahanoi.com/uploads/news/2022_11/dom00292_2.jpg"
              className="img-event"
              alt=""
            />
          </div>
          <button
            onClick={handleClosePopup}
            className=" glitch font-bold text-[30px] text-red-600"
            data-glitch="X"
          >
            X
          </button>

          {/* Your other components */}
        </div>
      </div>
    )
  );
};

export default PopupEvent;

import React from "react";
import { FacebookShareButton } from "react-share";
function ShareFaceBook({ url, title, icon, description, image }) {
  return (
    <div className="flex">
      <FacebookShareButton url={url} quote={title} hashtag="#doanhnhanthanhhoa">
        {icon ? icon : "Chia Sẻ"}
      </FacebookShareButton>
    </div>
  );
}

export default ShareFaceBook;

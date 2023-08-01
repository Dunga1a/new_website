import React from "react";
import { FacebookShareButton } from "react-share";
import { Helmet } from "react-helmet";
function ShareFaceBook({ url, title, icon, description, image }) {
  return (
    <div className="flex">
      <Helmet>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Helmet>
      <FacebookShareButton url={url} quote={title} hashtag="#doanhnhanthanhhoa">
        {icon ? icon : "Chia Sẻ"}
      </FacebookShareButton>
    </div>
  );
}

export default ShareFaceBook;

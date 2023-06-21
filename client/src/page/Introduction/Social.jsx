import React from "react";

import { AiFillLike, AiOutlineTwitter } from "react-icons/ai";

import ShareFaceBook from "../../components/ShareSocial/ShareFaceBook";
import Twitter from "../../components/ShareSocial/Twitter";

const Social = ({ url }) => {
  return (
    <div>
      <ul className="flex items-center text-[14px] px-4 py-5 bg-slate-300 rounded-2xl mb-5">
        <li className="inline-block px-2 bg-blue-500 text-white rounded mr-3 hover:opacity-80">
          <a href="" className="flex items-center">
            <AiFillLike />
            Thích
            <span className="ml-2 ">0</span>
          </a>
        </li>
        <li className="inline-block px-2 bg-blue-500 text-white rounded hover:opacity-80">
          <ShareFaceBook url={url} />
        </li>
        <li className="ml-4 px-2 bg-[#1d9bf0] text-white rounded-lg mr-3 hover:opacity-80 flex items-center">
          <AiOutlineTwitter />
          <Twitter url={url} />
        </li>
      </ul>
    </div>
  );
};

export default Social;

import React from "react";
import LayoutLoginPage from "../../Layout/LayoutLoginPage";
import { MdKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TwoStepVeri = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/two-step-verification");
  };
  return (
    <div>
      <LayoutLoginPage
        title="Nhập mật khẩu xác nhận để tiếp tục"
        subtitle="Để thực hiện tính năng này, bạn cần xác nhận lại mật khẩu, điền mật khẩu của bạn vào ô bên dưới và nhấp Xác nhận"
        className="w-[52%] m-[auto]"
        bg="bg-unset !important"
      >
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center w-full mt-4 border border-gray-500 h-[35px] rounded-md relative">
            <div className="py-1 px-2 ">
              <MdKey className="w-4 h-4 text-gray-500" />
            </div>
            <div className="w-full h-full border-l border-gray-500">
              <input
                type="text"
                className="w-full outline-none border-none h-full px-2 py-0 rounded-r-md"
                required
              />
            </div>
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[5%] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="text-center">
            <button
              className="bg-[#428bca] p-2 rounded-lg text-white text-[13px] mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Chấp nhận
            </button>
          </div>
        </form>
      </LayoutLoginPage>
    </div>
  );
};

export default TwoStepVeri;

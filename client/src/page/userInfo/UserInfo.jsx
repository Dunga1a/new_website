import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillCaretRightFill } from "react-icons/bs";
const defaltImg =
  "https://doanhnhanthanhhoahanoi.com/themes/default/images/users/no_avatar.png?fbclid=IwAR338fL6RIzbS6D7bPRRwrwdTnvJbePi4du2t5x47ei63BYmnz4CM_-VRfo";

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const logOut = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };
  return (
    <div className="mt-4">
      <div className="border-[1px] border-gray-200 rounded-md p-4">
        <h3 className="font-bold text-[18px]">Thông tin thành viên</h3>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser ? currentUser.photoURL : defaltImg}
              alt=""
              className="h-[90px] w-[90px]"
            />
            <p className="absolute bottom-0 text-center left-0 right-0 py-[1px] text-[12px] text-white bg-[#357edb]">
              Hình đại diện
            </p>
          </div>
          <ul className="text-[14px]">
            <li className="flex items-center gap-1">
              <AiOutlineRight />
              <p>
                Tài khoản:{" "}
                <span className="font-bold">{currentUser?.displayName}</span> (
                {currentUser.email})
              </p>
            </li>
            <li className="flex items-center gap-1">
              <AiOutlineRight />
              <p>Đăng nhập theo kiểu thông thường</p>
            </li>
            <li className="flex items-center gap-1">
              <AiOutlineRight />
              <p>Đăng nhập vào: Thứ tư, 26/04/2023 17:20</p>
            </li>
            <li className="flex items-center gap-1">
              <AiOutlineRight />
              <p>Bằng IP: 14.177.234.33</p>
            </li>
          </ul>
        </div>
      </div>

      <table className="border-collapse border border-slate-500 w-full mt-6">
        <tbody>
          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Họ tên
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              {currentUser.displayName}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Ngày tháng năm sinh
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              {" "}
              04/04/1989
            </td>
          </tr>
          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Giới tính
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">Nam</td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Hiển thị email
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]"> Có</td>
          </tr>
          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Ngày tham gia
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              25/04/2023
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Khả năng đăng nhập thông thường
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]"> Có</td>
          </tr>
          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Xác thực hai bước
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              Tắt (Thiết lập)
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Lần truy cập trước
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              Thứ tư, 26/04/2023 16:45
            </td>
          </tr>
        </tbody>
      </table>

      <ul className="flex justify-start gap-3  text-[13px] mt-8">
        <li className="flex items-center cursor-pointer">
          <BsFillCaretRightFill />
          <span>Thông tin thành viên</span>
        </li>
        <li className="flex items-center cursor-pointer" onClick={logOut}>
          <BsFillCaretRightFill />
          <span>Thoát</span>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;

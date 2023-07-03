import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillCaretRightFill } from "react-icons/bs";
import dayjs from "dayjs";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const defaltImg =
  "https://doanhnhanthanhhoahanoi.com/themes/default/images/users/no_avatar.png?fbclid=IwAR338fL6RIzbS6D7bPRRwrwdTnvJbePi4du2t5x47ei63BYmnz4CM_-VRfo";

const UserInfo = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  //console.log(currentUser);
  const logOut = () => {
    //confirm("Bạn chắc chắn muốn đăng xuất?");
    localStorage.setItem("user", null);
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/api/users/${currentUser.username}`
      );
      // console.log(response);
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-4">
      <div className="border-[1px] border-gray-200 rounded-md p-4">
        <h3 className="font-bold text-[18px]">Thông tin thành viên</h3>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative">
            <img
              src={
                (currentUser && currentUser.photoURL) ||
                (data && data.image !== null
                  ? `/uploads/${data.image}`
                  : "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg")
              }
              alt=""
              className="h-[90px] w-[90px] border"
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
                <span className="font-bold">
                  {currentUser?.displayName || (data && data.username)}
                </span>{" "}
                (
                {(currentUser && currentUser.email) ||
                  (data && data.email) ||
                  ""}
                )
              </p>
            </li>
            <li className="flex items-center gap-1">
              <AiOutlineRight />
              <p>Đăng nhập theo kiểu thông thường</p>
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
              {(currentUser && currentUser.displayName) ||
                (data && data.lastname !== null
                  ? data.firstname + " " + data.lastname
                  : "")}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Ngày tháng năm sinh
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              {" "}
              {currentUser && currentUser.birthday
                ? dayjs(currentUser.birthday).format("DD/MM/YYYY") ||
                  (data && data.birthday
                    ? dayjs(data.birthday).format("DD/MM/YYYY")
                    : "")
                : ""}
            </td>
          </tr>
          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Giới tính
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              {currentUser.gender === 1
                ? "Nam"
                : currentUser.gender === 2
                ? "Nữ"
                : currentUser.gender === 0
                ? "N/A"
                : "" || (data && data.gender === 1)
                ? "Nam"
                : data && data.gender === 2
                ? "Nữ"
                : data && data.gender === 0
                ? "N/A"
                : ""}
            </td>
          </tr>

          <tr className="bg-[#f9f9f9]">
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%] ">
              Ngày tham gia
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]">
              {dayjs(currentUser.created_at).format("DD/MM/YYYY") ||
                (data && dayjs(data.created_at).format("DD/MM/YYYY"))}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 text-[15px] p-[6px] w-[45%]">
              Khả năng đăng nhập thông thường
            </td>
            <td className="border border-slate-400 text-[15px] p-[6px]"> Có</td>
          </tr>
        </tbody>
      </table>

      <ul className="flex justify-start gap-3  text-[13px] mt-8">
        <li
          onClick={() => navigate("/user/editinfo/basic")}
          className="flex items-center cursor-pointer"
        >
          <BsFillCaretRightFill />
          <span>Chỉnh sửa thông tin</span>
        </li>
        <li
          className="flex items-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BsFillCaretRightFill />
          <span>Thoát</span>
        </li>
      </ul>
      <Modal open={open} setOpen={setOpen} title={"Bạn muốn đăng xuất ?"}>
        <div className=" flex justify-center">
          <Button
            title={"Có"}
            colorBgr={"text-white bg-red-700 hover:bg-red-800 px-8"}
            onClick={logOut}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserInfo;

import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import dayjs from "dayjs";

const ConfirmMemberForm = ({ memberItem, setOpen, fetchData }) => {
  // const { url } = useContext(AuthContext);
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = async (data) => {
    try {
      const currentTime = dayjs();
      const values = {
        ...data,
        member: memberItem.id,
        username: memberItem.name_company,

        image: memberItem.image_company,

        created_at: currentTime.format("HH:mm:ss DD/MM/YYYY"),
      };
      const valuesTwo = {
        to: memberItem.email,
        subject: "Thư cấp mật khẩu cho tài khoản doanh nghiệp",
        text: `<p>Mật khẩu của bạn là: <strong>${data.password}</strong></p> <p><b>Cảm ơn bạn đã tham gia trở thành hội viên của Hội Doanh Nhân Thanh Hóa Tại Hà Nội</b></p>`,
      };

      const resultOne = await axios.post(
        `${DOMAIN}/api/member/createUserFromMember`,
        values,
        {
          withCredentials: true,
        }
      );

      if (resultOne) {
        await toast.promise(
          axios.post(`${DOMAIN}/api/member/sendEmail`, valuesTwo, {
            withCredentials: true,
          }),
          {
            pending: "Đang gửi mật khẩu về email cấp tài khoản",
            success: "Cấp tài khoản thành công 👌",
            error: "Cấp tài khoản thất bại 🤯",
          }
        );
      }

      // console.log(result, resultTwo);
      fetchData();
      setOpen(false);
    } catch (error) {
      toast.error("Cấp tài khoản hội viên thất bại");

      console.log(error.message);
    }
  };

  return (
    <div className="bg-white py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("email", {
                required: true,
              })}
              defaultValue={memberItem.email}
              //   disabled={true}
              readOnly
            />
          </div>
          <div className="my-4 relative">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("password", {
                required: true,
              })}
              placeholder="Nhập mật khẩu"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="px-10 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500"
        >
          Cấp tài khoản
        </button>
      </form>
    </div>
  );
};

export default ConfirmMemberForm;

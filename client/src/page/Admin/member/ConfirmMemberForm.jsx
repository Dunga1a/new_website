import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const ConfirmMemberForm = ({ memberItem, setOpen, fetchData }) => {
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
        created_at: currentTime.format("HH:mm:ss DD/MM/YYYY"),
      };
      const valuesTwo = {
        to: memberItem.email,
        subject: "Thư cấp mật khẩu cho tài khoản doanh nghiệp",
        text: "Mật khẩu của bạn là: 12345678",
      };

      const result = await axios.post(
        "http://localhost:3001/api/member/createUserFromMember",
        values,
        {
          withCredentials: true,
        }
      );
      const resultTwo = await toast.promise(
        axios.post("http://localhost:3001/api/member/sendEmail", valuesTwo, {
          withCredentials: true,
        }),
        {
          pending: "Đang gửi mật khẩu về email cấp tài khoản",
          success: "Cấp tài khoản thành công 👌",
          error: "Cấp tài khoản thất bại 🤯",
        }
      );

      console.log(result, resultTwo);
      fetchData();
      setOpen(false);
    } catch (error) {
      toast.success("Cấp tài khoản hội viên thất bại");

      console.log(error.message);
    }
  };

  return (
    <div className="bg-white py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
          <h3 className="font-semibold text-base">
            Cấp tài khoản cho hội viên
          </h3>
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
            />
          </div>
          <div className="my-4">
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

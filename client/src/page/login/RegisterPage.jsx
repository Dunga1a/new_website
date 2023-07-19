import React, { useContext, useState } from "react";
import LayoutLoginPage from "../../Layout/LayoutLoginPage";
import { useForm } from "react-hook-form";
import { BsFillCaretRightFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { GrPowerReset } from "react-icons/gr";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import generateCaptcha from "../../uitls";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const RegisterPage = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [checked, setChecked] = useState(false);
  const [seePass, setSeePass] = useState(false);
  const [seePassConfirm, setSeePassConfirm] = useState(false);
  const onSubmit = async (data) => {
    if (!data) {
      alert("Đăng ký không thành công!");
    } else {
      try {
        if (!checked) {
          return toast.error("Vui lòng đồng ý với điều khoản hội.");
        }
        const { confirmPassword, checkCaptcha, ...values } = data;

        const value = { ...values, status: 1 };
        await axios.post(`${DOMAIN}/api/users/registerUser`, value, {
          withCredentials: true,
        });
        toast.success("Đăng ký tài khoản thành công.");
        reset();
        navigate("/user/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  const [open, setOpen] = useState(false);

  const resetCaptcha = (data) => {
    setCaptcha(generateCaptcha);
    reset(data.checkCaptcha);
  };

  const resetFields = () => {
    reset();
  };

  return (
    <div>
      {currentUser ? (
        <div className="">
          <div className="bg-[#f2dede] p-5 border-[1px] border-[#ebccd1] rounded-md text-[16px]">
            Bạn cần đăng xuất để đăng ký thành viên.
          </div>
        </div>
      ) : (
        <LayoutLoginPage
          title="Đăng ký thành viên"
          subtitle="Để đăng ký thành viên, bạn cần khai báo tất cả các ô trống dưới đây"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                {...register("firstname", {
                  required: "Trường này không được để trống",
                })}
                placeholder="Họ và tên đệm"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.firstname && (
              <span className="text-sm text-red-500">
                {errors.firstname.message}
              </span>
            )}

            {/* include validation with required or other standard HTML validation rules */}
            <div className="relative">
              <input
                {...register("lastname", {
                  required: "Trường này không được để trống",
                })}
                placeholder="Tên"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              {/* errors will return when field validation fails  */}
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.lastname && (
              <span className="text-sm text-red-500">
                {errors.lastname.message}
              </span>
            )}

            <div className="relative">
              <input
                {...register("username", {
                  required: "Trường này không được để trống",
                })}
                placeholder="Tên đăng nhập"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              {/* errors will return when field validation fails  */}
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>

            {errors.username && (
              <span className="text-sm text-red-500">
                {errors.username.message}
              </span>
            )}
            <div className="relative">
              <input
                {...register("email", {
                  required: "Trường này không được để trống",

                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Vui lòng nhập đúng email VD: 'ten123@gmail.com'",
                  },
                })}
                placeholder="Email"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              {/* errors will return when field validation fails  */}
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}

            <div className="relative">
              <input
                type={seePass ? "text" : "password"}
                {...register("password", {
                  required: "Trường này không được để trống",
                  minLength: {
                    value: 6,
                    message: "Vui lòng nhập mật khẩu lớn hơn 6 ký tự",
                  },
                  maxLength: 99,
                })}
                placeholder="Mật khẩu"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              <span
                className="absolute top-[50%] right-[30px] translate-y-[-30%]"
                onClick={() => setSeePass(!seePass)}
              >
                {seePass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              {/* errors will return when field validation fails  */}
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}

            <div className="relative">
              <input
                type={seePassConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Trường này không được để trống",
                  minLength: {
                    value: 6,
                    message: "Vui lòng nhập mật khẩu lớn hơn 6 ký tự",
                  },
                  maxLength: 99,
                  validate: (value) =>
                    value === password || "Mật khẩu không trùng khớp",
                })}
                placeholder="Xác thực mật khẩu"
                className={`w-full outline-none h-full px-3 py-2 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              <span
                className="absolute top-[50%] right-[30px] translate-y-[-30%]"
                onClick={() => setSeePassConfirm(!seePassConfirm)}
              >
                {seePassConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>

              {/* errors will return when field validation fails  */}
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}

            <div className="flex items-center gap-4 bg-white shadow-lg py-3 px-2 mt-2 relative">
              <h3 className="text-sm">Giới tính</h3>
              <label htmlFor="" className="flex items-center gap-1">
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  value="0"
                />
                <span className="text-sm">N/A</span>
              </label>
              <label htmlFor="" className="flex items-center gap-1">
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  value="1"
                />
                <span className="text-sm">Nam</span>
              </label>
              <label htmlFor="" className="flex items-center gap-1">
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  value="2"
                />
                <span className="text-sm">Nữ</span>
              </label>
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>

            {errors.gender && (
              <span className="text-sm text-red-500">
                Vui lòng chọn giới tính
              </span>
            )}
            <div className="relative">
              <input
                type="date"
                {...register("birthday", {
                  required: "Vui lòng chọn ngày sinh",
                })}
                className={`w-full outline-none h-full px-3 pt-3 bg-gray-200 pb-0 mt-2 my-[8px] text-[13px] border-[1px] border-[#ccc] rounded-sm shadow-lg`}
              />
              <span className=" text-red-600 text-[18px] absolute top-[50%] right-[30px] translate-y-[-30%]">
                *
              </span>
            </div>
            {errors.birthday && (
              <span className="text-sm text-red-500">
                {errors.birthday.message}
              </span>
            )}

            <div className="mt-1 bg-white shadow-lg border-[1px] border-[#ccc] rounded-sm p-2 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onClick={() => setChecked(!checked)}
              />
              <span className="text-[13px]">Tôi đồng ý với</span>
              <input
                type="text"
                value="Quy định đăng ký thành viên"
                className="p-0 text-[12px] w-[23%] cursor-pointer bg-[#ccc] text-black font-bold border-[1px] border-[#333] rounded-lg border-none outline-none"
                onClick={() => setOpen(true)}
                readOnly
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="wrapper">
                  <h2 className="title">{captcha}</h2>
                </div>
                <button type="button" className="ml-3" onClick={resetCaptcha}>
                  <GrPowerReset />
                </button>
              </div>
              <div className="inline relative">
                <input
                  type="text"
                  className=" rounded-xl text-sm"
                  {...register("checkCaptcha", {
                    required: "Bạn chưa nhập mã",
                  })}
                  placeholder="Mã bảo mật"
                />
                <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                  *
                </span>
              </div>
            </div>
            {errors.checkCaptcha && (
              <span className="text-sm text-red-500">
                {errors.checkCaptcha.message}
              </span>
            )}

            <div className="text-center text-[13px] mt-3">
              <button
                className="bg-gray-100 p-2 mr-4 rounded-lg"
                type="button"
                onClick={resetFields}
              >
                Thiết lập lại
              </button>
              <button
                className="bg-[#428bca] p-2 rounded-lg text-white"
                type="submit"
              >
                Đăng ký thành viên
              </button>
            </div>

            {/* <div className="text-center cursor-pointer text-[14px] mt-4">
            Đã đăng ký nhưng không nhận được link kích hoạt?
          </div> */}

            <ul className="flex justify-start gap-3 mt-3 text-[13px]">
              <li
                className="flex items-center cursor-pointer hover:font-semibold"
                onClick={() => navigate("/user/login")}
              >
                <BsFillCaretRightFill />
                <span>Đăng nhập</span>
              </li>
              <li
                className="flex items-center cursor-pointer hover:font-semibold"
                onClick={() => navigate("/user/lostpass")}
              >
                <BsFillCaretRightFill />
                <span>Khôi phục mật khẩu</span>
              </li>
            </ul>

            <Modal
              title={"Quy định đăng ký thành viên"}
              open={open}
              setOpen={setOpen}
            >
              <p className="text-justify text-[14px]">
                Để trở thành thành viên, bạn phải cam kết đồng ý với các điều
                khoản dưới đây. Chúng tôi có thể thay đổi lại những điều khoản
                này vào bất cứ lúc nào và chúng tôi sẽ cố gắng thông báo đến bạn
                kịp thời.
                <br />
                <br />
                Bạn cam kết không gửi bất cứ bài viết có nội dung lừa đảo, thô
                tục, thiếu văn hoá; vu khống, khiêu khích, đe doạ người khác;
                liên quan đến các vấn đề tình dục hay bất cứ nội dung nào vi
                phạm luật pháp của quốc gia mà bạn đang sống, luật pháp của quốc
                gia nơi đặt máy chủ của website này hay luật pháp quốc tế. Nếu
                vẫn cố tình vi phạm, ngay lập tức bạn sẽ bị cấm tham gia vào
                website. Địa chỉ IP của tất cả các bài viết đều được ghi nhận
                lại để bảo vệ các điều khoản cam kết này trong trường hợp bạn
                không tuân thủ.
                <br />
                <br />
                Bạn đồng ý rằng website có quyền gỡ bỏ, sửa, di chuyển hoặc khoá
                bất kỳ bài viết nào trong website vào bất cứ lúc nào tuỳ theo
                nhu cầu công việc.
                <br />
                <br />
                Đăng ký làm thành viên của chúng tôi, bạn cũng phải đồng ý rằng,
                bất kỳ thông tin cá nhân nào mà bạn cung cấp đều được lưu trữ
                trong cơ sở dữ liệu của hệ thống. Mặc dù những thông tin này sẽ
                không được cung cấp cho bất kỳ người thứ ba nào khác mà không
                được sự đồng ý của bạn, chúng tôi không chịu trách nhiệm về việc
                những thông tin cá nhân này của bạn bị lộ ra bên ngoài từ những
                kẻ phá hoại có ý đồ xấu tấn công vào cơ sở dữ liệu của hệ thống.
              </p>
            </Modal>
          </form>
        </LayoutLoginPage>
      )}
    </div>
  );
};

export default RegisterPage;

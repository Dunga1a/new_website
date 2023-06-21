import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuillEditor from "../../components/ReactQuill";
const RegisterMember = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [content, setContent] = useState();
  const [selectedImages, setSelectedImages] = useState({
    firstImage: null,
    secondImage: null,
  });
  //const content = watch("content", "");
  const handleImageChange = (e, inputName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prevState) => ({
          ...prevState,
          [inputName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    // console.log(data.checkCaptcha);
    // console.log(captcha);
    // if (data.checkCaptcha !== captcha) {
    //   return console.log("ngu");
    // }
    // return console.log("khôn");
    //reset();
    console.log(data);
  };

  const handleEditorChange = (value) => {
    setContent(value); // Cập nhật giá trị của ReactQuillEditor
    setValue("content", value); // Đặt giá trị mới cho trường "content" trong useForm
  };

  return (
    <div className="bg-white py-6">
      <form
        className="grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
          <h3 className="font-semibold text-base">Thông tin doanh nghiệp</h3>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("company-name", {
                required: true,
              })}
              placeholder="Nhập tên doanh nghiệp, tổ chức"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("representative-name", {
                required: true,
              })}
              placeholder="Người đại diện"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("position", {
                required: true,
              })}
              placeholder="Chức vụ"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("phone-number", {
                required: true,
              })}
              placeholder="Số điện thoại"
            />
          </div>
          <div className="my-4">
            <input
              type="email"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("email", {
                required: true,
              })}
              placeholder="Nhập email"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("company-code", {
                required: true,
              })}
              placeholder="Mã số doanh nghiệp"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("company-address", {
                required: true,
              })}
              placeholder="Địa chỉ doanh nghiệp"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("website", {
                required: true,
              })}
              placeholder="Website"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("field", {
                required: true,
              })}
              placeholder="Lĩnh vực hoạt động"
            />
          </div>
        </div>

        <div className="p-10">
          <div>
            <h3 className="font-semibold text-base">Ảnh người đại diện:</h3>
            <div className="flex items-center">
              <input
                type="file"
                name=""
                placeholder="Chưa...chọn"
                id=""
                {...register("img_1")}
                onChange={(e) => handleImageChange(e, "firstImage")}
              />
              <div className="border border-dashed">
                <img
                  className="max-h-[100px] max-w-full object-cover m-auto"
                  src={
                    selectedImages.firstImage
                      ? selectedImages.firstImage
                      : "https://doanhnhanthanhhoahanoi.com/uploads/logo-107x107.png"
                  }
                  alt="Selected"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">
              Ảnh doanh nghiệp (Logo):
            </h3>
            <div className="flex items-center">
              <input
                type="file"
                name=""
                placeholder="Chưa...chọn"
                id=""
                {...register("img_2")}
                onChange={(e) => handleImageChange(e, "secondImage")}
              />
              <div className="border border-dashed">
                <img
                  className="max-h-[100px] max-w-full object-cover m-auto"
                  src={
                    selectedImages.secondImage
                      ? selectedImages.secondImage
                      : "https://doanhnhanthanhhoahanoi.com/uploads/logo-107x107.png"
                  }
                  alt="Selected"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 px-10">
          <ReactQuillEditor
            {...register("content", {})}
            setContent={handleEditorChange}
            content={content}
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-10 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterMember;

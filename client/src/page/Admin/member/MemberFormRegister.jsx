import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Select from "react-select";
import slugify from "slugify";
import ReactQuillEditor from "../../../components/ReactQuill";
import axios from "axios";

const optionsStatus = [
  { label: "Đã kích hoạt", value: 1 },
  { label: "Đã khóa", value: 2 },
];
const MemberFormRegister = ({
  memberItem,
  businessAreas,
  roleAssociations,
  onSave,
}) => {
  const DOMAIN = process.env.REACT_APP_DOMAIN;

  const [selectedImages, setSelectedImages] = useState({
    firstImg: memberItem.image_person
      ? `/uploads/${memberItem.image_person}`
      : null,
    secondImg: memberItem.image_company
      ? `/uploads/${memberItem.image_company}`
      : null,
  });

  const [imageUrl, setImageUrl] = useState({
    firstImg: memberItem.image_person ? `${memberItem.image_person}` : null,
    secondImg: memberItem.image_company ? `${memberItem.image_company}` : null,
  });

  const [isChangImage, setIsChangeImage] = useState({
    firstImg: false,
    secondImg: false,
  });

  const [intro, setIntro] = useState(memberItem.intro);
  const [idBusinessAreas, setIdBusinessAreas] = useState(
    memberItem.id_business_areas.id_business_areas
  );
  const [idRoleAssociations, setIdRoleAssociations] = useState(
    memberItem.id_role_associations.id_organize_membership
  );
  const [isPublic, setIsPublic] = useState(memberItem.status);
  const [editEmail, setEditEmail] = useState(false);
  const [usernameEdit, setUsernameEdit] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ criteriaMode: "all" });

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
      setImageUrl((prev) => ({
        ...prev,
        [inputName]: e.target.files[0],
      }));
      setIsChangeImage((prev) => ({
        ...prev,
        [inputName]: true,
      }));
    }
  };

  const onSubmit = async (data) => {
    try {
      const slug = slugify(data.name_company, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      let image_person = imageUrl.firstImg;
      let image_company = imageUrl.secondImg;
      if (isChangImage.firstImg) {
        const formData = new FormData();
        formData.append("image", imageUrl.firstImg);
        const responseImgPerson = await axios.post(
          `${DOMAIN}/api/member/uploadFileImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        image_person = responseImgPerson.data.imageUrl;
      }
      if (isChangImage.secondImg) {
        const formDataTwo = new FormData();
        formDataTwo.append("image", imageUrl.secondImg);
        const responseImgCompany = await axios.post(
          `${DOMAIN}/api/member/uploadFileImage`,
          formDataTwo,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        image_company = responseImgCompany.data.imageUrl;
      }
      const values = {
        ...data,
        id: memberItem.id,
        id_business_areas: idBusinessAreas,
        id_role_associations: idRoleAssociations,
        slug: slug,
        intro,
        status: isPublic,
        image_person: image_person,
        image_company: image_company,
        editEmail: editEmail,
        usernameEdit: usernameEdit,
      };
      // console.log("editEmail: ", editEmail);
      onSave(values);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangeContent = (value) => {
    setIntro(value);
  };

  return (
    <div className="bg-white py-6">
      <form
        className="grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
          <h3 className="font-semibold text-base">Thông tin doanh nghiệp</h3>
          <div className="my-4 relative">
            <label
              className="text-start block text-sm font-medium leading-6 text-gray-900"
              htmlFor="name_company"
            >
              Tên doanh nghiệp, tổ chức
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("name_company", {
                required: true,
              })}
              defaultValue={memberItem.name_company}
              onChange={() => setUsernameEdit(true)}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="representative"
            >
              Người đại diện
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("representative", {
                required: true,
              })}
              defaultValue={memberItem.representative}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="role_name"
            >
              Chức vụ
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("role_name", {
                required: true,
              })}
              defaultValue={memberItem.role_name}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("phone", {
                required: true,
              })}
              defaultValue={memberItem.phone}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("email", {
                required: true,
              })}
              defaultValue={memberItem.email}
              onChange={() => setEditEmail(true)}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="code_company"
            >
              Mã số doanh nghiệp
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("code_company", {
                required: true,
              })}
              defaultValue={memberItem.code_company}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="address"
            >
              Địa chỉ doanh nghiệp
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("address", {
                required: true,
              })}
              defaultValue={memberItem.address}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start text-sm font-medium leading-6 text-gray-900"
              htmlFor="representative"
            >
              Website
            </label>
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("website", {})}
              defaultValue={memberItem.website ? memberItem.website : ""}
            />
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
              htmlFor="representative"
            >
              Lĩnh Vực Kinh Doanh
            </label>
            <Select
              options={businessAreas}
              className="col-span-2"
              placeholder={memberItem.id_business_areas.name}
              onChange={(e) => setIdBusinessAreas(e.value)}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <label
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
              htmlFor="representative"
            >
              Chức Vụ Trong Hội
            </label>
            <Select
              options={roleAssociations}
              className="col-span-2"
              placeholder={memberItem.id_role_associations.name}
              onChange={(e) => setIdRoleAssociations(e.value)}
            />
            <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>

          <div className="my-4 relative">
            <label
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
              htmlFor="representative"
            >
              Trạng Thái Tài Khoản
            </label>
            <Select
              options={optionsStatus}
              className="col-span-2"
              placeholder={memberItem.status === 1 ? "Đã Kích Hoạt" : "Đã Khóa"}
              onChange={(e) => setIsPublic(e.value)}
            />
          </div>
        </div>

        <div className="p-10">
          <div>
            <h3 className="font-semibold text-base">Ảnh người đại diện:</h3>
            <div className="flex items-center">
              <input
                type="file"
                placeholder="Chưa...chọn"
                // onChange={(e) => handleFileChange(e, "firstImg")}
                onChange={(e) => handleImageChange(e, "firstImg")}
              />
              {selectedImages && (
                <div className="border border-dashed">
                  <img
                    className="max-h-[100px] max-w-full object-cover m-auto"
                    src={
                      selectedImages.firstImg
                        ? `${selectedImages.firstImg}`
                        : "/assets/images/logo-107x107.png"
                    }
                    alt="Selected Img One"
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">
              Ảnh doanh nghiệp (Logo):
            </h3>
            <div className="flex items-center">
              <input
                type="file"
                placeholder="Chưa...chọn"
                // onChange={(e) => handleFileChange(e, "secondImg")}
                onChange={(e) => handleImageChange(e, "secondImg")}
              />
              {selectedImages && (
                <div className="border border-dashed">
                  <img
                    className="max-h-[100px] max-w-full object-cover m-auto"
                    src={
                      selectedImages.secondImg
                        ? `${selectedImages.secondImg}`
                        : "/assets/images/logo-107x107.png"
                    }
                    alt="Selected Img One"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2 px-10">
          <ReactQuillEditor content={intro} setContent={handleChangeContent} />
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-10 py-3 bg-blue-600 text-white font-medium text-base uppercase rounded hover:bg-blue-500"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberFormRegister;

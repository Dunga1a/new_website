import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuillEditor from "../../components/ReactQuill";
import axios from "axios";
import Select from "react-select";
import slugify from "slugify";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumb";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const RegisterMember = () => {
  const { url } = useContext(AuthContext);
  // console.log(url);
  const [selectedImages, setSelectedImages] = useState({
    firstImg: null,
    secondImg: null,
  });
  const [imageUrl, setImageUrl] = useState({
    firstImg: null,
    secondImg: null,
  });
  const [intro, setIntro] = useState("");
  const [businessAreas, setBusinessAreas] = useState([]);
  const [idBusinessAreas, setIdBusinessAreas] = useState();
  const [idRoleAssociations, setIdRoleAssociations] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchParams.get("searchKey") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

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
      setImageUrl((prev) => ({
        ...prev,
        [inputName]: e.target.files[0],
      }));
    }
  };

  async function uploadImage(formData) {
    try {
      const response = await axios.post(
        `${DOMAIN}/api/member/uploadFileImageMember`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Image upload failed");
    }
  }

  const onSubmit = async (data) => {
    try {
      if (!imageUrl.firstImg) {
        return toast.error("Vui lòng chọn ảnh người đại diện");
      }
      if (!imageUrl.secondImg) {
        return toast.error("Vui lòng chọn ảnh doanh nghiệp");
      }
      // console.log("imageUrl.firstImg: ", imageUrl.firstImg);
      // console.log("imageUrl.secondImg: ", imageUrl.secondImg);
      const valueCheck = {
        email: data.email,
        name_company: data.name_company,
        code_company: data.code_company,
      };
      await axios.post(`${DOMAIN}/api/member/checkError`, valueCheck, {
        withCredentials: true,
      });
      if (!idBusinessAreas) {
        //console.log(idBusinessAreas);
        return toast.error("Vui Lòng Chọn Lĩnh Vực Kinh Doanh");
      }
      // const formData = new FormData();
      // const formDataTwo = new FormData();
      const slug = slugify(data.name_company, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      let image_person = null;
      let image_company = null;

      if (imageUrl.firstImg && imageUrl.secondImg) {
        const imagePromises = [];

        // Tạo và gắn dữ liệu vào formData
        const formData1 = new FormData();
        formData1.append("image", imageUrl.firstImg);
        imagePromises.push(uploadImage(formData1));

        const formData2 = new FormData();
        formData2.append("image", imageUrl.secondImg);
        imagePromises.push(uploadImage(formData2));

        try {
          // Gửi các yêu cầu tải lên cùng một lúc
          const [responseImgPerson, responseImgCompany] = await Promise.all(
            imagePromises
          );

          image_person = responseImgPerson;
          image_company = responseImgCompany;
          const values = {
            ...data,
            id_business_areas: idBusinessAreas,
            id_role_associations: idRoleAssociations,
            slug: slug,
            intro,

            image_person: image_person,
            image_company: image_company,
          };

          await axios
            .post(`${DOMAIN}/api/member/createMember`, values, {
              withCredentials: true,
            })
            .then(() => {
              toast.success(
                "Đăng ký hội viên thành công, vui lòng chờ xét duyệt"
              );

              reset();
              setSelectedImages({
                firstImg: null,
                secondImg: null,
              });
              setImageUrl({
                firstImg: null,
                secondImg: null,
              });
              setIntro("");
              // setIdBusinessAreas(null);
            })
            .catch(() => {
              toast.error("Lỗi ảnh");
            });
        } catch (error) {
          // Xử lý lỗi tải lên
          console.error("Image upload error:", error);
          // Thực hiện các hành động cần thiết khi xảy ra lỗi
        }

        // formData.append("image", imageUrl.firstImg);
        // const responseImgPerson = await axios.post(
        //   `${DOMAIN}/api/member/uploadFileImageMember`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );
        // image_person = responseImgPerson.data.imageUrl;
        // formDataTwo.append("image", imageUrl.secondImg);
        // const responseImgCompany = await axios.post(
        //   `${DOMAIN}/api/member/uploadFileImageMember`,
        //   formDataTwo,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );
        // image_company = responseImgCompany.data.imageUrl;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const search = searchKey ? searchKey : "";

      const result = await axios.get(
        `${DOMAIN}/api/business-areas/getListBusinessArea`
      );
      const resultTwo = await axios.get(
        `${DOMAIN}/api/organize-membership-title?searchKey=${search}`
      );
      const dataTwo = resultTwo.data.find((item) => item.name === "Hội Viên");
      if (!dataTwo) {
        return toast.error(
          "Chưa tồn tại chức vụ Hội Viên trong hội, vui lòng chờ ADMIN"
        );
      }
      setIdRoleAssociations(dataTwo.id_organize_membership);
      // console.log("dataTwo: ", dataTwo.id_organize_membership);
      const data = result.data
        .filter((item) => item.status === 1) // Lọc chỉ các mục có status = 1
        .map((item) => ({
          label: item.name,
          value: item.id_business_areas,
        }));
      // console.log("data: ", data);
      setBusinessAreas(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeContent = (value) => {
    setIntro(value);
  };

  const selectedOption = businessAreas.find(
    (option) => option.value === Number(idBusinessAreas)
  );

  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Đăng Ký Hội Viên"} />

      <div className=" py-6">
        <form
          className="grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
            <h3 className="font-semibold text-base">Thông tin doanh nghiệp</h3>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="name_company"
              >
                Nhập tên doanh nghiệp, tổ chức
              </label>

              <input
                required
                type="text"
                id="name_company"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("name_company", {
                  required: true,
                })}
              />

              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="representative"
              >
                Người đại diện
              </label>
              <input
                required
                type="text"
                id="representative"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("representative", {
                  required: true,
                })}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="role_name"
              >
                Chức vụ
              </label>
              <input
                required
                type="text"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("role_name", {
                  required: true,
                })}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <input
                required
                type="text"
                id="phone"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("phone", {
                  required: true,
                })}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Nhập email
              </label>
              <input
                type="email"
                id="email"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("email", {
                  required: true,
                })}
                required
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Lĩnh Vực Hoạt Động
              </label>
              <Select
                options={businessAreas}
                className="col-span-2"
                placeholder={
                  selectedOption
                    ? `------ ${selectedOption.label} ------`
                    : "------ Chọn Lĩnh Vực Hoạt Động ------"
                }
                onChange={(e) => setIdBusinessAreas(e.value)}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="code_company"
              >
                Mã số doanh nghiệp
              </label>
              <input
                required
                type="text"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("code_company", {
                  required: true,
                })}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4 relative">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="address"
              >
                Địa chỉ doanh nghiệp
              </label>
              <input
                required
                type="text"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("address", {
                  required: true,
                })}
              />
              <span className=" text-red-600 text-[18px] absolute top-[65%] right-[10px] translate-y-[-30%]">
                *
              </span>
            </div>
            <div className="my-4">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="representative"
              >
                Website
              </label>
              <input
                type="text"
                className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
                {...register("website")}
              />
            </div>
          </div>

          <div className="p-10">
            <div className="relative">
              <h3 className="font-semibold text-base ">Ảnh người đại diện:</h3>
              <span className=" text-red-600 text-[18px] absolute top-[10px] left-[154px] translate-y-[-30%]">
                *
              </span>
              <div className="flex items-center ">
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg, .svg"
                  placeholder="Chưa...chọn"
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
            <div className="relative">
              <h3 className="font-semibold text-base">
                Ảnh doanh nghiệp (Logo):
              </h3>
              <span className=" text-red-600 text-[18px] absolute top-[10px] left-[194px] translate-y-[-30%]">
                *
              </span>
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg, .svg"
                  placeholder="Chưa...chọn"
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
            <ReactQuillEditor
              content={intro}
              setContent={handleChangeContent}
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
    </div>
  );
};

export default RegisterMember;

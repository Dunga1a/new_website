import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuillEditor from "../../components/ReactQuill";
import axios from "axios";
import Select from "react-select";
import slugify from "slugify";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
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
  const [idRoleAssociations, setIdRoleAssociations] = useState(1);
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

  const onSubmit = async (data) => {
    try {
      const valueCheck = {
        email: data.email,
        name_company: data.name_company,
      };
      await axios.post(`${DOMAIN}/api/member/checkError`, valueCheck, {
        withCredentials: true,
      });
      if (!idBusinessAreas) {
        //console.log(idBusinessAreas);
        return toast.error("Vui Lòng Chọn Lĩnh Vực Kinh Doanh");
      }
      const formData = new FormData();
      const formDataTwo = new FormData();
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

      if (imageUrl.firstImg) {
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
      if (imageUrl.secondImg) {
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

      // console.log(image_person, image_company);

      const values = {
        ...data,
        id_business_areas: idBusinessAreas,
        id_role_associations: idRoleAssociations,
        slug: slug,
        intro,

        image_person: image_person,
        image_company: image_company,
      };
      //console.log(values);
      const result = await axios.post(
        `${DOMAIN}/api/member/createMember`,
        values,
        {
          withCredentials: true,
        }
      );
      reset();
      setSelectedImages({
        firstImg: null,
        secondImg: null,
      });
      setIntro("");
      setIdBusinessAreas(null);
      //console.log(result);
      toast.success("Đăng ký hội viên thành công, vui lòng chờ xét duyệt");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${DOMAIN}/api/business-areas/getListBusinessArea`
      );
      // console.log(result.data);
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
    <div className="bg-white py-6">
      <form
        className="grid desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 phone:grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-10 phone:col-span-2 desktop:col-span-1 laptop:col-span-1 tablet:col-span-1">
          <h3 className="font-semibold text-base">Thông tin doanh nghiệp</h3>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("name_company", {
                required: true,
              })}
              placeholder="Nhập tên doanh nghiệp, tổ chức"
            />

            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("representative", {
                required: true,
              })}
              placeholder="Người đại diện"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("role_name", {
                required: true,
              })}
              placeholder="Chức vụ"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("phone", {
                required: true,
              })}
              placeholder="Số điện thoại"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              type="email"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("email", {
                required: true,
              })}
              required
              placeholder="Nhập email"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
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
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("code_company", {
                required: true,
              })}
              placeholder="Mã số doanh nghiệp"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4 relative">
            <input
              required
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              {...register("address", {
                required: true,
              })}
              placeholder="Địa chỉ doanh nghiệp"
            />
            <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
              *
            </span>
          </div>
          <div className="my-4">
            <input
              type="text"
              className={`block focus:outline-none w-full h-[40px] text-[13px] leading-[15px] rounded border-[#cccccc] 
                           "border-red-500 border-[1px]"
                        `}
              placeholder="Website"
            />
          </div>
        </div>

        <div className="p-10">
          <div>
            <h3 className="font-semibold text-base">Ảnh người đại diện:</h3>
            <div className="flex items-center">
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
          <div>
            <h3 className="font-semibold text-base">
              Ảnh doanh nghiệp (Logo):
            </h3>

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
          <ReactQuillEditor content={intro} setContent={handleChangeContent} />
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

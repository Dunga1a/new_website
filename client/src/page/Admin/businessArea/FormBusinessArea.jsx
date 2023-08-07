import React from "react";
import ReactQuillEditor from "../../../components/ReactQuill";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toggle from "../../../components/Toggle/Toggle";
import slugify from "slugify";

const FormBusinessArea = ({ initValue, onSave, setOpen }) => {
  const [content, setContent] = useState(initValue.intro);
  const [isContentError, setIsContentError] = useState(false);
  const [isPublic, setIsPublic] = useState(initValue.status);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleContentChange = (value) => {
    setContent(value);
    setIsContentError(false);
  };

  const onSubmit = (data) => {
    // const strippedContent = content.replace(/(<([^>]+)>)/gi, "").trim();

    // if (strippedContent === "") {
    //   // Nếu nội dung sau khi loại bỏ các thẻ HTML và khoảng trắng trống,
    //   // hiển thị thông báo lỗi hoặc thực hiện các xử lý khác
    //   alert("Vui lòng nhập nội dung");
    //   return;
    // }
    const slug = slugify(data.name, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });

    onSave({
      ...data,
      intro: content,
      slug,
      status: isPublic,
      id_business_areas: initValue.id_business_areas,
    });
  };

  return (
    <div>
      <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-2 relative">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên gọi lĩnh vực kinh doanh
                  <span className=" text-red-600 text-[18px] absolute ml-[5px] top-[6%]">
                    *
                  </span>
                </label>
                <div className="mt-2 relative">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("name", {
                      required: "Không được bỏ trống trường này",
                      minLength: {
                        value: 5,
                        message: `Vui lòng nhập ít nhất 10 ký tự`,
                      },
                    })}
                    defaultValue={initValue.name}
                  />

                  {errors.title && (
                    <span className="text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <div className="mt-2">
                  <Toggle
                    label="Hoạt động"
                    value={isPublic}
                    onChange={(e) => setIsPublic(e)}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Giới thiệu
                </label>
                <div className="mt-2">
                  <ReactQuillEditor
                    content={content}
                    setContent={handleContentChange}
                  />
                </div>
                {isContentError && errors.content && (
                  <span className="text-sm text-red-500">
                    {errors.content.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="w-[100px] rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Thoát
          </button>
          <button
            type="submit"
            className="w-[100px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBusinessArea;

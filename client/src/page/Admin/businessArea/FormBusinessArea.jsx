import React from "react";
import ReactQuillEditor from "../../../components/ReactQuill";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toggle from "../../../components/Toggle/Toggle";

const FormBusinessArea = ({ initValue, onSave }) => {
  console.log("init value: ", initValue);
  const [content, setContent] = useState(initValue.content);
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
    const strippedContent = content.replace(/(<([^>]+)>)/gi, "").trim();

    if (strippedContent === "") {
      // Nếu nội dung sau khi loại bỏ các thẻ HTML và khoảng trắng trống,
      // hiển thị thông báo lỗi hoặc thực hiện các xử lý khác
      alert("Vui lòng nhập nội dung");
      return;
    }
    // console.log("vao day");
    onSave({
      ...data,
      intro: content,
    });
  };

  return (
    <div>
      <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên gọi lĩnh vực kinh doanh
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="given-name"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("title", {
                      required: "Không được bỏ trống trường này",
                      minLength: {
                        value: 10,
                        message: `Vui lòng nhập ít nhất 10 ký tự`,
                      },
                    })}
                    defaultValue={initValue.title}
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
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBusinessArea;

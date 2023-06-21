import React, { useState } from "react";
import ReactQuillEditor from "../../../components/ReactQuill";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Buttons/Button";

import UploadImage from "./UploadImage";
import { BsFillTrashFill } from "react-icons/bs";

import { supabase } from "../../../libs/supbase";
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "";

const FormEvent = ({ initValue, onSave }) => {
  // console.log(initValue);
  const [content, setContent] = useState(initValue.content);
  const [isContentError, setIsContentError] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [openChildModal, setOpenChildModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState(initValue.image);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setSelectedFiles((prev) => [...prev, fileNames]);
  };

  const onSubmit = (data) => {
    const strippedContent = content.replace(/(<([^>]+)>)/gi, "").trim();

    if (strippedContent === "") {
      // Nếu nội dung sau khi loại bỏ các thẻ HTML và khoảng trắng trống,
      // hiển thị thông báo lỗi hoặc thực hiện các xử lý khác
      alert("Vui lòng nhập nội dung");
      return;
    }
    // console.log({ ...data, content: content });
    onSave({
      ...data,
      content: content,
      image: selectedImages,
      selectedFiles: selectedFiles,
    });
  };

  const handleContentChange = (value) => {
    setContent(value);
    setIsContentError(false);
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = [];

    const uploadPromises = files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(`images/${new Date().getTime()}_${file.name}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        console.log("File uploaded successfully:", data);

        const imageUrl = `https://tsddbwptfwiyathksqae.supabase.co/storage/v1/object/public/${data.path}`;
        imagePreviews.push(imageUrl);
      }
    });

    await Promise.all(uploadPromises);

    setSelectedImages((prevImages) => prevImages.concat(imagePreviews));
    console.log(selectedImages);
  };

  const handleClick = (image) => {
    // const imageUrl = URL.createObjectURL(image);
    // console.log(image);
    const imageUrl = `upload/${image}`;
    const imageElement = `<img src="${image}" alt="Selected Image" />`;
    setContent((prevEditorHtml) => prevEditorHtml + imageElement);
  };

  const handleDeleteFilePdf = (index) => {
    // const file_name = watch("file_name")
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // setValue("file_name", formFileName);
    // setValue("file_name", formFileName, { shouldDirty: true });
  };
  return (
    <div>
      <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* <img src="https://tsddbwptfwiyathksqae.supabase.co/storage/v1/object/public/images/1684918979237_mu-bo-4.jpg" /> */}
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tiêu Đề
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

              <div className="col-span-1">
                <label
                  htmlFor="date_start"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày bắt đầu
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date_start"
                    id="date_start"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("date_start", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.date_start}
                  />
                  {errors.date_start && (
                    <span className="text-sm text-red-500">
                      {errors.date_start.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="date_end"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ngày kết thúc
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date_end"
                    id="date_end"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("date_end", {})}
                    defaultValue={initValue.date_end}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="date-start"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thời gian bắt đầu
                </label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="time-start"
                    id="time-start"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("time_start", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.time_start}
                  />
                  {errors.time_start && (
                    <span className="text-sm text-red-500">
                      {errors.time_start.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="time_end"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thời gian kết thúc
                </label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="time_end"
                    id="time_end"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("time_end", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.time_end}
                  />
                  {errors.time_end && (
                    <span className="text-sm text-red-500">
                      {errors.time_end.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="date-start"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thời gian
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="time"
                    id="time"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("time", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.time}
                  />
                  {errors.time && (
                    <span className="text-sm text-red-500">
                      {errors.time.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Người Chủ Trì
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="leader"
                    id="leader"
                    autoComplete="given-name"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("leader", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.leader}
                  />
                  {errors.leader && (
                    <span className="text-sm text-red-500">
                      {errors.leader.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Địa Điểm
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="given-name"
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("address", {
                      required: "Không được bỏ trống trường này",
                    })}
                    defaultValue={initValue.address}
                  />
                  {errors.address && (
                    <span className="text-sm text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="file_pdf"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  File đính kèm ({selectedFiles.length}) pdf được chọn
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="file_pdf"
                    id="file_pdf"
                    multiple
                    autoComplete="given-name"
                    className="hidden w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleFileChange}
                  />
                  {selectedFiles.length > 0 && (
                    <div className="mt-2">
                      <p>Các tệp đã chọn:</p>
                      <ul>
                        {selectedFiles.map((fileName, index) => (
                          <li key={index} className="flex items-center gap-1">
                            {fileName}{" "}
                            <Button
                              icon={
                                <BsFillTrashFill className="text-red-600" />
                              }
                              onClick={() => handleDeleteFilePdf(index)}
                            />{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {errors.file_pdf && (
                    <span className="text-sm text-red-500">
                      {errors.file_pdf.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload ảnh phục vụ cho Nội dung
                </label>
                <div className="mt-2" onClick={() => setOpenChildModal(true)}>
                  <AiOutlineCloudUpload />
                </div>

                <Modal open={openChildModal} setOpen={setOpenChildModal}>
                  <UploadImage handleImageChange={handleImageChange} />
                </Modal>
                <div className="flex flex-wrap gap-1">
                  {selectedImages?.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Image ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onClick={() => handleClick(imageUrl)}
                    />
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nội dung
                </label>
                <div className="mt-2">
                  <ReactQuillEditor
                    // {...register("content", {
                    //   required: "Vui long khong de trong",
                    // })}
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

export default FormEvent;

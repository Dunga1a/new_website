import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { supabase } from "../../libs/supbase.js";
import ModalV1 from "../../components/Modal/ModalV1.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import ImageCrop from "./cropImage/index.jsx";
import axios from "axios";
import { AuthContext } from "../../context/authContext.js";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const defaltImg =
  "/assets/images/default-avatar-profile-icon-of-social-media-user-vector";
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "";
export default function AvatarUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(defaltImg);
  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [openDelelte, setOpenDelete] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setValue("avatar", acceptedFiles[0]);
    setAvatarPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (data) => {
    // handle form submission here
    //console.log(data);
    // const formData = new FormData();
    // formData.append("image", data.avatar[0]);
    // try {
    //   // Send a POST request to upload the image
    //   const response = await axios.post(
    //     `${DOMAIN}/api/users/uploadFileImage/${currentUser.id}`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(response.data); // The response from the server after uploading
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const deleteImageUser = async () => {
    try {
      const value = { ...currentUser, image: null };
      await axios.patch(`${DOMAIN}/api/users/${currentUser.id}/remove-image`);
      toast.success("Xóa ảnh thành công");
      localStorage.setItem("user", JSON.stringify(value));
      window.location.reload();
    } catch (error) {
      toast.error("Lỗi! Xóa ảnh không thành công...");
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[100px] h-[100px] ">
        {avatarPreviewUrl && (
          <img
            src={
              currentUser && currentUser.image
                ? `/uploads/${currentUser.image}`
                : "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
            }
            alt="Avatar preview"
            className="w-full h-full object-cover center"
          />
        )}
      </div>
      <div className="flex items-center gap-3 mt-2">
        {/* <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <button className="bg-[#428bca] text-white text-[12px] px-2 py-1 rounded-md">
            Thay đổi hình đại điện
          </button>
        </div> */}
        <div>
          <button
            className="bg-[#428bca] text-white text-[12px] px-2 py-1 rounded-md"
            onClick={() => setOpen(true)}
          >
            Thay đổi hình đại điện
          </button>
        </div>
        <div>
          <button
            onClick={() => setOpenDelete(true)}
            className="bg-red-600 text-white text-[12px] px-2 py-1 rounded-md"
          >
            Xóa
          </button>
        </div>
      </div>

      {/* <input type="file" accept="image/*" onChange={(e) => handleUpload(e)} />
      <button type="submit">Submit</button> */}
      <Modal open={open} setOpen={setOpen}>
        <ImageCrop
          avatarPreviewUrl={avatarPreviewUrl}
          setAvatarPreviewUrl={setAvatarPreviewUrl}
          setOpen={setOpen}
        />
      </Modal>
      <ModalV1
        open={openDelelte}
        setOpen={setOpenDelete}
        title={"Bạn có chắc chắn muốn xóa ảnh đại diện ?"}
      >
        <button
          onClick={deleteImageUser}
          className="bg-red-600 text-white text-[14px] px-3 py-2 rounded-md hover:bg-red-700"
        >
          Đồng ý
        </button>
      </ModalV1>
    </form>
  );
}

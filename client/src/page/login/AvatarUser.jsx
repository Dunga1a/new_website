import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Test from "../../components/ShareSocial/ShareFaceBook";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const defaltImg =
  "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
export default function AvatarUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(AuthContext);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(defaltImg);

  const onDrop = useCallback((acceptedFiles) => {
    // set value of the uploaded file to form state
    setValue("avatar", acceptedFiles[0]);
    // set preview image url
    setAvatarPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (data) => {
    // handle form submission here
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.avatar[0]);

    try {
      // Send a POST request to upload the image
      const response = await axios.post(
        `${DOMAIN}/api/users/uploadFileImage/${currentUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // The response from the server after uploading
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[100px] h-[100px] ">
        {avatarPreviewUrl && (
          <img src={avatarPreviewUrl} alt="Avatar preview" />
        )}
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <button>Choose</button>
      </div>

      <button type="submit">Submit</button>
      <Test
        title="Cu duy"
        description="Bo may co khien"
        url="https://www.facebook.com/"
      />
    </form>
  );
}

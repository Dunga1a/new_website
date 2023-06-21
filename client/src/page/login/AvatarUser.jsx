import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Test from "../../components/ShareSocial/ShareFaceBook";
const defaltImg =
  "https://doanhnhanthanhhoahanoi.com/themes/default/images/users/no_avatar.png?fbclid=IwAR338fL6RIzbS6D7bPRRwrwdTnvJbePi4du2t5x47ei63BYmnz4CM_-VRfo";
export default function AvatarUser() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(defaltImg);

  const onDrop = useCallback((acceptedFiles) => {
    // set value of the uploaded file to form state
    setValue("avatar", acceptedFiles[0]);
    // set preview image url
    setAvatarPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (data) => {
    // handle form submission here
    console.log(data);
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

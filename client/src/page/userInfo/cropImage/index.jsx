import React, { useState, useRef } from "react";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_DOMAIN;

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 20,
        height: 20,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCrop({
  avatarPreviewUrl,
  setAvatarPreviewUrl,
  setOpen,
}) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);
  const { currentUser } = useContext(AuthContext);
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  // function onDownloadCropClick() {
  //   if (!previewCanvasRef.current) {
  //     throw new Error("Crop canvas does not exist");
  //   }

  //   previewCanvasRef.current.toBlob((blob) => {
  //     if (!blob) {
  //       throw new Error("Failed to create blob");
  //     }
  //     if (blobUrlRef.current) {
  //       URL.revokeObjectURL(blobUrlRef.current);
  //     }
  //     blobUrlRef.current = URL.createObjectURL(blob);
  //     hiddenAnchorRef.current.href = blobUrlRef.current;
  //     hiddenAnchorRef.current.click();
  //   });
  // }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const getImage = async () => {
    const canvas = previewCanvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setAvatarPreviewUrl(dataUrl);
    const file = dataURLtoFile(dataUrl, `${Date.now()}-avatar.png`);
    const formData = new FormData();
    formData.append("image", file);
    //const values = { ...currentUser, ...formData };
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
      toast.success("Thay đổi ảnh đại diện thành công");

      const values = { ...currentUser, image: response.data.image };
      localStorage.setItem("user", JSON.stringify(values));

      setOpen(false);
      window.location.reload();
      //console.log(response.data); // The response from the server after uploading
    } catch (error) {
      console.error(error);
    }
    //setTimeout(() => window.location.reload(), 5000);
  };

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div style={{ display: "none" }}>
          <div>
            <label htmlFor="scale-input">Scale: </label>
            <input
              id="scale-input"
              type="number"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="rotate-input">Rotate: </label>
            <input
              id="rotate-input"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
          <div>
            <button onClick={handleToggleAspectClick}>
              Toggle aspect {aspect ? "off" : "on"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            // className="w-[500px] h-[500px]"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <>
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                  margin: "auto",
                }}
              />
              <button
                className="px-3 py-1 bg-blue-500 rounded-xl text-white font-semibold mt-1"
                onClick={getImage}
              >
                Thay đổi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

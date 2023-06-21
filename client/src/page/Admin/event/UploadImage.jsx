import React, { useState } from "react";

const UploadImage = ({ handleImageChange }) => {
  //   console.log(setSelectedImages);

  return (
    <>
      <div>
        <input type="file" name="file" multiple onChange={handleImageChange} />
      </div>
    </>
  );
};

export default UploadImage;

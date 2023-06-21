import React from "react";
import FormBusinessArea from "./FormBusinessArea";
const initValue = {
  name: "",
  status: true,
  content: "",
};
const FormBusinessAreaNew = () => {
  const onSave = (data) => {
    console.log("form business are new: ", data);
  };
  return (
    <div>
      <FormBusinessArea initValue={initValue} onSave={onSave} />
    </div>
  );
};

export default FormBusinessAreaNew;

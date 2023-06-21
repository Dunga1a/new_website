import React from "react";
import FormEvent from "./FormEvent";

const initValue = {
  title: "Toi boc vac o tren nay ma",
  address: "",
  leader: "",
  date_start: "",
  date_end: "",
  time_end: "",
  content: "",
  image: [],
};

const FormNew = () => {
  const onSave = (data) => {
    console.log("vao day form moi: ", data);
  };
  return (
    <div>
      <FormEvent initValue={initValue} onSave={onSave} />
    </div>
  );
};

export default FormNew;

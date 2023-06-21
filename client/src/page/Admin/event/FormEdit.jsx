import React from "react";
import FormEvent from "./FormEvent";
import { useState } from "react";

const FormEdit = () => {
  const [value, setValue] = useState({
    title: "Fetch Data o day ",
    address: "aaaa",
    leader: "bbbbb",
    date_start: "2023-05-26",
    date_end: "2023-05-27",
    time_start: "16:10",
    time_end: "16:10",
    content: "2:30",
    image: [
      "https://tsddbwptfwiyathksqae.supabase.co/storage/v1/object/public/images/1684919651801_mu1.jpg",
    ],
  });

  const onSave = (data) => {
    console.log("vao day: ", data);
  };
  return (
    <div>
      <FormEvent initValue={value} onSave={onSave} />
    </div>
  );
};

export default FormEdit;

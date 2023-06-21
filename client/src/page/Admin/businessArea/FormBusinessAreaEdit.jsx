import React from "react";

import { useState } from "react";
import FormBusinessArea from "./FormBusinessArea";
import { useEffect } from "react";

const FormBusinessAreaEdit = ({ idBusinessArea }) => {
  console.log(idBusinessArea);
  const [value, setValue] = useState();

  const fetchData = () => {
    // call api tra ve data
    const data = {
      title: `fetch data theo ${idBusinessArea} `,
      status: false,
      content: "Theo api tra ra",
    };

    setValue(data);
  };

  useEffect(() => {
    fetchData();
  }, [idBusinessArea]);

  const onSave = (data) => {
    console.log("vao day form edit: ", data);
  };
  return (
    <div>
      {value ? <FormBusinessArea initValue={value} onSave={onSave} /> : null}
    </div>
  );
};

export default FormBusinessAreaEdit;

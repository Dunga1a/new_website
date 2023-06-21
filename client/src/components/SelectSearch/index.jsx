import React, { useState } from "react";
import Select from "react-select";

const SelectSearch = ({ options, label, forId }) => {
  // const [test, setTest] = useState(options);
  // console.log("vao day", options[0].value);

  return (
    <div className="mt-3">
      <label
        htmlFor={`${forId}`}
        className="inline-block mb-2 text-[14px] font-bold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Select
        defaultValue={options[0]}
        options={options}
        id={`${forId}`}
        className="input_select"
      />
    </div>
  );
};

export default SelectSearch;

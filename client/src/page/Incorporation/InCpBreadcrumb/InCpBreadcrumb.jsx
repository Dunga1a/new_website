import React from "react";

const InCpBreadcrumb = ({ title }) => {
  return (
    <div className="text-center">
      <h2 className="bg-[#1f9cf8] rounded border-[#1f9cf8] uppercase font-bold text-white py-2">
        {title}
      </h2>
    </div>
  );
};

export default InCpBreadcrumb;

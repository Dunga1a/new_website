import React from "react";

const LayoutLoginPage = ({
  className,
  children,
  title,
  subtitle,
  bg,
  footer,
}) => {
  return (
    <div
      className={`${className ? className : ""} ${
        bg ? bg : "bg-gray-200"
      }  p-4`}
    >
      <div>
        <h3 className="text-lg font-bold text-center mb-4">{title}</h3>
        <p className="bg-[#f7f7f7] p-2 text-gray-600 border-[1px] border-solid border-[#dcdcdc] rounded-sm text-sm">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
};

export default LayoutLoginPage;

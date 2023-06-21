import React from "react";

const Category = () => {
  return (
    <div className="border-[1px] border-solid border-[#4f4f4f] rounded mb-3 desktop:block laptop:block phone:hidden tablet:hidden">
      <h2 className="px-3 py-2 bg-blue-500 text-white font-semibold text-lg uppercase">
        Danh mục
      </h2>
      <ul className="mt-4 uppercase text-sm text-[#494949] px-4">
        <li className="py-3 hover:opacity-80">
          <a href="">Tin hoạt động</a>{" "}
        </li>
        <li className="py-3 hover:opacity-80">
          <a href="">tin tức hội viên</a>{" "}
        </li>
        <li className="py-3 hover:opacity-80">
          <a href="">tin tức thanh hóa</a>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Category;

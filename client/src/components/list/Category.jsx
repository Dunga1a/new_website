import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const sheet = 1;
      const category = await axios.get(
        `${DOMAIN}/api/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      setCategoryList(category.data.getListCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = (item) => {
    navigate(`/news/${item.slug}`, { state: { item } });
  };
  return (
    <div className="border-[1px] border-solid border-[#4f4f4f] rounded mb-3 desktop:block laptop:block phone:hidden tablet:hidden">
      <h2 className="px-3 py-2 bg-blue-500 text-white font-semibold text-lg uppercase">
        Danh mục
      </h2>
      <ul className="mt-4 uppercase text-sm text-[#494949] px-4">
        {categoryList &&
          categoryList.map((item) => (
            <li key={item.news_category_id} className="py-3 hover:opacity-80">
              <p className="cursor-pointer" onClick={() => handleClick(item)}>
                {item.name}
              </p>{" "}
            </li>
          ))}
        {/* <li className="py-3 hover:opacity-80">
          <a href="">Tin hoạt động</a>{" "}
        </li>
        <li className="py-3 hover:opacity-80">
          <a href="">tin tức hội viên</a>{" "}
        </li>
        <li className="py-3 hover:opacity-80">
          <a href="">tin tức thanh hóa</a>{" "}
        </li> */}
      </ul>
    </div>
  );
};

export default Category;

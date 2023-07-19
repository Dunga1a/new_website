import React from "react";
import { useNavigate } from "react-router-dom";

const ListOfExecutiveItem = ({ memberItem }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1">
      <div
        key={memberItem.id}
        onClick={() =>
          navigate("/member/" + memberItem.id, { state: memberItem })
        }
        className="bg-white border cursor-pointer hover:bg-gray-100 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
      >
        <div className="bg-gray-300">
          <img
            className="h-[250px] max-w-full object-contain m-auto "
            src={
              memberItem.image_person
                ? `/uploads/${memberItem.image_person}`
                : "/assets/images/default_member.jpg"
            }
            alt=""
          />
        </div>

        <div className="p-5 text-center">
          <h5 className="mb-2 text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {memberItem.name_company}
          </h5>

          <p className="mb-3 font-semibold text-red-700 dark:text-gray-400">
            {memberItem.id_role_associations.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListOfExecutiveItem;

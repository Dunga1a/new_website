import React from "react";
import ListOfExecutiveItem from "./ListOfExecutiveItem";

const ListOfExecutiveGroup = ({ title, item }) => {
  return (
    <div className="my-3">
      <h3 className="font-semibold text-[18px] mb-1">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {item.map((memberItem) => {
          return <ListOfExecutiveItem memberItem={memberItem} />;
        })}
      </div>
    </div>
  );
};

export default ListOfExecutiveGroup;

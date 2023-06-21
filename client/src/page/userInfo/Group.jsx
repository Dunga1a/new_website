import React, { useState, useRef } from "react";

const arrContent = [
  {
    id: 1,
    name: "NukeViet-Fans",
    role: "Nhóm tham gia tự do",
    desc: "Nhóm những người hâm mộ hệ thống NukeViet",
    join: "Chưa tham gia",
    member: "0",
  },
  {
    id: 2,
    name: "NukeViet-Admins",
    role: "Nhóm tham gia tự do",
    desc: "Nhóm những người quản lý website xây dựng bằng hệ thống NukeViet",
    join: "Chưa tham gia",
    member: "0",
  },
  {
    id: 3,
    name: "NukeViet-Programmers",
    role: "Nhóm tham gia phải gửi yêu cầu",
    desc: "Nhóm Lập trình viên hệ thống NukeViet",
    join: "Chưa tham gia",
    member: "0",
  },
];

const Group = () => {
  const inputRef = useRef();
  const [checked, setChecked] = useState([]);
  //   const [checkAll, setCheckAll] = useState(false);
  //   console.log(checked);
  const handleChecked = (id) => {
    setChecked((prev) => {
      const isChecked = checked.includes(id);

      if (isChecked) return checked.filter((item) => item !== id);
      return [...prev, id];
    });
  };
  const handleCheckedAll = () => {
    if (inputRef.current.checked) {
      setChecked([1, 2, 3]);
    } else {
      setChecked([]);
    }
  };

  return (
    <div>
      <table className="table-auto border-collapse border border-slate-500 rounded-md m-auto">
        <thead className="rounded-t-md">
          <tr>
            <td className="border border-slate-600 p-2">
              <input
                type="checkbox"
                checked={arrContent.length === checked.length}
                onClick={handleCheckedAll}
                ref={inputRef}
              />
            </td>
            <td className="border border-slate-600 text-[13px] text-[#333] p-2">
              TÊN NHÓM
            </td>
            <td className="border border-slate-600 text-[13px] text-[#333] p-2">
              GIỚI THIỆU
            </td>
            <td className="border border-slate-600 text-[13px] text-[#333] p-2 w-[13%]">
              THÀNH VIÊN
            </td>
            <td className="border border-slate-600 text-[13px] text-[#333] p-2 w-[15%]"></td>
          </tr>
        </thead>
        <tbody>
          {arrContent.map((item, idx) => (
            <tr key={idx}>
              <td className="border border-slate-600 p-2">
                <input
                  type="checkbox"
                  className=""
                  checked={checked.includes(item.id)}
                  onChange={() => handleChecked(item.id)}
                />
              </td>
              <td className="border border-slate-600 p-2">
                <h4 className="text-[14px]">
                  <strong>{item.name}</strong>
                </h4>
                <em className="text-[13px] text-green-600">{item.role}</em>
              </td>
              <td className="border border-slate-600 p-2 text-[14px]">
                {item.desc}
              </td>
              <td className="border border-slate-600 text-center">
                {item.member}
              </td>
              <td className="border border-slate-600 p-2 text-[14px]">
                {item.join}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-start">
        <button
          className="bg-[#428bca] p-2 rounded-lg text-white text-[13px] ml-6 mt-4"
          type="submit"
        >
          Tham gia
        </button>
      </div>
    </div>
  );
};

export default Group;

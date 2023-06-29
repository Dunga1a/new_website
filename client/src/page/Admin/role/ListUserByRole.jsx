import React from "react";

const ListUserByRole = ({ item }) => {
  return (
    <tr>
      <td className="text-center">{item.username}</td>
      <td className="text-center">{item.email}</td>
      <td>
        <img
          src={
            item.image
              ? `/uploads/${item.image}`
              : "https://doanhnhanthanhhoahanoi.com/uploads/logo-107x107.png"
          }
          className="w-[60px] h-[60px] m-auto p-2"
        />
      </td>
      <td>{item.status === 1 ? "Đang Hoạt Động" : "Đã Bị Khóa"}</td>
    </tr>
  );
};

export default ListUserByRole;

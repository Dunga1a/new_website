import React from "react";
import Card from "../../../components/Card/Card";
import { RiArrowRightSFill } from "react-icons/ri";
import Button from "../../../components/Buttons/Button";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
const MembersDetail = () => {
  return (
    <Card title={"Chi tiết hội viên"}>
      <div className=" relative w-full p-5">
        <table className="border border-gray-400 w-full text-base rounded">
          <colgroup>
            <col width={"20%"} />
          </colgroup>
          <tbody>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Tên doanh nghiệp
              </th>
              <td className="px-2 font-medium">
                Doanh nghiệp của Nguyễn Mạnh Dũng
              </td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Hình ảnh doanh nghiệp
              </th>
              <td className="py-2">
                <img
                  src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/349596562_220582074079604_8182938619795510549_n.jpg?stp=dst-jpg_p526x296&_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XHjj_RdowvsAX-T47A9&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBQyXsT_LkEwubIU9gHYtjGh-jgy7mwlImONzeo29EmVg&oe=647A3852"
                  alt="Hình ảnh doanh nghiệp"
                  width={150}
                  className="h-[150px] object-cover m-auto rounded-lg drop-shadow-xl"
                />
              </td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Người đại diện
              </th>
              <td className="px-2 font-medium">Nguyễn Mạnh Dũng</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Ảnh người đại diện
              </th>
              <td className="py-2">
                <img
                  src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/349596562_220582074079604_8182938619795510549_n.jpg?stp=dst-jpg_p526x296&_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XHjj_RdowvsAX-T47A9&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBQyXsT_LkEwubIU9gHYtjGh-jgy7mwlImONzeo29EmVg&oe=647A3852"
                  alt="Hình ảnh người đại diện"
                  width={150}
                  className="h-[150px] object-cover m-auto rounded-lg drop-shadow-xl"
                />
              </td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">Chức vụ</th>
              <td className="px-2 font-medium">Chủ tịch</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Số điện thoại
              </th>
              <td className="px-2 font-medium">0912732334</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">Email</th>
              <td className="px-2 font-medium">dung@gmail.com</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">Website</th>
              <td className="px-2 font-medium">Website123.com.vn</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Mô tả doanh nghiệp
              </th>
              <td className="px-2 font-medium">Doanh nghiệp này là số 1</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Lĩnh vực hoạt động
              </th>
              <td className="px-2 font-medium">Nồi niêu xoong chảo</td>
            </tr>
            <tr className="border border-gray-400">
              <th className="text-left p-2 border border-gray-400">
                Trạng thái
              </th>
              <td className="px-2 font-medium">Đã duyệt</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <Button
            icon={<TbEdit className="text-[18px]" />}
            colorBgr={"bg-green-500 text-white hover:bg-green-800"}
          />
          <Button
            icon={<AiOutlineDelete className="text-[18px]" />}
            colorBgr={"bg-red-600 text-white hover:bg-red-800"}
          />
        </div>
      </div>
    </Card>
  );
};

export default MembersDetail;

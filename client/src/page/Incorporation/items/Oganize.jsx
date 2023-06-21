import React from "react";
import InCpBreadcrumb from "../InCpBreadcrumb/InCpBreadcrumb";
import Breadcrumbs from "../../../components/Breadcrumb";
import RightBar from "../../../components/list/RightBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const menuOffice = [
  {
    id: 1,
    title: "Văn phòng",
    href: "/office",
  },
  {
    id: 2,
    title: "Ban tổ chức",
    href: "/office",
  },
  {
    id: 3,
    title: "Ban tuyên giáo",
    href: "/office",
  },
  {
    id: 4,
    title: "Ban Dân vận",
    href: "/office",
  },
  {
    id: 5,
    title: "Ủy ban kiểm tra",
    href: "/office",
  },
  {
    id: 6,
    title: "Ban nội chính",
    href: "/office",
  },
];
const Oganize = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const prop = state.item;
  const handleClick = (item) => {
    navigate(item.href, { state: { item } });
  };
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs
        title={"cơ cấu tổ chức"}
        subtitle={prop.title}
        link={"/incorporation"}
      />
      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="col-span-3">
          <div className="  rounded border-solid border-[1px] border-sky-500">
            <InCpBreadcrumb title={prop.title} />
            <div className="p-4">
              <div></div>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <div
                    onClick={() => navigate("/detailUser")}
                    title="Nguyễn Hùng Dũng"
                    className="cursor-pointer"
                  >
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </div>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold cursor-pointer ">
                      <div
                        onClick={() => navigate("/detailUser")}
                        title="Nguyễn Hùng Dũng"
                      >
                        Nguyễn Hùng Dũng
                      </div>
                    </h3>

                    <span className="inline-block text-sm">
                      Chủ tịch - trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <a href="" title="Nguyễn Hùng Dũng">
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </a>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold ">
                      <a href="" title="Nguyễn Hùng Dũng">
                        Nguyễn Hùng Dũng
                      </a>
                    </h3>

                    <span className="inline-block text-sm">
                      Chủ tịch - trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <a href="" title="Nguyễn Hùng Dũng">
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </a>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold ">
                      <a href="" title="Nguyễn Hùng Dũng">
                        Nguyễn Hùng Dũng
                      </a>
                    </h3>

                    <span className="inline-block text-sm">
                      Chủ tịch - trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <a href="" title="Nguyễn Hùng Dũng">
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </a>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold ">
                      <a href="" title="Nguyễn Hùng Dũng">
                        Nguyễn Hùng Dũng
                      </a>
                    </h3>

                    <span className="inline-block text-sm">
                      Chủ tịch - trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <a href="" title="Nguyễn Hùng Dũng">
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </a>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold ">
                      <a href="" title="Nguyễn Hùng Dũng">
                        Nguyễn Hùng Dũng
                      </a>
                    </h3>

                    <span className="inline-block text-sm">
                      Chủ tịch - trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
                <div className="p-[4px] mb-5 text-[#333] text-[16px] text-center border-2 border-[#ddd] border-solid rounded-lg">
                  <a href="" title="Nguyễn Hùng Dũng">
                    <img
                      src="https://doanhnhanthanhhoahanoi.com/themes/default/images/organs/no-avatar.jpg"
                      alt=""
                      className="max-h-[100px] m-auto"
                    />
                  </a>
                  <div className="py-2 px-1">
                    <h3 className="font-semibold ">
                      <a href="" title="Nguyễn Hùng Dũng">
                        Nguyễn Hùng Dũng
                      </a>
                    </h3>

                    <span className="inline-block text-sm">
                      Phó Chủ tịch - Phó trưởng ban
                    </span>
                    <span className="text-sm">01/01/1970</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <strong className="text-sm">
              Danh sách các phòng ban trực thuộc :
            </strong>
            <ul className=" w-full cursor-pointer bg-white z-20 text-sm py-3 border-[1px] border-solid border-[#ababab] rounded-xl">
              {menuOffice.map((item) => (
                <li className="py-1 px-6 flex items-center" key={item.id}>
                  {" "}
                  <span className="mr-1">{item.id}.</span>
                  <div
                    onClick={() => handleClick(item)}
                    className="text-[#0707CE] capitalize hover:underline hover:transition-all hover:transition-duration-[300ms]"
                  >
                    {item.title}
                  </div>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-1">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Oganize;

import React from "react";

import { BiUpArrow } from "react-icons/bi";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  // console.log("currentYear: ", currentYear);
  return (
    <>
      <footer className=" dark:bg-gray-900 footer pb-4">
        <div className="mx-auto max-w-[1080px]">
          {/* <ul className="laptop:grid desktop:grid grid-cols-4 gap-8 px-4 pb-[3.5rem] pt-2 laptop:grid-cols-4 desktop:grid-cols-4 phone:hidden tablet:hidden ">
            <li>
              <h2 className="leading-[3.5rem] font-semibold text-gray-700 dark:text-white uppercase text-xl">
                Sở / Ban Ngành
              </h2>
              <ul className="text-gray-700 mt-5 dark:text-gray-400 font-medium">
                <li className="mb-1">
                  <div href="#" className=" hover:underline">
                    Sở Giáo Dục và Đào Tạo
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Sở khoa học và công nghệ
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Sở NN&PT Nông thôn
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Sở công thương
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Sở tài chính
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="leading-[3.5rem]  font-semibold text-gray-700 dark:text-white uppercase text-xl">
                Bộ / Ngành
              </h2>
              <ul className="text-gray-700 mt-5 dark:text-gray-400 font-medium">
                <li className="mb-1">
                  <div href="#" className=" hover:underline">
                    Bộ Nông Nghiệp
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Bộ Giáo Dục
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Bộ Tài Chính
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Bộ Giao thông vận tải
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Bộ Y tế
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="leading-[3.5rem]  font-semibold text-gray-700 dark:text-white uppercase text-xl">
                ĐOÀN HỘI
              </h2>
              <ul className="text-gray-700 mt-5 dark:text-gray-400 font-medium">
                <li className="mb-1">
                  <div href="#" className=" hover:underline">
                    Liên hiệp các hội KHKT
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    LH Các tổ chức hữu nghị
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Ngân hàng chính sách xã hội
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Đoàn thanh niên Việt Nam
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Hội tin học Việt Nam
                  </div>
                </li>
              </ul>
            </li>

            <li>
              <h2 className="leading-[3.5rem]  font-semibold text-gray-700 dark:text-white uppercase text-xl">
                LIÊN KẾT WEBSITE
              </h2>
              <ul className="text-gray-700 mt-5 dark:text-gray-400 font-medium">
                <li className="mb-1">
                  <div href="#" className=" hover:underline">
                    Đảng Cộng sản Việt Nam
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Cổng thông tin Chính Phủ
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Báo điện tử Chính phủ
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Thông tấn xã Việt Nam
                  </div>
                </li>
                <li className="mb-1">
                  <div href="#" className="hover:underline">
                    Đài tiếng nói Việt Nam
                  </div>
                </li>
              </ul>
            </li>
          </ul> */}

          <div className="px-4 pt-6  text-gray-700">
            <div className="text-center">
              <span className="uppercase text-xl">
                <strong>
                  Ban biên tập Cổng thông tin điện tử Hội Doanh Nhân Thanh Hóa
                  Tại Hà Nội
                </strong>
              </span>
              <p>Điện thoại: 0982 885588</p>
              <p>Fax: 0982 885588</p>
              <div>
                Email:{" "}
                <p className="inline">hoidoanhnhanthanhhoa.hbta@gmail.com</p>
              </div>
            </div>

            <div className="text-center cursor-pointer">
              <div className="text-center">
                © {currentYear}&nbsp;- Bản quyền&nbsp;thuộc về Hội Doanh Nhân
                Thanh Hóa tại Hà Nội.
                <br />
                <div className="flex items-center justify-center">
                  <div href="">Điều khoản sử dụng</div> |
                  <div href="">Chính sách bảo mật (Quyền riêng tư)</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              {/* <div>
                Powered by
                <p className="inline">NukeViet eGovernment</p>. Designed by
                <p className="inline">VINADES.,JSC</p>.
              </div> */}
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-500 py-4">
        <div className="max-w-[1080px] m-auto flex justify-between items-center px-3">
          <div className="flex items-center">
            {/* <div
              href="#"
              className="mr-3 w-7 h-7 rounded-full flex items-center bg-primaryColor text-white justify-center"
            >
              <TbBrandStackshare className="font-bold text-lg" />
            </div> */}
          </div>
          <div>
            <button
              className="w-8 h-8 rounded-full flex items-center bg-blue-500 text-white justify-center"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <BiUpArrow className="font-bold text-lg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

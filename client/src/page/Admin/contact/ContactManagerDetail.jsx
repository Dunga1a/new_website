import React, { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { BsFileEarmarkText } from "react-icons/bs";
import Button from "../../../components/Buttons/Button";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ContactReply from "./ContactReply";
import Reply from "./Reply";
import axios from "axios";
import dayjs from "dayjs";
import { Flip, toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const ContactManagerDetail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [dataContact, setDataContact] = useState([]);
  const op = searchParams.get("op");
  const reply = () => {
    navigate(`/admin/contact/${id}?op=reply`);
  };

  const back = () => {
    navigate("/admin/contact");
  };

  const fetchData = async () => {
    const response = await axios.get(`${DOMAIN}/api/contact/contactById/` + id);
    console.log(response.data);
    setDataContact(response.data);
  };

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const idNew = id.split(",").map((item) => parseInt(item, 10));
      console.log(idNew);

      await axios.post(`${DOMAIN}/api/contact/deletesContact/`, idNew);
      setOpen(false);
      toast.success("Đã xóa thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setOpen(false);
      window.location.href = "/admin/contact";
    } catch (error) {
      console.log(error.message);
    }
  };

  //console.log(dataContact);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {op ? (
        // truyền value qua props
        <ContactReply dataReply={dataContact} />
      ) : (
        <Card title={"Chi Tiết Liên Hệ"}>
          {dataContact ? (
            <Card.Content>
              <div className="flex items-center gap-2 mb-2">
                <BsFileEarmarkText />
                <span className="text-[16px] text-[#ccc] font-bold">
                  {dataContact.title}
                </span>
              </div>
              <table className="border-collapse border border-slate-500 w-full">
                <tbody>
                  <tr>
                    <td className="py-1 px-2 w-[13%] align-baseline">
                      Thông tin người gửi
                    </td>
                    <td className="border border-slate-700 py-1 px-2">
                      <p>
                        <span className="text-[#0074a2] mr-[5px]">
                          {dataContact.username}
                        </span>
                        <span>{dataContact.email}</span>
                      </p>
                      <p>
                        <span>Điện thoại: </span>
                        <span>{dataContact.phone_number}</span>
                      </p>
                      <p>
                        <span>Địa chỉ: </span>
                        <span>{dataContact.address}</span>
                      </p>
                      <p>
                        {dayjs(dataContact.created_at).format(
                          "H:mm DD/MM/YYYY"
                        )}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 w-[13%] py-1 px-2">
                      Chủ đề
                    </td>
                    <td className="border border-slate-700 py-1 px-2">
                      {dataContact.topic}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-slate-700 py-1 px-2"
                      colSpan={2}
                      dangerouslySetInnerHTML={{
                        __html: dataContact.content ? dataContact.content : "",
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 py-2 border border-slate-500 bg-[#f4f4f4] flex justify-center gap-2">
                <Button
                  title={"Gửi phản hồi"}
                  colorText={
                    "border border-slate-500 hover:bg-gray-200 bg-white"
                  }
                  onClick={reply}
                />
                <Button
                  onClick={() => setOpen(true)}
                  title={"Xóa"}
                  colorText={
                    "border border-slate-500 hover:bg-gray-200 bg-white"
                  }
                />
                <Button
                  title={"Quay Lại"}
                  colorText={
                    "border border-slate-500 hover:bg-gray-200 bg-white"
                  }
                  onClick={back}
                />
              </div>
            </Card.Content>
          ) : (
            ""
          )}

          <Card.Content>
            {/* se truyen data qua prop */}
            {dataContact.status === 1 ? <Reply dataReply={dataContact} /> : ""}
          </Card.Content>
        </Card>
      )}
      <Modal title={"Xóa liên hệ"} open={open} setOpen={setOpen}>
        <h2 className="text-xl">
          Bạn có chắc muốn xóa liên hệ đã lựa chọn không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            colorText={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleDeleteMultiple}
          ></Button>
        </div>
      </Modal>
    </>
  );
};

export default ContactManagerDetail;

import React, { useEffect, useState } from "react";
import "./style.css";
import Pei from "../../components/DashBroad/Pei";
import axios from "axios";
import EmptyState from "../../components/EmptyState/EmptyState";
import { HiOutlineOfficeBuilding, HiUserGroup } from "react-icons/hi";
import { BsPostcardFill } from "react-icons/bs";
import { AiFillContacts } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const HomePage = () => {
  const [dataRole, setDataRole] = useState([]);
  const [post, setPost] = useState([]);
  const [member, setMember] = useState([]);
  const [contact, setContact] = useState([]);
  const [dataContact, setDataContact] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const navigate = useNavigate();
  const fetchDataStatic = async () => {
    try {
      const result = await axios.get(`${DOMAIN}/api/role/getAll`, {
        withCredentials: true,
      });
      const valueRole = result.data.map((item, idx) => ({
        id: item.name,
        label: item.name,
        value: item.count,
      }));
      setDataRole(valueRole);
      console.log(valueRole);
      const responsePost = await axios.get(
        `${DOMAIN}/api/posts/all-new-posts`,
        {
          withCredentials: true,
        }
      );
      setDataPost(responsePost.data);
      const valuePostTrue = responsePost.data.filter(
        (post) => post.status === true
      );
      const valuePostFalse = responsePost.data.filter(
        (post) => post.status === false
      );
      setPost([
        {
          id: "Đã duyệt",
          label: "Đã duyệt",
          value: valuePostTrue.length,
        },
        {
          id: "Chưa duyệt",
          label: "Chưa duyệt",
          value: valuePostFalse.length,
        },
      ]);

      const responseMembers = await axios.get(
        `${DOMAIN}/api/member/all-members`,
        {
          withCredentials: true,
        }
      );
      setDataMember(responseMembers.data);
      const valueMemberTrue = responseMembers.data.filter(
        (member) => member.status === 1
      );
      const valueMemberFalse = responseMembers.data.filter(
        (member) => member.status === 0
      );

      setMember([
        {
          id: "Đã duyệt",
          label: "Đã duyệt",
          value: valueMemberTrue.length,
        },
        {
          id: "Chưa duyệt",
          label: "Chưa duyệt",
          value: valueMemberFalse.length,
        },
      ]);

      const responseContact = await axios.get(
        `${DOMAIN}/api/contact/all-contacts`,
        {
          withCredentials: true,
        }
      );
      setDataContact(responseContact.data);

      const valueContactTrue = responseContact.data.filter(
        (contact) => contact.status === 1
      );
      const valueContactFalse = responseContact.data.filter(
        (contact) => contact.status === 0
      );

      setContact([
        {
          id: "Đã trả lời",
          label: "Đã trả lời",
          value: valueContactTrue.length,
        },
        {
          id: "Chưa trả lời",
          label: "Chưa trả lời",
          value: valueContactFalse.length,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataStatic();
  }, []);
  console.log(contact);
  return (
    <div className="grid grid-cols-2 gap-7 opacity-80 drop-shadow-new rounded-xl background max-h-full p-20">
      <div className=" h-64 relative bg-children rounded-2xl drop-shadow-2xl">
        {dataRole.length ? <Pei data={dataRole} /> : <EmptyState />}
        <h1
          onClick={() => navigate("/admin/role")}
          className=" absolute bottom-7 left-5 flex items-center font-semibold text-base hover:text-blue-500 cursor-pointer"
        >
          {" "}
          <HiOutlineOfficeBuilding className="mr-2" />
          Chức vụ{" "}
        </h1>
      </div>
      <div className=" h-64 relative bg-children rounded-2xl">
        {dataPost.length ? <Pei data={post} /> : <EmptyState />}
        <h1
          onClick={() => navigate("/admin/news")}
          className=" absolute bottom-7 left-5 flex items-center font-semibold text-base hover:text-blue-500 cursor-pointer"
        >
          {" "}
          <BsPostcardFill className="mr-2" />
          Bài viết{" "}
        </h1>
      </div>
      <div className=" h-64 relative bg-children rounded-2xl">
        {dataMember.length ? <Pei data={member} /> : <EmptyState />}
        <h1
          onClick={() => navigate("/admin/member")}
          className=" absolute bottom-7 left-5 flex items-center font-semibold text-base hover:text-blue-500 cursor-pointer"
        >
          {" "}
          <HiUserGroup className="mr-2" />
          Hội viên{" "}
        </h1>
      </div>
      <div
        onClick={() => navigate("/admin/contact")}
        className="h-64 relative bg-children rounded-2xl"
      >
        {dataContact.length ? <Pei data={contact} /> : <EmptyState />}
        <h1 className=" absolute bottom-7 left-5 flex items-center font-semibold text-base hover:text-blue-500 cursor-pointer">
          {" "}
          <AiFillContacts className="mr-2 text-[20px]" />
          Liên hệ{" "}
        </h1>
      </div>
    </div>
  );
};

export default HomePage;

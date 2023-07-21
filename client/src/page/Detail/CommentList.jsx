import { FaUserAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { BsFillReplyFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import FormReply from "./FormReply";
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import FormEdit from "./FormEdit";
import axios from "axios";
import FormDelete from "./FormDelete";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const CommentItem = ({
  comment,
  setOpen,
  open,
  currentUser,
  fetchData,
  postItem,
}) => {
  const [hidden, setHidden] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [valueDelete, setValueDelete] = useState([]);
  const handleReplyClick = (commentId) => {
    setOpen(commentId);
  };
  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = async (comment) => {
    try {
      const result = await axios.get(
        `${DOMAIN}/api/comment/comment/${comment.id}`,
        {
          withCredentials: true,
        }
      );
      setValueDelete(result.data);
      setOpenDelete(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    // {comment && }
    comment && (
      <div>
        {comment.father_id === null ? (
          <button
            onClick={() => setHidden(!hidden)}
            className="bg-[#428bca] border border-[#357ebd] text-white text-[12px] rounded-sm mb-2 px-2"
          >
            Ẩn/Hiện ý kiến
          </button>
        ) : (
          ""
        )}
        {hidden && (
          <div
            className={`${
              comment.father_id === null
                ? "mt-2 pt-3 px-3 border-[1px] border-gray-300 rounded-md bg-gray-100 mb-3"
                : ""
            }`}
          >
            <div className="flex gap-2 items-center mb-3 ">
              <img
                src={
                  comment?.user?.image
                    ? `/uploads/${comment?.user?.image}`
                    : "/assets/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                }
                alt="avatar"
                className="rounded-full w-[40px] h-[40px]"
              />

              <div className="flex-1 bg-gray-200 rounded-lg px-2 py-1 ">
                <p>
                  <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                </p>
                <p className="flex gap-2">
                  <p className="flex gap-1 items-center">
                    <FaUserAlt className="font-bold" />
                    <p className="font-bold">{comment?.user?.username}</p>
                  </p>
                  <p className="flex gap-1 items-center">
                    <BiTime />
                    {dayjs(comment.created_at).format("DD/MM/YYYY HH:mm")}
                  </p>
                  {currentUser && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReplyClick(comment?.id)}
                        className="flex gap-1 items-center"
                      >
                        <BsFillReplyFill />
                        Trả lời
                      </button>
                      {currentUser.id === comment.user.id && (
                        <button onClick={handleEdit}>
                          <AiFillEdit />
                        </button>
                      )}

                      {(currentUser.id === comment.user.id ||
                        currentUser?.roles.some(
                          (item) => item.name === "admin"
                        )) && (
                        <button onClick={() => handleDelete(comment)}>
                          <AiFillDelete />
                        </button>
                      )}
                    </div>
                  )}
                </p>
              </div>
            </div>
            {comment.id === open && (
              <FormReply
                value={comment}
                user={currentUser}
                fetchData={fetchData}
                setOpen={setOpen}
                postItem={postItem}
              />
            )}
            {comment.children.length > 0 && (
              <div className="ml-4">
                {comment.children.map((child) => (
                  <CommentItem
                    key={child.id}
                    comment={child}
                    setOpen={setOpen}
                    open={open}
                    currentUser={currentUser}
                    fetchData={fetchData}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <Modal
          open={openEdit}
          setOpen={setOpenEdit}
          displayButtonCancel={false}
        >
          <FormEdit
            setOpen={setOpenEdit}
            comment={comment}
            fetchData={fetchData}
          />
        </Modal>

        <Modal
          open={openDelete}
          setOpen={setOpenDelete}
          displayButtonCancel={false}
        >
          <FormDelete
            setOpen={setOpenDelete}
            value={valueDelete}
            fetchData={fetchData}
          />
        </Modal>
      </div>
    )
  );
};

const CommentList = ({
  comments,
  setOpen,
  open,
  currentUser,
  fetchData,
  postItem,
}) => {
  return (
    <div>
      {postItem &&
        comments.map((comment, idx) => (
          <CommentItem
            key={idx}
            comment={comment}
            setOpen={setOpen}
            open={open}
            currentUser={currentUser}
            fetchData={fetchData}
            postItem={postItem}
          />
        ))}
    </div>
  );
};
export default CommentList;

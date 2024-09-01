import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useDeleteComment } from "./../../../query/LikeCommentQuery";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentList = ({ commentId, comment, userProfile, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { mutate: deletecomment } = useDeleteComment();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = () => {
    closeModal();
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const deleteComment = async () => {
    try {
      await deletecomment(comment.commentId);
      console.log("댓글 삭제 성공");
    } catch (error) {
      console.error(
        "댓글 삭제 실패:",
        error.response ? error.response.data : error.message
      );
    } finally {
      closeModal();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <div>
          <img
            src={userProfile || "/assets/cha.png"}
            alt="유저 사진"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="ml-2">
          <div className="w-[302px] rounded-xl h-auto bg-[#F5F5F5] p-[14px]">
            <div className="flex space-x-4">
              <div>{userName}</div>
              <div className="flex justify-center items-center">
                <Rating size="small" readOnly value={comment.rate} />
              </div>
              <div>{comment.diff}</div>
              <div className="right-0" onClick={openModal}>
                ...
              </div>
            </div>
            <br />
            <div>{comment.comment}</div>
          </div>
          <div className="flex space-x-5 font-normal text-[12px] text-[#767676]">
            <div>1시간</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[342px]">
            <div className="text-lg font-semibold mb-8 flex flex-col justify-center items-center">
              <img src="/assets/confirm.png" alt="삭제확인" className="mb-3" />
              수정/삭제
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={openUpdateModal}
                className="w-[146px] h-14 border-[1px] rounded-xl"
              >
                수정
              </button>
              <button
                onClick={deleteComment}
                className="w-[146px] h-14 border-[1px] rounded-xl"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateModalOpen && (
        <UpdateCommentModal
          closeHidden={closeUpdateModal}
          postingId={commentId}
          userName={userName}
          commentId={comment.commentId}
          initialRate={comment.rate}
          initialComment={comment.comment}
          initialDiff={comment.diff}
        />
      )}
    </div>
  );
};

CommentList.propTypes = {
  comment: PropTypes.shape({
    commentId: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    diff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  userProfile: PropTypes.string,
  userName: PropTypes.string,
  commentId: PropTypes.number,
};

CommentList.defaultProps = {
  userProfile: "/assets/cha.png",
  userName: "Unknown User",
};

export default CommentList;

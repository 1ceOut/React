import { useState } from "react";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import useUserStore from "./../../../store/useUserStore";
import {
  useAddComment,
  useUpdateComment,
} from "../../../query/LikeCommentQuery";

const UpdateCommentModal = ({
  closeHidden,
  postingId,
  userName,
  commentId,
  initialRate,
  initialComment,
  initialDiff,
}) => {
  const { userId: currentUserId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  const [rate, setRate] = useState(initialRate || 0);
  const [comment, setComment] = useState(initialComment || "");
  const [selectedQuality, setSelectedQuality] = useState(initialDiff || "");

  const { mutate: addComment } = useAddComment();
  const { mutate: updateComment } = useUpdateComment();

  const getRatingText = (rate) => {
    switch (rate) {
      case 1:
        return "별로에요";
      case 2:
        return "그저 그래요";
      case 3:
        return "보통이에요";
      case 4:
        return "좋아요";
      case 5:
        return "최고에요";
      default:
        return "";
    }
  };

  const submitForm = () => {
    const data = {
      userId: currentUserId,
      postingId,
      rate,
      comment,
      diff: selectedQuality,
    };

    if (commentId) {
      updateComment(
        { commentId, data },
        {
          onSuccess: () => {
            alert("Comment updated successfully!");
            closeHidden();
          },
          onError: (error) => {
            console.error("Failed to update comment:", error);
            alert("Failed to update the comment. Please try again.");
          },
        }
      );
    } else {
      addComment(data, {
        onSuccess: () => {
          alert("Comment submitted successfully!");
          closeHidden();
        },
        onError: (error) => {
          console.error("Failed to submit comment:", error);
          alert("Failed to submit the comment. Please try again.");
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeHidden}
      ></div>
      <div className="relative bg-white w-[90%] max-w-lg p-5 rounded-lg shadow-lg">
        <div className="flex justify-between text-lg">
          <div className="w-6 h-6"></div>
          <div className="flex">요리후기(리뷰)</div>
          <div className="cursor-pointer w-6 h-6" onClick={closeHidden}>
            X
          </div>
        </div>
        <div className="flex justify-center items-center">
          요리사진, 메세지를 {userName}님께 보냅니다!
        </div>
        <div className="flex flex-col justify-center items-center">
          <Rating
            size="large"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
          <div className="text-xs text-[#A8A8A8]">{getRatingText(rate)}</div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="" disabled>
              상중하 선택
            </option>
            <option value="상">상</option>
            <option value="중">중</option>
            <option value="하">하</option>
          </select>
        </div>
        <div className="border-[2px] w-full min-h-28 h-auto mt-2">
          <textarea
            id="food"
            name="food"
            type="text"
            placeholder="감사의 한마디 부탁드려요!"
            className="block outline-none pl-3 text-gray-900 placeholder:text-[#A8A8A8]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div
          className="bg-blue-600 rounded-md cursor-pointer text-white flex justify-center items-center h-9"
          onClick={submitForm}
        >
          {commentId ? "요리후기 수정하기" : "요리후기 남기기"}
        </div>
      </div>
    </div>
  );
};

UpdateCommentModal.propTypes = {
  closeHidden: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  postingId: PropTypes.string.isRequired,
  commentId: PropTypes.number,
  initialRate: PropTypes.number,
  initialComment: PropTypes.string,
  initialDiff: PropTypes.string,
};

UpdateCommentModal.defaultProps = {
  commentId: null,
  initialRate: 0,
  initialComment: "",
  initialDiff: "",
  initialImage: null,
};

export default UpdateCommentModal;

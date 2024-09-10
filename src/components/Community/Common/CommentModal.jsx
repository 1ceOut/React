import { useState } from "react";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import useUserStore from "./../../../store/useUserStore";
import { useAddComment } from "../../../query/LikeCommentQuery";
import { useDetailPost } from "../../../query/FeedQuery";
import axios from "axios";

const CommentModal = ({ closeHidden, postingId, userName }) => {
  const { userId: currentUserId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");

  const { mutate: addComment } = useAddComment();

  const { data: postDetail } = useDetailPost(postingId);
  const authorId = postDetail?.posting?.userId || null;

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
    const formData = new FormData();
    formData.append("userId", currentUserId);
    formData.append("postingId", postingId);
    formData.append("rate", rate);
    formData.append("comment", comment);
    formData.append("diff", selectedQuality);

    addComment(formData, {
      onSuccess: async () => {
        // 알림 전송 // 댓글 작성
        if (currentUserId !== authorId) {
          try {
            await axios.post(`${import.meta.env.VITE_ALERT_IP}/writeReply`, {
              sender: encodeURIComponent(currentUserId),
              receiver: encodeURIComponent(authorId),
              recipeposting: postingId,
              memo: comment,
            });
            //console.log("알림이 성공적으로 전송되었습니다.");
          } catch (error) {
            //console.error("알림 전송 중 오류 발생:", error);
            //alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
          }
        }

        closeHidden();
      },
      onError: (error) => {
        console.error("Failed to submit comment:", error);
      },
    });
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
            className="block outline-none pl-3 w-full h-28 text-gray-900 placeholder:text-[#A8A8A8]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div
          className="bg-blue-600 rounded-md cursor-pointer text-white flex justify-center items-center h-9"
          onClick={submitForm}
        >
          요리후기 남기기
        </div>
      </div>
    </div>
  );
};

CommentModal.propTypes = {
  closeHidden: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  postingId: PropTypes.string.isRequired,
};

export default CommentModal;

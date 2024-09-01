import { useState } from "react";
import { useCommentsByPostingId } from "./../../../query/LikeCommentQuery";
import PropTypes from "prop-types";
import CommentList from "./../Common/CommentList";

const FeedComment = ({ postingId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const { data, isLoading, isError } = useCommentsByPostingId(postingId);

  //const comments = response.comments || [];

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const getButtonClassNames = (filter) => {
    return selectedFilter === filter
      ? "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#2377EF] text-[#2377EF]"
      : "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#E1E1E1]";
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  return (
    <div className="self-stretch">
      <div className="my-5 cursor-pointer flex" onClick={handleClick}>
        관련성 높은 댓글
        <img
          src="/assets/downarrow.png"
          alt="아래방향"
          className="ml-2 flex justify-center items-center"
        />
      </div>

      <div className="mt-4">
        {data.comments.length > 0 ? (
          data.comments.map((comment) => (
            <div key={comment.comment.commentId}>
              <CommentList
                key={comment.commentId}
                comment={comment.comment}
                userProfile={comment.userProfile}
                userName={comment.userName}
              />
            </div>
          ))
        ) : (
          <div>No comments available</div>
        )}
      </div>

      {isModalVisible && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          <div className="fixed bottom-0 bg-white w-[390px] h-[258px] px-6 z-50">
            <div className="flex justify-between items-center mt-1 h-[46px]">
              <div className="text-lg font-bold">댓글 필터링</div>
              <button onClick={closeModal} className="text-lg font-bold">
                &times;
              </button>
            </div>
            <div className="cursor-pointer mt-8 flex justify-evenly items-center w-[342px]">
              <div
                className={getButtonClassNames("latest")}
                onClick={() => handleFilterClick("latest")}
              >
                최신순
              </div>
              <div
                className={getButtonClassNames("all")}
                onClick={() => handleFilterClick("all")}
              >
                모든 댓글
              </div>
              <div
                className={getButtonClassNames("best")}
                onClick={() => handleFilterClick("best")}
              >
                베스트 댓글
              </div>
            </div>
            <div className="mt-6 w-[342px] h-[56px] cursor-pointer rounded-xl text-white flex justify-center items-center bg-[#2377EF]">
              조회
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FeedComment.propTypes = {
  postingId: PropTypes.string.isRequired,
};

export default FeedComment;

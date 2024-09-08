import { useState, useEffect } from "react";
import { useCommentsByPostingId } from "./../../../query/LikeCommentQuery";
import PropTypes from "prop-types";
import CommentList from "./../Common/CommentList";
import useUserStore from "./../../../store/useUserStore";

const FeedComment = ({ postingId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [sortDirection, setSortDirection] = useState({
    latest: "desc",
    best: "desc",
    difficulty: "asc",
  });
  const [clickedFilter, setClickedFilter] = useState(null);
  const { data, isLoading, isError } = useCommentsByPostingId(postingId);
  const [sortedComments, setSortedComments] = useState([]);
  const userId = useUserStore((state) => state.userId);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleSortDirection = (filter) => {
    setSortDirection((prev) => ({
      ...prev,
      [filter]: prev[filter] === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    toggleSortDirection(filter);
    setClickedFilter(filter);
  };

  const getButtonClassNames = (filter) => {
    return selectedFilter === filter
      ? "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#2377EF] text-[#2377EF]"
      : "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#E1E1E1]";
  };

  useEffect(() => {
    if (data && data.comments) {
      let sortedData = [...data.comments];

      switch (selectedFilter) {
        case "latest":
          sortedData.sort((a, b) =>
            sortDirection.latest === "desc"
              ? new Date(b.comment.writeday) - new Date(a.comment.writeday)
              : new Date(a.comment.writeday) - new Date(b.comment.writeday)
          );
          break;
        case "best":
          sortedData.sort((a, b) =>
            sortDirection.best === "desc"
              ? b.comment.rate - a.comment.rate
              : a.comment.rate - b.comment.rate
          );
          break;
        case "difficulty":
          sortedData.sort((a, b) => {
            const diffOrder = { 상: 1, 중: 2, 하: 3 };
            return sortDirection.difficulty === "asc"
              ? diffOrder[a.comment.diff] - diffOrder[b.comment.diff]
              : diffOrder[b.comment.diff] - diffOrder[a.comment.diff];
          });
          break;
        default:
          break;
      }

      setSortedComments(sortedData);
    }
  }, [data, selectedFilter, sortDirection]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  const getArrowIcon = (filter) => {
    return sortDirection[filter] === "asc" ? "arrowup.png" : "downarrow.png";
  };

  const isCommentOwner = (comment) => {
    return comment.userId === userId;
  };

  return (
    <div className="self-stretch mt-[10px] mx-auto max-w-[342px]">
      <div className="flex flex-col justify-between items-center">
        {sortedComments.length > 0 && (
          <div
            className="my-5 cursor-pointer flex justify-start"
            onClick={handleClick}
          >
            관련성 높은 댓글
            <img
              src="/assets/downarrow.png"
              alt="아래방향"
              className="ml-2 flex justify-center items-center"
            />
          </div>
        )}

        <div className="mt-4">
          {sortedComments.map((comment) => (
            <div key={comment.comment.commentId}>
              <CommentList
                isOwner={isCommentOwner(comment.comment)}
                commentId={comment.commentId}
                comment={comment.comment}
                userProfile={comment.userProfile}
                userName={comment.userName}
              />
            </div>
          ))}
        </div>
        <div className="flex w-[390px] ">
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
                    {clickedFilter === "latest" && (
                      <img
                        src={`/assets/${getArrowIcon("latest")}`}
                        alt="화살표"
                        className="ml-1"
                      />
                    )}
                  </div>
                  <div
                    className={getButtonClassNames("difficulty")}
                    onClick={() => handleFilterClick("difficulty")}
                  >
                    난이도순
                    {clickedFilter === "difficulty" && (
                      <img
                        src={`/assets/${getArrowIcon("difficulty")}`}
                        alt="화살표"
                        className="ml-1"
                      />
                    )}
                  </div>
                  <div
                    className={getButtonClassNames("best")}
                    onClick={() => handleFilterClick("best")}
                  >
                    베스트순
                    {clickedFilter === "best" && (
                      <img
                        src={`/assets/${getArrowIcon("best")}`}
                        alt="화살표"
                        className="ml-1"
                      />
                    )}
                  </div>
                </div>
                <div
                  className="mt-6 w-[342px] h-[56px] cursor-pointer rounded-xl text-white flex justify-center items-center bg-[#2377EF]"
                  onClick={closeModal}
                >
                  조회
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FeedComment.propTypes = {
  postingId: PropTypes.string.isRequired,
};

export default FeedComment;

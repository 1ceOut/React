import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import useUserStore from "./../../../store/useUserStore";
import {
  useToggleFavorite,
  useCheckFavorite,
  useFavoritesCount,
  useCommentsByPostingId,
} from "../../../query/LikeCommentQuery";
import CommentList from "./../Common/CommentList";

const FeedMenu = ({ postingId }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [sortDirection, setSortDirection] = useState({
    latest: "desc",
    best: "desc",
    difficulty: "asc",
  });
  const [clickedFilter, setClickedFilter] = useState(null);
  const userId = useUserStore((state) => state.userId);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { data: favoriteData, refetch: refetchFavoriteStatus } =
    useCheckFavorite(postingId, userId);
  const { data: favoritesCount, refetch: refetchFavoritesCount } =
    useFavoritesCount(postingId);
  const { data: commentsByPostingId } = useCommentsByPostingId(postingId);

  const [localFavoriteStatus, setLocalFavoriteStatus] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOffsetY, setModalOffsetY] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (favoriteData !== undefined) {
      setLocalFavoriteStatus(favoriteData);
    }
  }, [favoriteData]);

  useEffect(() => {
    if (commentsByPostingId && commentsByPostingId.comments) {
      let sortedData = [...commentsByPostingId.comments];

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
  }, [commentsByPostingId, selectedFilter, sortDirection]);

  const handleToggleFavorite = async () => {
    setIsAnimating(true);

    setLocalFavoriteStatus((prevStatus) => !prevStatus);

    try {
      await toggleFavorite({ postingId, userId });

      refetchFavoriteStatus();
      refetchFavoritesCount();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);

      setLocalFavoriteStatus((prevStatus) => !prevStatus);
    } finally {
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  const commentsArray = commentsByPostingId ? commentsByPostingId.comments : [];
  const commentCount = commentsArray.length;

  const openCommentModal = () => {
    document.body.style.overflow = "hidden";
    setIsCommentModalOpen(true);
  };
  const closeCommentModal = () => {
    document.body.style.overflow = "auto";
    setIsCommentModalOpen(false);
  };

  const openFilterModal = () => {
    document.body.style.overflow = "hidden";
    setIsFilterModalOpen(true);
  };
  const closeFilterModal = () => {
    document.body.style.overflow = "auto";
    setIsFilterModalOpen(false);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setSortDirection((prev) => ({
      ...prev,
      [filter]: prev[filter] === "asc" ? "desc" : "asc",
    }));
    setClickedFilter(filter);
  };

  const getButtonClassNames = (filter) => {
    return selectedFilter === filter
      ? "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#2377EF] text-[#2377EF]"
      : "w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#E1E1E1]";
  };

  const getArrowIcon = (filter) => {
    return sortDirection[filter] === "asc" ? "arrowup.png" : "downarrow.png";
  };

  const isCommentOwner = (comment) => {
    return comment.userId === userId;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setModalOffsetY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaY = e.touches[0].clientY - modalOffsetY;
      if (modalRef.current) {
        modalRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const deltaY = e.changedTouches[0].clientY - modalOffsetY;

    if (modalRef.current && deltaY > 100) {
      closeCommentModal();
    } else {
      if (modalRef.current) {
        modalRef.current.style.transform = `translateY(0px)`;
      }
    }
  };

  return (
    <div className="self-stretch">
      <div className="flex flex-col font-medium text-[#767676]">
        <div className="flex items-center text-[12px] mb-[10px]">
          <div className="flex justify-center items-center mr-2">
            <div
              className={`flex justify-center items-center cursor-pointer mr-1 transition-transform duration-300 ${
                isAnimating ? "scale-75" : "scale-100"
              }`}
              onClick={handleToggleFavorite}
            >
              {localFavoriteStatus ? (
                <FavoriteIcon sx={{ color: red[500] }} className="mr-1" />
              ) : (
                <FavoriteBorderIcon className="mr-1" />
              )}
            </div>
            <div>{favoritesCount || 0}</div>
          </div>
          <div className="flex justify-center items-center">
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={openCommentModal}
            >
              <ChatBubbleOutlineIcon className="mr-1" />
            </div>
            <div>{commentCount}</div>
          </div>
        </div>
      </div>

      {isCommentModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-end z-50 bg-black bg-opacity-50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-[390px] h-full overflow-hidden"
            style={{ transition: "transform 0.3s ease" }}
          >
            <div className="flex flex-col justify-between items-center h-full">
              <div className="flex justify-between w-full px-4 py-3 bg-gray-100">
                <div className="w-[18px]"></div>
                <div className="text-lg font-semibold">댓글 목록</div>
                <button
                  onClick={closeCommentModal}
                  className="text-lg font-bold"
                >
                  &times;
                </button>
              </div>
              <div
                className="my-5 cursor-pointer flex bg-white z-10 w-full px-4"
                onClick={openFilterModal}
              >
                관련성 높은 댓글
                <img
                  src="/assets/downarrow.png"
                  alt="아래방향"
                  className="ml-2"
                />
              </div>
              <div className="flex-1 w-full px-4 overflow-y-auto">
                {sortedComments.length > 0 ? (
                  sortedComments.map((comment) => (
                    <div key={comment.comment.commentId}>
                      <CommentList
                        isOwner={isCommentOwner(comment.comment)}
                        commentId={comment.commentId}
                        comment={comment.comment}
                        userProfile={comment.userProfile}
                        userName={comment.userName}
                      />
                    </div>
                  ))
                ) : (
                  <div>댓글이 없습니다.</div>
                )}
              </div>
              <div className="flex justify-center items-center w-full mt-4">
                <button
                  onClick={closeCommentModal}
                  className="px-4 py-2 w-[342px] h-12 bg-gray-300 rounded-lg"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeFilterModal}
          ></div>

          <div className="fixed bottom-0 bg-white w-[390px] h-[258px] z-50">
            <div className="flex justify-between items-center mt-1 h-[46px]">
              <div className="text-lg font-bold">댓글 필터링</div>
              <button onClick={closeFilterModal} className="text-lg font-bold">
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
              onClick={closeFilterModal}
            >
              조회
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FeedMenu.propTypes = {
  postingId: PropTypes.string.isRequired,
};

export default FeedMenu;

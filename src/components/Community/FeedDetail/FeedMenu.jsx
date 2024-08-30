import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import CommentModal from "./../Common/CommentModal";
import useUserStore from "./../../../store/useUserStore";
import {
  useToggleFavorite,
  useCheckFavorite,
  useFavoritesCount,
  useCommentsByPostingId,
} from "../../../query/LikeCommentQuery";

const FeedMenu = ({ postingId, userName }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const userId = useUserStore((state) => state.userId);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { data: favoriteData, refetch: refetchFavoriteStatus } =
    useCheckFavorite(postingId, userId);
  const { data: favoritesCount, refetch: refetchFavoritesCount } =
    useFavoritesCount(postingId);

  const { data: commentsData } = useCommentsByPostingId(postingId);

  const [localFavoriteStatus, setLocalFavoriteStatus] = useState(false);

  useEffect(() => {
    if (favoriteData !== undefined) {
      setLocalFavoriteStatus(favoriteData);
    }
  }, [favoriteData]);

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

  const closeHidden = () => {
    setIsHidden(false);
  };

  const showHidden = () => {
    setIsHidden(true);
  };

  const commentCount = commentsData ? commentsData.length : 0;

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
              onClick={showHidden}
            >
              <ChatBubbleOutlineIcon className="mr-1" />
            </div>
            <div>{commentCount}</div>
          </div>
        </div>
      </div>
      {isHidden && (
        <CommentModal
          userName={userName}
          closeHidden={closeHidden}
          postingId={postingId}
        />
      )}
    </div>
  );
};

FeedMenu.propTypes = {
  postingId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default FeedMenu;

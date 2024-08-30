import { useState } from "react";
import { PropTypes } from "prop-types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import axios from "axios";
import CommentModal from "./../Common/CommentModal";

const FeedMenu = ({ option }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);

  const closeHidden = () => {
    setIsHidden(false);
  };

  const showHidden = () => {
    setIsHidden(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Save the image as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async () => {
    const data = {
      userId: option,
      heart: isFavorite,
      rate: rate.toString(),
      diff: "상중하",
      comment: comment,
      commentimg: selectedImage,
      postingId: new Date().getTime(),
    };

    try {
      const response = await axios.post("/api/likecomment", data);
      console.log(response.data);
      closeHidden();
    } catch (error) {
      console.error("Error saving comment:", error);
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
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: red[500] }} className="mr-1" />
              ) : (
                <FavoriteBorderIcon className="mr-1" />
              )}
            </div>
            <div>25</div>
          </div>
          <div className="flex justify-center items-center">
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={showHidden}
            >
              <ChatBubbleOutlineIcon className="mr-1" />
            </div>
            <div>2</div>
          </div>
        </div>
      </div>
      {isHidden && (
        <CommentModal
          closeHidden={closeHidden}
          option={option}
          rate={rate}
          setRate={setRate}
          comment={comment}
          setComment={setComment}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
          submitForm={submitForm}
        />
      )}
    </div>
  );
};

FeedMenu.propTypes = {
  option: PropTypes.string.isRequired,
};

export default FeedMenu;

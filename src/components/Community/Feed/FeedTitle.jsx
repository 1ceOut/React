import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FeedTitle = ({ title, imageUrl, _id }) => {
  const navigate = useNavigate();

  const detailNavigation = () => {
    navigate(`/community/feeddetail/${_id}`);
  };

  return (
    <div className="self-stretch cursor-pointer" onClick={detailNavigation}>
      <div>
        <img src={imageUrl} alt={title} className="w-[342px] h-auto" />
      </div>
      <div className="my-[14px] text-[15px] font-medium">{title}</div>
    </div>
  );
};

FeedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default FeedTitle;

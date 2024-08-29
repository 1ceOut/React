// FeedTitle.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FeedTitle = ({ title, imageUrl, _id }) => {
  const navigate = useNavigate();

  // 게시글의 ID를 전달하여 상세 페이지로 이동
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
  _id: PropTypes.string.isRequired, // _id를 Prop으로 받음
};

export default FeedTitle;

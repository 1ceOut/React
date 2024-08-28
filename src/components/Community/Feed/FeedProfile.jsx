import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FeedProfile = ({ writeday, userProfile, userName, userId }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/community/myfeed/${userId}`);
  };

  return (
    <div className="self-stretch mb-3">
      <div className="flex items-center justify-between w-[342px] h-[38px]">
        <div className="flex items-center">
          <div className="relative w-[30px] h-[30px] mr-2">
            <img
              src={userProfile || "/assets/cha.png"}
              alt={userName || "User Profile"}
              className="w-full h-full object-cover rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
          </div>
          <div>
            <div className="font-semibold text-sm">
              {userName || "Unknown User"}
            </div>
            <div className="font-normal text-xs">{writeday}</div>
          </div>
        </div>
        <div>...</div>
      </div>
    </div>
  );
};

FeedProfile.propTypes = {
  writeday: PropTypes.string.isRequired,
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FeedProfile;

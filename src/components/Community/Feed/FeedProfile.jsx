import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore.js";

const FeedProfile = ({ writeday, userProfile, userName, postingUserId, isSubscribed, onSubscribeToggle }) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();

  const handleProfileClick = () => {
    navigate(`/community/myfeed/${postingUserId}`);
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
        {userId !== postingUserId && (
          <button
            className={`px-4 py-1 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 ${
              isSubscribed ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white"
            }`}
            onClick={() => onSubscribeToggle(postingUserId)}
          >
            {isSubscribed ? "구독 중" : "구독"}
          </button>
        )}
      </div>
    </div>
  );
};

FeedProfile.propTypes = {
  writeday: PropTypes.string.isRequired,
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  postingUserId: PropTypes.string.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  onSubscribeToggle: PropTypes.func.isRequired,
};

export default FeedProfile;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FeedProfile = ({ writeday, userProfile, userName, userId }) => {
  const navigate = useNavigate();

  // 구독 상태를 관리하기 위한 useState 훅
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleProfileClick = () => {
    navigate(`/community/myfeed/${userId}`);
  };

  // 구독 버튼 클릭 핸들러
  const handleSubscribeClick = () => {
    setIsSubscribed((prevState) => !prevState); // 구독 상태를 토글
    if (!isSubscribed) {
      setModalMessage("구독 되었습니다!"); // 구독 시 메시지 설정
    } else {
      setModalMessage("구독 취소되었습니다!"); // 구독 취소 시 메시지 설정
    }
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
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
        {/* 구독 버튼 */}
        <button
          className={`px-4 py-1 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 ${
            isSubscribed ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white"
          }`}
          onClick={handleSubscribeClick}
        >
          {isSubscribed ? "구독 중" : "구독"}
        </button>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-64">
            <div className="text-center mb-4">{modalMessage}</div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full mx-auto block"
              onClick={handleCloseModal}
            >
              닫기
            </button>
          </div>
        </div>
      )}
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

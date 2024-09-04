import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAllUsers } from "../../../query/FeedQuery";
import useUserStore from "../../../store/useUserStore";
import HorizontalLine from "../../Common/HorizontalLine";
import {start} from "../../../query/LiveroomQuery.js"
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useAllUsers();
  const { userProfile, userName, userId, isLogin, broadcast, setBroadcast } = useUserStore(); // broadcast와 setBroadcast 추가
  const scrollContainerRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [profilesToDisplay, setProfilesToDisplay] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError) {
      const profiles = Array.isArray(users) ? users : [];

      const userProfileInfo = isLogin
        ? {
            userId,
            name: userName,
            photo: userProfile,
            writeday: new Date().toISOString(),
            broadcast: profiles.find((user) => user.userId === userId)?.broadcast || broadcast, // broadcast 상태를 가져오거나 기본값 사용
          }
        : null;

      const uniqueProfiles = new Map();
      if (userProfileInfo) {
        uniqueProfiles.set(userId, userProfileInfo);
      }
      profiles.forEach((profile) => {
        uniqueProfiles.set(profile.userId, profile);
      });

      const finalProfiles = Array.from(uniqueProfiles.values());
      const [loggedInProfile] = finalProfiles;

      // 방송 중인 사용자와 아닌 사용자를 분리하고 섞기
      const broadcastUsers = finalProfiles
        .filter((profile) => profile.broadcast && profile.userId !== userId); // 로그인한 사용자는 제외
      const nonBroadcastUsers = finalProfiles
        .filter((profile) => !profile.broadcast && profile.userId !== userId) // 로그인한 사용자는 제외
        .sort(() => Math.random() - 0.5); // 랜덤 섞기

      // 로그인한 사용자 -> 방송 중인 사용자 -> 나머지 사용자 순으로 정렬
      setProfilesToDisplay([loggedInProfile, ...broadcastUsers, ...nonBroadcastUsers]);
    }
  }, [isLoading, isError, users, isLogin, userId, userName, userProfile, broadcast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  const handleProfileClick = (userId) => {
    navigate(`/community/myfeed/${userId}`);
  };

  const handleLiveBroadcast = async () => {
    start(userId);
    navigate(`/liveroom/${userId}/${userName}`);

    //알림 전송 // 방송 시작
    await axios.post(`${import.meta.env.VITE_ALERT_IP}/startBroadcasting`, null, {
      params: {
        sender: userId,  // userId를 sender로 전송
      }
    });

    window.open(`/liveroom/${userId}/${userName}`,"_blank");
  }

  const handlePlusButtonClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsPopupOpen(true);
  };

  const handleOverlayClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="self-stretch max-w-[342px] mt-6 relative">
        <div className="flex items-center">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-5 scrollbar-hide"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {profilesToDisplay.length > 0 ? (
              profilesToDisplay.map((profile) => (
                <div key={profile.userId} className="flex flex-col items-center">
                  <div className="flex justify-end items-end relative">
                    <img
                      src={profile.photo || "/assets/cha.png"}
                      alt={`Profile of ${profile.name}`}
                      className={`w-20 h-20 rounded-full object-cover cursor-pointer ${
                        profile.broadcast ? "border-4 border-red-500" : ""
                      }`} // 방송 중인 프로필에만 빨간색 테두리
                      onClick={() => handleProfileClick(profile.userId)}
                    />
                    {profile.userId === userId && isLogin && (
                      <img
                        src="/assets/plusbutton.png"
                        alt="게시글 버튼"
                        className="cursor-pointer absolute bottom-0 right-0"
                        onClick={handlePlusButtonClick}
                      />
                    )}
                  </div>
                  <span className="text-sm font-semibold mt-2 w-20 flex justify-center items-center">
                    {profile.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold mt-2">No Profile</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[14px] mb-8">
        <HorizontalLine />
      </div>

      {isPopupOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 w-screen h-screen bg-black/10 z-[999]"
        ></div>
      )}

      {isPopupOpen && (
        <div
          className="absolute w-[86px] h-[84px] bg-white rounded-lg border border-white text-center flex flex-col justify-center items-center z-[1000]"
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-[60px] h-[22px] text-[13px] font-semibold mt-[11px] cursor-pointer"
            onClick={() => {
              navigate("/community/feedcreate");
            }}
          >
            게시글 쓰기
          </div>
          <div
            className="w-[83px] h-[22px] text-[13px] font-semibold mt-[12px] cursor-pointer"
            onClick={handleLiveBroadcast}
          >
            라이브 시작
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


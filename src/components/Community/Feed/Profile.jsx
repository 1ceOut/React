import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAllUsers } from "../../../query/FeedQuery";
import useUserStore from "../../../store/useUserStore";
import HorizontalLine from "../../Common/HorizontalLine";

const Profile = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useAllUsers();
  const { userProfile, userName, userId, isLogin } = useUserStore();
  const scrollContainerRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [profilesToDisplay, setProfilesToDisplay] = useState([]); // 랜덤화된 프로필 상태 추가

  useEffect(() => {
    if (!isLoading && !isError) {
      // 기본 프로필 목록
      const profiles = Array.isArray(users) ? users : [];

      const userProfileInfo = isLogin
        ? {
            userId,
            name: userName,
            photo: userProfile,
            writeday: new Date().toISOString(), // 로그인 시점을 최신으로 간주
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
      const [loggedInProfile, ...otherProfiles] = finalProfiles;
      const shuffledProfiles = otherProfiles.sort(() => Math.random() - 0.5); // 랜덤 섞기
      setProfilesToDisplay([loggedInProfile, ...shuffledProfiles]); // 상태에 저장
    }
  }, [isLoading, isError, users, isLogin, userId, userName, userProfile]); // 의존성 배열 설정

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  const handleProfileClick = (userId) => {
    navigate(`/community/myfeed/${userId}`);
  };

  const handlePlusButtonClick = (e) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX }); // 플러스 버튼 위치에 맞게 팝업 위치 설정
    setIsPopupOpen(true); // 팝업 열기
  };

  // 여백 클릭 시 팝업 닫기
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
                      className="w-20 h-20 rounded-full object-cover cursor-pointer"
                      onClick={() => handleProfileClick(profile.userId)}
                    />
                    {/* 플러스 버튼 */}
                    {profile.userId === userId && isLogin && (
                      <img
                        src="/assets/plusbutton.png"
                        alt="게시글 버튼"
                        className="cursor-pointer absolute bottom-0 right-0"
                        onClick={handlePlusButtonClick} // 팝업 위치와 열기 처리
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

      {/* 여백 클릭 시 팝업 닫기 위한 오버레이 */}
      {isPopupOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 w-screen h-screen bg-black/10 z-[999]" // 투명도 조정
        ></div>
      )}

      {/* 팝업 */}
      {isPopupOpen && (
        <div
          className="absolute w-[86px] h-[84px] bg-white rounded-lg border border-white text-center flex flex-col justify-center items-center z-[1000]"
          style={{ top: popupPosition.top, left: popupPosition.left }} // 팝업 위치 설정
          onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 시 닫히지 않도록 처리
        >
          <div
            className="w-[60px] h-[22px] text-[13px] font-semibold mt-[11px] cursor-pointer"
            onClick={() => {
              navigate("/community/feedcreate"); // "게시글 쓰기" 클릭 시 이동
            }}
          >
            게시글 쓰기
          </div>
          <div className="w-[83px] h-[22px] text-[13px] font-semibold mt-[12px] cursor-pointer">
            라이브 시작
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

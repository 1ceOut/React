import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAllUsers } from "../../../query/FeedQuery";
import useUserStore from "../../../store/useUserStore";
import HorizontalLine from "../../Common/HorizontalLine";

const Profile = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useAllUsers();
  const { userProfile, userName, userId, isLogin } = useUserStore();
  const scrollContainerRef = useRef(null);

  // 기본 프로필 목록
  const profiles = Array.isArray(users) ? [...users] : [];

  // 로그인한 사용자 프로필을 배열의 시작 부분으로 추가하고 중복 제거
  const uniqueProfiles = new Map();

  // 현재 로그인한 사용자의 프로필을 배열의 첫 번째로 추가
  if (isLogin) {
    uniqueProfiles.set(userId, {
      userId,
      name: userName,
      photo: userProfile,
      writeday: new Date().toISOString() // 로그인 시점을 최신으로 간주
    });
  }

  // 프로필 목록을 Map에 추가하여 중복 제거
  profiles.forEach(profile => {
    uniqueProfiles.set(profile.userId, profile);
    
  });

  // Map에서 값을 추출하여 배열로 변환하고, writeday를 기준으로 최신순 정렬
  const finalProfiles = Array.from(uniqueProfiles.values()).sort((a, b) => new Date(b.writeday) - new Date(a.writeday));

  const handleProfileClick = (userId) => {
    navigate(`/community/myfeed/${userId}`); // 클릭된 사용자의 피드로 이동
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <div>
      <div className="self-stretch max-w-[342px] mt-6 relative">
        <div className="flex items-center">
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-10 p-1 bg-white rounded-full shadow-md"
          >
            &#8249;
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-5 scrollbar-hide"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {finalProfiles.length > 0 ? (
              finalProfiles.map((profile, index) => (
                <div
                  key={profile.userId}
                  className="flex flex-col items-center"
                >
                  <div className="flex justify-end items-end relative">
                    <img
                      src={profile.photo || "/assets/cha.png"} // 기본 사진 설정
                      alt={`Profile of ${profile.name}`}
                      className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                      onClick={() => handleProfileClick(profile.userId)} // 클릭된 프로필의 userId 전달
                    />
                    {/* 플러스 버튼은 로그인한 사용자 프로필에만 표시 */}
                    {profile.userId === userId && isLogin && (
                      <img
                        src="/assets/plusbutton.png"
                        alt="게시글 버튼"
                        className="cursor-pointer absolute bottom-0 right-0"
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 버블링 방지
                          navigate("/community/feedcreate");
                        }}
                      />
                    )}
                  </div>
                  <span className="text-sm font-semibold mt-2 w-[80px] flex justify-center items-center">
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

          <button
            onClick={scrollRight}
            className="absolute right-2 z-10 p-1 bg-white rounded-full shadow-md"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div className="mt-[14px] mb-8">
        <HorizontalLine />
      </div>
    </div>
  );
};

export default Profile;

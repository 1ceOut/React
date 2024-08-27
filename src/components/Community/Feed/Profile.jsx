import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import HorizontalLine from "../../Common/HorizontalLine";

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, userName, isLogin, userId } = useUserStore(); // Add userId
  const scrollContainerRef = useRef(null);

  const handleProfileClick = (userId) => {
    navigate(`/community/myfeed/${userId}`); // Pass the userId in the navigation
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

  const profiles = isLogin
    ? [{ src: userProfile, name: userName, userId }]
    : [];

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
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <div
                  key={profile.userId}
                  className="flex flex-col items-center"
                >
                  <img
                    src={profile.src}
                    alt={`Profile of ${profile.name}`}
                    className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                    onClick={() => handleProfileClick(profile.userId)}
                  />
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

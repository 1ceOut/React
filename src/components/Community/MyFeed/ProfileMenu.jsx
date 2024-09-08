import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { usePostsByUser, subUserListFollowing, subUserListFollow } from "./../../../query/FeedQuery";
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ userProfile, userName, userId, isSubscribed, setIsSubscribed, followerCount, followingCount }) => {
  const { data: posts } = usePostsByUser(userId);
  const postCount = posts ? posts.length : 0;

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const navigate = useNavigate();

  const fetchCounts = async () => {
    try {
      const followerData = await subUserListFollow(userId);
      const followingData = await subUserListFollowing(userId);
      if (Array.isArray(followerData) && Array.isArray(followingData)) {
        setFollowers(followerData);
        setFollowings(followingData);
      } else {
        console.error("API에서 예상한 형식의 데이터를 반환하지 않았습니다.");
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (showFollowerModal || showFollowingModal) {
      fetchCounts();
    }
  }, [showFollowerModal, showFollowingModal]);

  const handleShowFollowerModal = () => setShowFollowerModal(true);
  const handleCloseFollowerModal = () => setShowFollowerModal(false);
  const handleShowFollowingModal = () => setShowFollowingModal(true);
  const handleCloseFollowingModal = () => setShowFollowingModal(false);

  const handleUserClick = (userId) => {
    navigate(`/community/myfeed/${userId}`);
    setShowFollowerModal(false);
    setShowFollowingModal(false);
  };

  return (
      <div className="self-stretch flex justify-between items-center mt-6 mb-8">
        <div className="self-stretch flex items-center justify-center">
          <div className="mr-10 flex flex-col items-center justify-center space-y-2">
            <img
                src={userProfile}
                alt="프로필 사진"
                className="w-20 h-20 rounded-full"
            />
            <div>{userName}</div>
          </div>
          <div className="flex justify-evenly items-center w-52">
            <div className="flex flex-col justify-center items-center w-[114px]">
              <div className="text-black font-semibold text-base">
                {postCount}
              </div>
              <div className="text-[#767676] font-semibold text-base">게시물</div>
            </div>
            <div className="flex flex-col justify-center items-center w-[114px]" onClick={handleShowFollowingModal}>
              <div className="text-black font-semibold text-base">
                {followingCount}
              </div>
              <div className="text-[#767676] font-semibold text-base">팔로워</div>
            </div>
            <div className="flex flex-col justify-center items-center w-[114px]" onClick={handleShowFollowerModal}>
              <div className="text-black font-semibold text-base">
                {followerCount}
              </div>
              <div className="text-[#767676] font-semibold text-base">팔로잉</div>
            </div>
          </div>
        </div>
        {showFollowerModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-64">
                <div className="text-lg font-semibold mb-2">팔로워 목록</div>
                <div>
                  {followers.length === 0 ? (
                      <div className="text-center">팔로워가 없습니다.</div>
                  ) : (
                      followers.map((follower) => (
                          <div key={follower.id} className="flex items-center mb-2 cursor-pointer" onClick={() => handleUserClick(follower.id)}>
                            <img src={follower.photo} alt={follower.name} className="w-8 h-8 rounded-full mr-2" />
                            <div>{follower.name}</div>
                          </div>
                      ))
                  )}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full mx-auto block mt-2" onClick={handleCloseFollowerModal}>
                  닫기
                </button>
              </div>
            </div>
        )}
        {showFollowingModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-64">
                <div className="text-lg font-semibold mb-2">팔로잉 목록</div>
                <div>
                  {followings.length === 0 ? (
                      <div className="text-center">팔로잉이 없습니다.</div>
                  ) : (
                      followings.map((following) => (
                          <div key={following.id} className="flex items-center mb-2 cursor-pointer" onClick={() => handleUserClick(following.id)}>
                            <img src={following.photo} alt={following.name} className="w-8 h-8 rounded-full mr-2" />
                            <div>{following.name}</div>
                          </div>
                      ))
                  )}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full mx-auto block mt-2" onClick={handleCloseFollowingModal}>
                  닫기
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

ProfileMenu.propTypes = {
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  setIsSubscribed: PropTypes.func.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
};

export default ProfileMenu;

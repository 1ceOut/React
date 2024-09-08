import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { usePostsByUser, subUserListFollowing, subUserListFollow } from "./../../../query/FeedQuery";
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ userProfile, userName, userId }) => {
  const { data: posts } = usePostsByUser(userId);
  const postCount = posts ? posts.length : 0;

  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const navigate = useNavigate();
  console.log("fsdafdasfassf",followers0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const followerData = await subUserListFollow(userId);
        const followingData = await subUserListFollowing(userId);
        if (Array.isArray(followerData) && Array.isArray(followingData)) {
          setFollowers(followerData);
          setFollowings(followingData);
          setFollowerCount(followerData.length);
          setFollowingCount(followingData.length);
        } else {
          console.error("API에서 예상한 형식의 데이터를 반환하지 않았습니다.");
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchCounts();
  }, [userId]);


  const handleShowFollowerModal = () => setShowFollowerModal(true);
  const handleCloseFollowerModal = () => setShowFollowerModal(false);
  const handleShowFollowingModal = () => setShowFollowingModal(true);
  const handleCloseFollowingModal = () => setShowFollowingModal(false);

  const handleUserClick = (userId) => {
    // Navigate to the user's page
    navigate(`/community/myfeed/${userId}`);
    // Close both modals
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
            <div className="flex flex-col justify-center items-center w-[114px] cursor-pointer" onClick={handleShowFollowingModal}>
              <div className="text-black font-semibold text-base">
                {followingCount}
              </div>
              <div className="text-[#767676] font-semibold text-base">팔로워</div>
            </div>
            <div className="flex flex-col justify-center items-center w-[114px] cursor-pointer"  onClick={handleShowFollowerModal}>
              <div className="text-black font-semibold text-base">
                {followerCount}
              </div>
              <div className="text-[#767676] font-semibold text-base">팔로잉</div>
            </div>
          </div>
        </div>

        {/* 팔로워 모달 */}
        {showFollowerModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-96 max-w-md max-h-[644px] overflow-y-scroll ">
                <h2 className="text-xl font-semibold mb-4">팔로잉</h2>
                <ul>
                  {followers.length > 0 ? (
                      followers.map((follower) => (
                          <li
                              key={follower.id}
                              className="flex items-center border-b py-2 cursor-pointer"
                              onClick={() => handleUserClick(follower.id)}
                          >
                            <img
                                src={follower.photo}
                                alt={`${follower.name}의 프로필 사진`}
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>{follower.name}</div>
                          </li>
                      ))
                  ) : (
                      <div>팔로잉이 없습니다.</div>
                  )}
                </ul>
                <button className="mt-4 text-blue-500" onClick={handleCloseFollowerModal}>닫기</button>
              </div>
            </div>
        )}

        {/* 팔로잉 모달 */}
        {showFollowingModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-96 max-w-md max-w-md max-h-[644px] overflow-y-scroll ">
                <h2 className="text-xl font-semibold mb-4">팔로워</h2>
                <ul>
                  {followings.length > 0 ? (
                      followings.map((following) => (
                          <li
                              key={following.id}
                              className="flex items-center border-b py-2 cursor-pointer"
                              onClick={() => handleUserClick(following.id)}
                          >
                            <img
                                src={following.photo}

                                alt={`${following.name}의 프로필 사진`}
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>{following.name}</div>
                          </li>
                      ))
                  ) : (
                      <div>팔로워가 없습니다.</div>
                  )}
                </ul>
                <button className="mt-4 text-blue-500" onClick={handleCloseFollowingModal}>닫기</button>
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
};

export default ProfileMenu;

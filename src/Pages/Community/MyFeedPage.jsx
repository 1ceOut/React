import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuNavigate from "./../../components/Common/MenuNavigate";
import ProfileMenu from "./../../components/Community/MyFeed/ProfileMenu";
import FeedContent from "./../../components/Community/MyFeed/FeedContent";
import { useAllUsers, subUserListFollow, usercreatesub, userdelete, subUserListFollowing } from "../../query/FeedQuery";
import axios from "axios";
import useUserStore from "../../store/useUserStore.js";

const MyFeedPage = () => {
  const { userId: paramUserId } = useParams();
  const { userId } = useUserStore();
  const { data: users, isLoading, isError } = useAllUsers();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!paramUserId) return;

    const fetchSubscriptionStatus = async () => {
      try {
        const subUser = await subUserListFollow(userId);
        if (Array.isArray(subUser)) {
          const isSubscribedUser = subUser.some((user) => user.id === paramUserId);
          setIsSubscribed(isSubscribedUser);
          setFollowerCount(subUser.length);
        }
      } catch (error) {
        console.error("Subscription fetch error:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [userId, paramUserId]);

  useEffect(() => {
    if (!paramUserId) return;

    const fetchCounts = async () => {
      try {
        const followerData = await subUserListFollow(paramUserId);
        const followingData = await subUserListFollowing(paramUserId);
        if (Array.isArray(followerData) && Array.isArray(followingData)) {
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
  }, [paramUserId]);

  const handleSubscribeClick = async () => {
    try {
      if (!paramUserId) return;
  
      if (!isSubscribed) {
        // 구독을 추가하는 경우에만 알림을 전송
        await usercreatesub(paramUserId, userId);
        setModalMessage("구독 되었습니다!");
  
        try {
          // 구독 알림 전송
          await axios.post(`${import.meta.env.VITE_ALERT_IP}/subscribeUser`, {
            sender: encodeURIComponent(userId),
            receiver: encodeURIComponent(paramUserId),
            memo: "",
          });
        } catch (error) {
          console.error("알림 전송 중 오류 발생:", error);
          alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
        }
      } else {
        // 구독을 취소하는 경우에는 알림 전송을 생략
        await userdelete(paramUserId, userId);
        setModalMessage("구독 취소되었습니다!");
      }
  
      setIsSubscribed((prevState) => !prevState);
      setIsModalOpen(true);
  
      // 구독 상태 변경 후 사용자 수 업데이트
      const followerData = await subUserListFollow(paramUserId);
      const followingData = await subUserListFollowing(paramUserId);
      setFollowerCount(followerData.length);
      setFollowingCount(followingData.length);
    } catch (error) {
      console.error("구독 처리 중 오류 발생:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  if (!users || !Array.isArray(users)) return <div>User data is not available</div>;

  const user = users.find((user) => user.userId === paramUserId);
  if (!user) return <div>User not found</div>;

  return (
      <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
        <MenuNavigate option={`${user.name}님 게시판`} />
        <ProfileMenu
            userProfile={user.photo}
            userName={user.name}
            userId={user.userId}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
            followerCount={followerCount}
            followingCount={followingCount}
        />
        {userId && userId !== user.userId && (
            <button
                className={`px-32 py-1 mb-3 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                    isSubscribed ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white"
                }`}
                onClick={handleSubscribeClick}
            >
              {isSubscribed ? "구독 중" : "구독"}
            </button>
        )}
        <FeedContent userId={user.userId} />
        {isModalOpen && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
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
      </main>
  );
};

export default MyFeedPage;

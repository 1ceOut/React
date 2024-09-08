import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuNavigate from "./../../components/Common/MenuNavigate";
import ProfileMenu from "./../../components/Community/MyFeed/ProfileMenu";
import FeedContent from "./../../components/Community/MyFeed/FeedContent";
import { useAllUsers, subUserListFollow, usercreatesub, userdelete } from "../../query/FeedQuery";
import axios from "axios";
import useUserStore from "../../store/useUserStore.js";

const MyFeedPage = () => {
  const { userId: paramUserId } = useParams(); // URL 파라미터에서 userId를 가져옵니다.
  const { userId } = useUserStore(); // 현재 로그인한 사용자의 ID를 가져옵니다.
  const { data: users, isLoading, isError } = useAllUsers();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0); // 팔로워 수 상태 추가
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로딩 중일 때 또는 에러 발생 시 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  // users가 정의되어 있고 배열인지 확인
  if (!users || !Array.isArray(users)) {
    return <div>User data is not available</div>;
  }

  // URL 파라미터에 해당하는 유저 찾기
  const user = users.find((user) => user.userId === paramUserId);

  if (!user) {
    return <div>User not found</div>;
  }

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const subUser = await subUserListFollow(userId);
        if (Array.isArray(subUser)) {
          const isSubscribedUser = subUser.some((user) => user.id === paramUserId);
          setIsSubscribed(isSubscribedUser);
          setFollowerCount(subUser.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubscriptionStatus();
  }, [userId, paramUserId]);

  // 구독 버튼 클릭 핸들러
  const handleSubscribeClick = async () => {
    setIsSubscribed((prevState) => !prevState);
    if (!isSubscribed) {
      await usercreatesub(paramUserId, userId);
      setModalMessage("구독 되었습니다!");

      //알림 전송 //구독
      try {
        await axios.post(`${import.meta.env.VITE_ALERT_IP}/subscribeUser`, {
          sender: encodeURIComponent(userId), // userId를 sender로 전송
          receiver: encodeURIComponent(paramUserId),
          memo: "",
        });
        //console.log("알림이 성공적으로 전송되었습니다.");
      } catch (error) {
        //console.error("알림 전송 중 오류 발생:", error);
        //alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
      }
    } else {
      await userdelete(paramUserId, userId);
      setModalMessage("구독 취소되었습니다!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate option={`${user.name}님 게시판`} />

      <ProfileMenu
        userProfile={user.photo}
        userName={user.name}
        userId={user.userId}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
      />

      {/* 구독 버튼 */}
      {userId !== user.userId && (
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

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-64">
            <div className="text-center mb-4">{modalMessage}</div>
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

        {/* 모달 창 */}
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

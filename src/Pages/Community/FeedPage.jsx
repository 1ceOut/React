import React, { useEffect, useState } from "react";
import { usePostsWithUserDetails } from "../../query/FeedQuery";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from "../../components/Community/Feed/FeedTitle";
import FeedProfile from "../../components/Community/Feed/FeedProfile";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import BarNavigate from "../../components/Common/BarNavigate";
import {
  subUserListFollow,
  usercreatesub,
  userdelete,
} from "../../query/FeedQuery";
import useUserStore from "../../store/useUserStore.js";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const transformImageUrl = (url) => {
  const lastSegment = url.split("/").pop();
  return `https://jz6trd593769.edge.naverncp.com/pqoNDkSvH8/communitythumbnail/${lastSegment}?type=f&w=342&h=180&ttype=jpg`;
};

const FeedPage = () => {
  const { userId } = useUserStore();
  const [subscriptions, setSubscriptions] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedSubscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || {};
    setSubscriptions(storedSubscriptions);

    const fetchSubscriptionStatus = async () => {
      try {
        const subUser = await subUserListFollow(userId);
        if (Array.isArray(subUser)) {
          const subStatus = subUser.reduce((acc, user) => {
            acc[user.id] = true;
            return acc;
          }, {});
          setSubscriptions(subStatus);
          localStorage.setItem("subscriptions", JSON.stringify(subStatus));
        } else {
          console.error("구독 목록이 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("구독 상태를 가져오는 중 오류 발생:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [userId]);

  const handleSubscribeToggle = async (postingUserId) => {
    const isSubscribed = subscriptions[postingUserId] || false;
    if (isSubscribed) {
      await userdelete(postingUserId, userId);
      setModalMessage("구독 취소되었습니다!");
    } else {
      await usercreatesub(postingUserId, userId);
      setModalMessage("구독 되었습니다!");
    }

    const updatedSubscriptions = {
      ...subscriptions,
      [postingUserId]: !isSubscribed,
    };

    setSubscriptions(updatedSubscriptions);
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));

    // 알림 전송
    try {
      await axios.post(`${import.meta.env.VITE_ALERT_IP}/subscribeUser`, {
        sender: encodeURIComponent(userId),
        receiver: encodeURIComponent(postingUserId),
        memo: "",
      });
    } catch (error) {
      console.error("알림 전송 중 오류 발생:", error);
    }

    setIsModalOpen(true);
  };

  const {
    data: postsWithUserDetails,
    isLoading,
    isError,
  } = usePostsWithUserDetails();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  const safePosts = Array.isArray(postsWithUserDetails)
    ? postsWithUserDetails
    : [];

  const filteredPosts = safePosts.filter(({ posting }) => {
    const tags = posting.tags.split(" ");
    return tags.some((tag) => tag.includes(searchQuery.trim()));
  });

  const latestPostsMap = new Map();

  filteredPosts.forEach(({ posting }) => {
    if (
      !latestPostsMap.has(posting.userId) ||
      new Date(posting.writeday) >
        new Date(latestPostsMap.get(posting.userId).writeday)
    ) {
      latestPostsMap.set(posting.userId, {
        ...posting,
        userProfile: posting.userProfile,
        userName: posting.userName,
      });
    }
  });

  const sortedProfiles = Array.from(latestPostsMap.values()).sort(
    (a, b) => new Date(b.writeday) - new Date(a.writeday)
  );

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.posting.writeday) - new Date(a.posting.writeday)
  );

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-20 mx-auto w-full max-w-[390px] h-auto">
      <MenuNavigate option="커뮤니티" previousPage="/" />
      <div className="border border-black w-full p-2 rounded flex">
        <div className="flex justify-center items-center">
          <FaSearch />
        </div>
        <input
          type="text"
          value={searchQuery}
          placeholder="검색"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none ml-2"
        />
      </div>
      <Profile profiles={sortedProfiles} />
      {sortedPosts.length > 0 ? (
        sortedPosts.map(({ posting, userProfile, userName }) => (
          <div key={posting.posting_id} className="mb-6">
            <FeedProfile
              userName={userName}
              writeday={formatDate(posting.writeday)}
              userProfile={userProfile}
              postingUserId={posting.userId}
              isSubscribed={subscriptions[posting.userId] || false}
              onSubscribeToggle={handleSubscribeToggle}
            />
            <FeedTitle
              _id={posting.postingId}
              title={posting.title}
              imageUrl={transformImageUrl(posting.thumbnail)}
              userId={posting.userId}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500"></div>
            <FeedMenu postingId={posting.postingId} userName={userName} />
          </div>
        ))
      ) : (
        <div>검색된 게시글이 없습니다.</div>
      )}
      <BarNavigate
        shoppingsrc="/assets/shopping.png"
        homesrc="/assets/home.png"
        searchsrc="/assets/search.png"
      />
      {/* 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-64">
            <div className="text-center mb-4">{modalMessage}</div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full mx-auto block"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default FeedPage;

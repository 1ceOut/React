import React from "react";
import { usePostsWithUserDetails } from "../../query/FeedQuery";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from "../../components/Community/Feed/FeedTitle";
import FeedProfile from "../../components/Community/Feed/FeedProfile";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";

// 날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 헬퍼 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const FeedPage = () => {
  const { data: postsWithUserDetails, isLoading, isError } = usePostsWithUserDetails();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  // postsWithUserDetails가 배열인지 확인
  const safePosts = Array.isArray(postsWithUserDetails) ? postsWithUserDetails : [];

  // 각 사용자 ID에 대해 최신 게시물을 저장할 맵 생성
  const latestPostsMap = new Map();

  safePosts.forEach(({ posting }) => {
    if (!latestPostsMap.has(posting.userId) || new Date(posting.writeday) > new Date(latestPostsMap.get(posting.userId).writeday)) {
      latestPostsMap.set(posting.userId, {
        ...posting,
        userProfile: posting.userProfile,
        userName: posting.userName
      });
    }
  });

  // 맵을 배열로 변환하고 writeday 기준으로 내림차순 정렬
  const sortedProfiles = Array.from(latestPostsMap.values()).sort((a, b) => new Date(b.writeday) - new Date(a.writeday));

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate />
      <Profile profiles={sortedProfiles} /> {/* 최신 프로필 데이터 전달 */}
      {safePosts.length > 0 ? (
        safePosts.map(({ posting, userProfile, userName }) => (
          <div key={posting.posting_id} className="mb-6">
            <FeedProfile
              userName={userName}
              writeday={formatDate(posting.writeday)} // 날짜 포맷팅 적용
              userProfile={userProfile}
              userId={posting.userId}
            />

            <FeedTitle
              _id={posting.postingId}
              title={posting.title}
              imageUrl={posting.thumbnail}
              userId={posting.userId}
            />

            <div className="flex justify-between mt-2 text-sm text-gray-500"></div>
            <FeedMenu />
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </main>
  );
};

export default FeedPage;
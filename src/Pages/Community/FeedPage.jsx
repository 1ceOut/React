import React, { useEffect } from "react";
import { usePostsWithUserDetails } from "../../query/FeedQuery";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from "../../components/Community/Feed/FeedTitle";
import FeedProfile from "../../components/Community/Feed/FeedProfile";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import BarNavigate from "../../components/Common/BarNavigate";

// 날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 헬퍼 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const FeedPage = () => {
  // 페이지가 마운트될 때 스크롤을 맨 위로 이동시키기
  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 위치를 맨 위로 설정
  }, []); // 빈 배열을 종속성으로 전달하여 컴포넌트가 처음 마운트될 때만 실행

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

  // postsWithUserDetails가 배열인지 확인
  const safePosts = Array.isArray(postsWithUserDetails)
    ? postsWithUserDetails
    : [];

  // 각 사용자 ID에 대해 최신 게시물을 저장할 맵 생성
  const latestPostsMap = new Map();

  safePosts.forEach(({ posting }) => {
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

  // 맵을 배열로 변환하고 writeday 기준으로 내림차순 정렬
  const sortedProfiles = Array.from(latestPostsMap.values()).sort(
    (a, b) => new Date(b.writeday) - new Date(a.writeday)
  );

  // 모든 게시물을 최신순으로 정렬
  const sortedPosts = safePosts.sort(
    (a, b) => new Date(b.posting.writeday) - new Date(a.posting.writeday)
  );

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-auto">
      <MenuNavigate option="커뮤니티" previousPage="/" />
      <Profile profiles={sortedProfiles} /> {/* 최신 프로필 데이터 전달 */}
      {sortedPosts.length > 0 ? (
        sortedPosts.map(({ posting, userProfile, userName }) => (
          <div key={posting.posting_id} className="mb-6">
            <FeedProfile
              userName={userName}
              writeday={formatDate(posting.writeday)} // 날짜 포맷팅 적용
              userProfile={userProfile}
              postingUserId={posting.userId}
            />

            <FeedTitle
              _id={posting.postingId}
              title={posting.title}
              imageUrl={posting.thumbnail}
              userId={posting.userId}
            />

            <div className="flex justify-between mt-2 text-sm text-gray-500"></div>
            <FeedMenu postingId={posting.postingId} userName={userName} />
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
      <BarNavigate
        shoppingsrc="/assets/shopping.png"
        homesrc="/assets/home.png"
        searchsrc="/assets/search.png"
      />
    </main>
  );
};

export default FeedPage;

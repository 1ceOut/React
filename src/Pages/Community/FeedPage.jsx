import React from "react";
import { usePostsWithUserDetails } from "../../query/FeedQuery";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from "../../components/Community/Feed/FeedTitle";
import FeedProfile from "../../components/Community/Feed/FeedProfile";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";

const FeedPage = () => {
  const { data: postsWithUserDetails, isLoading, isError } = usePostsWithUserDetails();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  // Ensure postsWithUserDetails is an array
  const safePosts = Array.isArray(postsWithUserDetails) ? postsWithUserDetails : [];

  // Create a map to store the latest writeday for each userId
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

  // Convert the map to an array and sort by writeday in descending order
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
              writeday={posting.writeday}
              userProfile={userProfile}
              userId={posting.userId}
            />

            <FeedTitle
              _id={posting.posting_id}
              title={posting.title}
              imageUrl={posting.thumbnail}
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

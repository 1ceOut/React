import { useParams } from "react-router-dom";
import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";
import MenuNavigate from "../../components/Community/FeedDetail/MenuNavigate";
import { useDetailPost } from "../../query/FeedQuery"; // useAllUsers는 필요하지 않음
import useUserStore from "../../store/useUserStore"; // zustand 스토어 훅 import

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 9); // 한국 시간 기준으로 9시간 빼기

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const timeIntervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];

  for (const interval of timeIntervals) {
    const timePassed = Math.floor(diffInSeconds / interval.seconds);
    if (timePassed >= 1) {
      return `${timePassed} ${interval.label} 전`;
    }
  }

  return "방금 전";
};

const FeedDetailPage = () => {
  const { postingId } = useParams();
  const { data: postWithUser, isLoading, isError } = useDetailPost(postingId);
  const { userId: currentUserId } = useUserStore((state) => ({
    userId: state.userId,
  })); // 현재 사용자 ID 가져오기

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const post = postWithUser?.posting;
  const userName = postWithUser?.userName || "Unknown User";
  const userProfile = postWithUser?.userProfile || "default-profile-url";

  if (!post) {
    console.error(`Post with ID ${postingId} not found`);
    return <div>Post not found</div>;
  }

  // 게시물 작성자와 현재 사용자 비교
  const isOwner = post.userId === currentUserId;

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-auto">
      <MenuNavigate
        userName={userName}
        userProfile={userProfile}
        writeDay={getRelativeTime(post.writeday)}
        postingId={postingId}
        isOwner={isOwner} // 게시물 소유 여부 전달
      />
      <FeedTitle title={post.title} thumbnail={post.thumbnail} />
      <FeedRecipe steps={post.steps} contents={post.contents} />
      <FeedTags tags={post.tags} />

      <FeedMenu postingId={post.postingId} userName={userName} />
      <FeedComment postingId={post.postingId} />
    </main>
  );
};

export default FeedDetailPage;

import { useParams } from "react-router-dom";
import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";
import MenuNavigate from "../../components/Community/FeedDetail/MenuNavigate";
import { useDetailPost } from "../../query/FeedQuery";
import useUserStore from "../../store/useUserStore";
import { formatDistanceToNow, addHours } from "date-fns";
import { ko } from "date-fns/locale";

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const dateInKST = addHours(date, 9); // 한국 시간(KST)으로 변환

  return formatDistanceToNow(dateInKST, { addSuffix: true, locale: ko }); // 몇 분 전, 몇 시간 전 등을 표시
};

const FeedDetailPage = () => {
  const { postingId } = useParams();
  const { data: postWithUser, isLoading, isError } = useDetailPost(postingId);
  const { userId: currentUserId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const post = postWithUser?.posting;
  const userName = postWithUser?.userName || "Unknown User";
  const userProfile = postWithUser?.userProfile || "default-profile-url";

  if (!post) {
    console.error(`Post with ID ${postingId} not found`);
    return <div>Post not found</div>;
  }

  const isOwner = post.userId === currentUserId;

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-auto">
      <MenuNavigate
        userName={userName}
        userProfile={userProfile}
        writeDay={getRelativeTime(post.writeday)}
        postingId={postingId}
        isOwner={isOwner}
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

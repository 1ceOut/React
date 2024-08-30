import { useParams } from "react-router-dom";
import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";
import MenuNavigate from "../../components/Community/FeedDetail/MenuNavigate";
import { useDetailPost } from "../../query/FeedQuery"; // useAllUsers는 필요하지 않음
import useUserStore from '../../store/useUserStore'; // zustand 스토어 훅 import

const getRelativeTime = (dateString) => {
  // 기존 코드 유지
};

const FeedDetailPage = () => {
  const { postingId } = useParams();
  const { data: postWithUser, isLoading, isError } = useDetailPost(postingId);
  const { userId: currentUserId } = useUserStore(state => ({ userId: state.userId })); // 현재 사용자 ID 가져오기

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
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate
        userName={userName}
        userProfile={userProfile}
        writeDay={getRelativeTime(post.writeday)}
        postingId={postingId}
        isOwner={isOwner} // 게시물 소유 여부 전달
      />
      <FeedRecipe
        steps={post.steps}
        contents={post.contents}
      />
      <FeedTags 
        tags={post.tags}
      />
      <FeedTitle
        title={post.title}
        thumbnail={post.thumbnail}
      />
      <FeedMenu />
      <FeedComment />
    </main>
  );
};

export default FeedDetailPage;

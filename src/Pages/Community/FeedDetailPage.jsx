import { useParams } from "react-router-dom";
import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";
import MenuNavigate from "../../components/Community/FeedDetail/MenuNavigate";
import { useDetailPost } from "../../query/FeedQuery";

const getRelativeTime = (dateString) => {
  const now = new Date(); // 현재 로컬 시간
  const utcDate = new Date(dateString); // UTC 시간으로 변환

  // 9시간을 밀리초로 변환
  const offsetMilliseconds = 9 * 60 * 60 * 1000;

  // 서울 시간으로 변환
  const seoulDate = new Date(utcDate.getTime() + offsetMilliseconds);

  // 현재 시간과 서울 시간의 차이 계산 (밀리초 단위)
  const differenceInMilliseconds = now - seoulDate;

  // 밀리초를 초, 분, 시간, 일 단위로 변환
  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if (days > 0) {
    return rtf.format(-days, 'day');
  } else if (hours > 0) {
    return rtf.format(-hours, 'hour');
  } else if (minutes > 0) {
    return rtf.format(-minutes, 'minute');
  } else {
    return rtf.format(-seconds, 'second');
  }
};

const FeedDetailPage = () => {
  const { postingId } = useParams(); // URL 파라미터에서 postingId를 가져옵니다.
  const { data: postWithUser, isLoading, isError } = useDetailPost(postingId); // 특정 게시물과 사용자 정보를 가져옵니다.

  // 로딩 상태와 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // 게시물과 사용자 정보 확인
  const post = postWithUser?.posting;
  const userName = postWithUser?.userName || "Unknown User";
  const userProfile = postWithUser?.userProfile || "default-profile-url";

  // 게시물 정보가 없는 경우 처리
  if (!post) {
    console.error(`Post with ID ${postingId} not found`);
    return <div>Post not found</div>;
  }

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate
        userName={userName} // 이름 전달
        userProfile={userProfile} // 프로필 사진 전달
        writeDay={getRelativeTime(post.writeday)} // 작성 시간 전달
        postingId={postingId}
        
      />
      <FeedRecipe
        steps={post.steps}
        contents={post.contents}
      />
      <FeedTags 
        tags={post.tags}
      />
      <FeedTitle
        title={post.title} // title을 전달합니다.
        thumbnail={post.thumbnail} // thumbnail을 전달합니다.
      />
      <FeedMenu /> {/* 필요한 prop들을 전달하세요 */}
      <FeedComment />
    </main>
  );
};

export default FeedDetailPage;

import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";
import { useAllUsers } from "../../query/FeedQuery";
import MenuNavigate from "./../../components/Community/FeedDetail/MenuNavigate";

const FeedDetailPage = () => {
  const { data: post } = useAllUsers();

  const userName = post?.userName || "Unknown User";
  const userProfile = post?.userProfile || "default-profile-url";

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate
        userName={userName}
        userProfile={userProfile}
        writeDay="1시간 전"
      />
      <FeedRecipe />
      <FeedTags />
      <FeedTitle />
      <FeedMenu option={userName} />
      <FeedComment />
    </main>
  );
};

export default FeedDetailPage;

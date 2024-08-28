import MenuNavigate from "./../../components/Common/MenuNavigate";
import ProfileMenu from "./../../components/Community/MyFeed/ProfileMenu";
import FeedContent from "./../../components/Community/MyFeed/FeedContent";
import useUserStore from "../../store/useUserStore";

const MyFeedPage = () => {
  const { userProfile, userName, userId } = useUserStore();

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate />
      <ProfileMenu
        userProfile={userProfile}
        userName={userName}
        userId={userId}
      />
      <FeedContent userId={userId} />
    </main>
  );
};

export default MyFeedPage;

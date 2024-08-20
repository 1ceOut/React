
import MenuNavigate from './../../components/Common/MenuNavigate';
import ProfileMenu from './../../components/Community/MyFeed/ProfileMenu';
import FeedContent from './../../components/Community/MyFeed/FeedContent';

const MyFeedPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <ProfileMenu/>
            <FeedContent/>
        </main>
    );
};

export default MyFeedPage;
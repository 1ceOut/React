import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import Feed from './../../components/Community/Feed/Feed';


const FeedPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <Profile/>
            <HorizontalLine/>
            <Feed/>
        </main>
    );
};

export default FeedPage;
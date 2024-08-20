import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import FeedContent from "../../components/Community/Feed/FeedTitle";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from './../../components/Community/Feed/FeedTitle';


const FeedPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <Profile/>
            <HorizontalLine/>
            <FeedTitle/>
            <FeedContent/>
            <FeedMenu/>
        </main>
    );
};

export default FeedPage;
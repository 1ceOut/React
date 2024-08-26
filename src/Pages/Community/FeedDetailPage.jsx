import MenuNavigate from "../../components/Common/MenuNavigate";
import FeedComment from "../../components/Community/FeedDetail/FeedComment";
import FeedMenu from "../../components/Community/FeedDetail/FeedMenu";
import FeedRecipe from "../../components/Community/FeedDetail/FeedRecipe";
import FeedTags from "../../components/Community/FeedDetail/FeedTags";
import FeedTitle from "../../components/Community/FeedDetail/FeedTitle";


const FeedDetailPage = () => {
    // const { data: posts, isLoading, isError } = useDetailPost();
    
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <FeedRecipe/>
            <FeedTags/>
            <FeedTitle/>
            <FeedMenu option="이장우"/>
            <FeedComment/>
        </main>
    );
};

export default FeedDetailPage;
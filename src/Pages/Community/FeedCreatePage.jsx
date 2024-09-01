import MenuNavigate from "../../components/Common/MenuNavigate";
import CreateFeed from "../../components/Community/FeedCreate/CreateFeed";



const FeedCreatePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-auto">
            <MenuNavigate option="게시글 만들기"/>
            <CreateFeed/>
        </main>
    );
};

export default FeedCreatePage;
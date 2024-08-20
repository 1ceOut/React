import MenuNavigate from "../../components/Common/MenuNavigate";
import CreateFeed from "../../components/Community/FeedCreate/CreateFeed";



const FeedCreatePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <CreateFeed/>
        </main>
    );
};

export default FeedCreatePage;
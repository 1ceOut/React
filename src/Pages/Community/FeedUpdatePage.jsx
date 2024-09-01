import MenuNavigate from "../../components/Common/MenuNavigate";
import UpdateFeed from "../../components/Community/FeedCreate/UpdateFeed";



const FeedUpdatePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <UpdateFeed/>
        </main>
    );
};

export default FeedUpdatePage;
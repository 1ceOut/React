import Notification from "../../components/Home/Notification.jsx";
import Refrigerator from "../../components/Home/Refrigerator.jsx";
import Community from "../../components/Home/Community.jsx";
import MenuNavigate from "../../components/Home/MenuNavigate.jsx";

const HomePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate/>
            <Refrigerator/>
            <Community/>
        </main>
    );
};

export default HomePage;
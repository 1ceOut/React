import Refrigerator from "../../components/Home/Refrigerator.jsx";
import Community from "../../components/Home/Community.jsx";
import MenuNavigate from "../../components/Home/MenuNavigate.jsx";
import ProductCard from "../../components/Home/ProductCard.jsx";
import BarNavigate from "../../components/Common/BarNavigate.jsx";

const HomePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate PageTitle={""}/>
            <ProductCard/>
            <Refrigerator/>
            <Community/>
            <BarNavigate/>
        </main>
    );
};

export default HomePage;
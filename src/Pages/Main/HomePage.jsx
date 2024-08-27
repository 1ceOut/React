import { useState, useEffect } from 'react';
import MenuNavigate from "../../components/Home/MenuNavigate.jsx";
import ProductCard from "../../components/Home/ProductCard.jsx";
import Refrigerator from "../../components/Home/Refrigerator.jsx";
import Community from "../../components/Home/Community.jsx";
import BarNavigate from "../../components/Common/BarNavigate.jsx";

const HomePage = () => {
    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}>
            <MenuNavigate PageTitle={""}/>
            <ProductCard/>
            <Refrigerator/>
            <Community/>
            <BarNavigate 
                shoppingsrc="/assets/shopping.png"
                homesrc="/assets/homeselect.png"
                searchsrc="/assets/search.png"
            />
        </main>
    );
};

export default HomePage;
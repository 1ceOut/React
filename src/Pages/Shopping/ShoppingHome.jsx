import { useState, useEffect } from 'react';
import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";
import HomeMainContent from "../../components/Shopping/ShoppingHome/HomeMainContent";
import HomeTopContent from "../../components/Shopping/ShoppingHome/HomeTopContent";

const ShoppingHome = () => {

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen`}>
            <MenuNavigate option={"쇼핑"} alertPath="/addinfo/habit" />
            <HomeTopContent/>
            <HomeMainContent/>
            <HomeMainContent/>
            <HomeMainContent/>
            <HomeMainContent/>
            <HomeMainContent/>
            <BarNavigate 
                shoppingsrc="/assets/shoppingselect.png"
                homesrc="/assets/home.png"
                searchsrc="/assets/search.png"
            />
        </main>
    );
};

export default ShoppingHome;
import React from 'react';
import Notification from "../components/Home/Notification.jsx";
import Header from "../components/Home/Header.jsx";
import Refrigerator from "../components/Home/Refrigerator.jsx";
import ProductCard from "../components/Home/ProductCard.jsx";
import Community from "../components/Home/Community.jsx";

const HomePage = () => {
    return (
        <div className='flex flex-col items-center pt-5 pb-2 mx-auto w-full bg-zinc-100 max-w-[480px] h-screen'>
            <Header/>
            <Notification/>
            <Refrigerator/>
            <ProductCard/>
            <img loading="lazy"
                 src="/assets/shop_progress_bar.png"
                 alt="" className="mt-3 w-20 rounded-none aspect-[10]"/>
            <Community/>
        </div>
    );
};

export default HomePage;
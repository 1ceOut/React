import { useState, useEffect } from 'react';
import MenuNavigate from "../../components/Home/MenuNavigate.jsx";
import ProductCard from "../../components/Home/ProductCard.jsx";
import Refrigerator from "../../components/Home/Refrigerator.jsx";
import Community from "../../components/Home/Community.jsx";
import BarNavigate from "../../components/Common/BarNavigate.jsx";
import {BestShoppingList, ShoppingHeader} from "../../query/ShopQuery.js";
import {useQueryClient} from "@tanstack/react-query";

const HomePage = () => {
    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    const queryClient = useQueryClient();

    useEffect(() => {
        // BestShoppingList 데이터 미리 가져오기
        queryClient.prefetchQuery({
            queryKey: ["BestShoppingList"],
            queryFn: BestShoppingList,
            staleTime: Infinity,
            cacheTime: 86400000,
            meta: { persist: true }
        });

        // ShoppingHeader 데이터 미리 가져오기
        queryClient.prefetchQuery({
            queryKey: ["ShoppingHeader"],
            queryFn: ShoppingHeader,
            staleTime: Infinity,
            cacheTime: 86400000,
            meta: { persist: true }
        });
    }, [queryClient]);


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
import { useState, useEffect } from "react";
import MenuNavigate from "../../components/Home/MenuNavigate.jsx";
import ProductCard from "../../components/Home/ProductCard.jsx";
import Refrigerator from "../../components/Home/Refrigerator.jsx";
import Community from "../../components/Home/Community.jsx";
import BarNavigate from "../../components/Common/BarNavigate.jsx";
import { BestShoppingList, ShoppingHeader } from "../../query/ShopQuery.js";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "./../../store/useUserStore";

const HomePage = () => {
  const [animationClass, setAnimationClass] = useState("animate-slideInUp");
  const navigate = useNavigate();
  const { userRole } = useUserStore();

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    if (userRole === "ROLE_NEED_INSERT") {
      navigate("/addinfo/habit");
    }

    return () => {
      setAnimationClass("animate-slideOutDown");
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
      meta: { persist: true },
    });

    // ShoppingHeader 데이터 미리 가져오기
    queryClient.prefetchQuery({
      queryKey: ["ShoppingHeader"],
      queryFn: ShoppingHeader,
      staleTime: Infinity,
      cacheTime: 86400000,
      meta: { persist: true },
    });
  }, [queryClient]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
    <main
      className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}
    >
      <MenuNavigate PageTitle={""} />
      <ProductCard />
      <div className="bg-gray-100 flex w-[390px] h-[10px] mb-6"></div>
      <Refrigerator />
      <div className="bg-gray-100 flex w-[390px] h-[10px] mb-6"></div>
      <Community />
      <div className="bg-gray-100 flex w-[390px] h-[500px] "></div>
      <BarNavigate
        shoppingsrc="/assets/shopping.png"
        homesrc="/assets/homeselect.png"
        searchsrc="/assets/search.png"
      />
    </main>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";
import HomeMainContent from "../../components/Shopping/ShoppingHome/HomeMainContent";
import HomeTopContent from "../../components/Shopping/ShoppingHome/HomeTopContent";
import useUserStore from "../../store/useUserStore.js";
import { BestShoppingList, ShoppingHeader } from "../../query/ShopQuery.js";
import LoadingBar from "../../components/Login/LoadingBar.jsx";
import dummyListData from "../../testdata/shopingdata.json";
import dummyBannerData from "../../testdata/banner.json";

const ShoppingHome = () => {
  const {
    data: storedata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["BestShoppingList"],
    queryFn: BestShoppingList,
    staleTime: Infinity,
    cacheTime: 86400000,
    refetchOnReconnect: true,
    meta: { persist: true },
  });

  const { data: bannerdata } = useQuery({
    queryKey: ["ShoppingHeader"],
    queryFn: ShoppingHeader,
    staleTime: Infinity,
    cacheTime: 86400000,
    refetchOnReconnect: true,
    meta: { persist: true },
  });

  const [animationClass, setAnimationClass] = useState("animate-slideInUp");
  const userList = []; // 사용자 기반 추천 목록
  const data = storedata?.length === 0 ? dummyListData : storedata;
  const best_list = data?.length ? data : [];
  const discount_list = data?.length
    ? data
        .filter((a) => a.discount_percent !== null)
        .sort(
          (a, b) =>
            Number(b.discount_percent.replace("%", "")) -
            Number(a.discount_percent.replace("%", ""))
        )
    : [];
  const review_list = data?.length
    ? data
        .filter((a) => a.review_count !== null)
        .sort((a, b) => {
          return (
            Number(a.price.replace(/[^\d]+/g, "")) -
            Number(b.price.replace(/[^\d]+/g, ""))
          );
        })
    : [];

  const { userName } = useUserStore();

  useEffect(() => {
    setAnimationClass("animate-slideInUp");
    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  if (isLoading) {
    return <LoadingBar />;
  }

  if (isError) {
    return (
      <div>데이터 로딩 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>
    );
  }

  const currentPage = "shop";

  return (
    <main
      className={`${animationClass} flex overflow-hidden flex-col pt-5 mx-auto w-full max-w-[390px] pb-20`}
    >
      <div className="flex justify-center items-center">
        <MenuNavigate option={"쇼핑"} alertPath="/addinfo/habit" />
      </div>
      <HomeTopContent
        headerData={bannerdata?.length === 0 ? dummyBannerData : bannerdata}
      />
      {userName === "" ? null : (
        <HomeMainContent options={"user"} data={userList.slice(0, 20)} />
      )}
      <HomeMainContent options={"best"} data={best_list.slice(0, 20)} />
      <HomeMainContent options={"discount"} data={discount_list.slice(0, 20)} />
      <HomeMainContent options={"reviews"} data={review_list.slice(0, 20)} />
      <BarNavigate isActive={currentPage} />
    </main>
  );
};

export default ShoppingHome;

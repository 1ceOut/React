import { useState, useEffect } from "react";
import MenuNavigate from "./../../components/Common/MenuNavigate";
import Header from "./../../components/Mypage/FridgePlus/Header";
import AddFridgeProcess from "../../components/Mypage/FridgePlus/AddFridgeProcess";

const FridgePlusPage = () => {
  const [animationClass, setAnimationClass] = useState("animate-slideInUp");

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  return (
    <main
      className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen`}
    >
      <MenuNavigate option="냉장고 추가" />
      <Header />
      <img src="/assets/refridge.png" alt="냉장고" />
      <AddFridgeProcess />
    </main>
  );
};

export default FridgePlusPage;

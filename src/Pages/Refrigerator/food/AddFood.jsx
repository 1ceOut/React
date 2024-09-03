import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuNavigate from "../../../components/Common/MenuNavigate";

const AddFood = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [animationClass, setAnimationClass] = useState("animate-slideInUp");

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const fridgeName = queryParams.get("fridge") || "일반 냉장고";

  const handleNavigate = () => {
    navigate("/Refrigerator/food/AddBarcode", {
      state: { refrigeratorName: fridgeName, inputMethod: "barcode" }, // 바코드 입력 선택
    });
  };

  const handleNavigation = () => {
    navigate("/Refrigerator/food/AddInput2", {
      state: { refrigeratorName: fridgeName, inputMethod: "manual" }, // 직접 입력 선택
    });
  };

  return (
    <main
      className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen`}
    >
      <MenuNavigate
        option={`${fridgeName} 냉장고`}
        alertPath="/addinfo/habit"
      />
      <div className="w-[342px] h-[76px] mt-6">
        <p className="font-semibold text-2xl">
          {fridgeName} 냉장고에 음식
          <br />
          추가할 방법을 선택해주세요.
        </p>
      </div>
      <img
        className="w-[240px] h-[240px] mt-10"
        src="/assets/basket.png"
        alt=""
      />
      <div
        className="w-[342px] h-[56px] rounded-lg border border-gray-300 flex items-center justify-center mt-8 cursor-pointer"
        onClick={handleNavigate}
      >
        바코드 촬영으로 음식추가하기
      </div>
      <div
        className="w-[342px] h-[56px] rounded-lg border border-gray-300 flex items-center justify-center mt-3 cursor-pointer"
        onClick={handleNavigation}
      >
        직접입력
      </div>
    </main>
  );
};

export default AddFood;

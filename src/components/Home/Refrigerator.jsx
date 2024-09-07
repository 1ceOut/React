import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import { useEffect, useState } from "react";
import useFridgeOptions, { masterUserList } from "../../query/RefriQuery.jsx";

const Refrigerator = () => {
  const [userData, setUserData] = useState([]);
  const { userId, isLogin, LoginSuccessStatus } = useUserStore();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false); // 더보기 상태 관리

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !isLogin) {
      LoginSuccessStatus(savedToken);
    }
    if (!userId) {
      navigate("/");
    }
  }, [userId, isLogin, navigate, LoginSuccessStatus]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await masterUserList(userId);
        setUserData(data || []);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setUserData([]);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const {
    data: fridgeOptions = [],
    isLoading,
    error,
  } = useFridgeOptions(userId);
  const handleNavigate = () => {
    navigate("/fridge/fridgemanage");
  };

  const editNavigate = () => {
    navigate(`/mypage/profile`);
  };

  const handleFridgeClick = (fridgeName) => {
    // 선택된 냉장고 정보를 세션 스토리지에 저장
    sessionStorage.setItem("selectedFridge", fridgeName);
    // FridgeManagePage로 이동
    navigate("/fridge/fridgemanage");
  };

  return (
    <section className="self-stretch mb-8">
      <div className="flex gap-5 justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          나의 냉장고
        </h2>
        <div className="text-sm tracking-tight text-neutral-500 underline">
          {userId && (
            <p className="cursor-pointer" onClick={handleNavigate}>
              전체보기
            </p>
          )}
        </div>
      </div>
      {fridgeOptions.length === 0 && userId && (
        <div className="flex flex-col items-center mt-5">
          <img src="/assets/norefri.jpeg" alt="냉장고" className="w-24 h-24" />
          <p className="mt-2 text-gray-500">등록된 냉장고가 없어요</p>
        </div>
      )}

      {!userId && (
        <div className="flex flex-col items-center mt-5">
          <img src="/assets/norefri.jpeg" alt="냉장고" className="w-24 h-24" />
          <p className="mt-2 text-gray-500">로그인 후 이용해주세요</p>
        </div>
      )}

      {fridgeOptions.map((item, index) => (
        <div
          key={index}
          className="flex gap-3 mt-7 text-base font-medium tracking-tight text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-200 ease-in-out cursor-pointer"
          onClick={() => handleFridgeClick(item.refrigeratorName)}
        >
          <div className="relative rounded-[8px] w-34 h-34 flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-[8px]">
              <img
                loading="lazy"
                src={"/assets/iconrefridge.png"}
                alt={item.refrigeratorName}
                className="w-6 h-9"
              />
            </div>
          </div>
          <div className="flex-auto my-auto ">{item.refrigeratorName}</div>
          <div className="h-9 w-6 flex justify-center items-center">
            <div
              className="shrink-0 rounded-lg aspect-square w-[25px] h-[25px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                editNavigate();
              }}
            >
              <img
                src={"/assets/cogwheel.png"}
                alt="Edit"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Refrigerator;

import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import { useEffect, useState } from "react";
import useFridgeOptions, { masterUserList } from "../../query/RefriQuery.jsx";

const Refrigerator = () => {
    const [userData, setUserData] = useState([]);
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const navigate = useNavigate();

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

    const { data: fridgeOptions = [], isLoading, error } = useFridgeOptions(userId);
    console.log("데이터임", fridgeOptions);

    const handleNavigate = () => {
        navigate('/fridge/fridgemanage');
    };

    const editNavigate = () => {
        navigate(`/mypage/profile`);
    };

    const handleFridgeClick = (fridgeName) => {
        // 선택된 냉장고 정보를 세션 스토리지에 저장
        sessionStorage.setItem('selectedFridge', fridgeName);
        // FridgeManagePage로 이동
        navigate('/fridge/fridgemanage');
    };

    return (
        <section className="self-stretch mb-8">
            <div className="flex gap-5 justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">나의 냉장고</h2>
                <div className="text-sm tracking-tight text-neutral-500 underline">
                    <p className="cursor-pointer" onClick={handleNavigate}>전체보기</p>
                </div>
            </div>
            {fridgeOptions.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-3 mt-7 text-base font-medium tracking-tight text-gray-700"
                    onClick={() => handleFridgeClick(item.refrigeratorName)} // 클릭 이벤트 핸들러 추가
                >
                    <img loading="lazy" src={"/assets/iconrefridge.png"} alt={item.refrigeratorName} className="shrink-0 rounded-lg aspect-square w-[34px]" />
                    <div className="flex-auto my-auto">{item.refrigeratorName}</div>
                    <img src={"/assets/cogwheel.png"} className="shrink-0 rounded-lg aspect-square w-[25px] h-[25px]" onClick={editNavigate} />
                </div>
            ))}
        </section>
    );
};

export default Refrigerator;

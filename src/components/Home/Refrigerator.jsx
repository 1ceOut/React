import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {useEffect, useState} from "react";
import useFridgeOptions, {masterUserList} from "../../query/RefriQuery.jsx";


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
    console.log("데이터임",fridgeOptions);


    const items = [
        { img: "/assets/cheese.png", name: "서울우유 체다치즈" },
        { img: "/assets/chicken.png", name: "[올마레] 춘천 국물 닭갈비 떡볶이" },
        { img: "/assets/meet.png", name: "[브룩클린688] 호주산 토시살 구이용 냉장 ..." }
    ];

    const handleNavigate = () => {
        navigate('/fridge/fridgemanage');
    };
    const editNavigate = () =>{
        navigate(`/mypage/profile`);
    }

    return (
        <section className="self-stretch mb-8">
            <div className="flex gap-5 justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">나의 냉장고</h2>
                <div className="text-sm tracking-tight text-neutral-500 underline">
                    <p className="cursor-pointer" onClick={handleNavigate}>전체보기</p>
                </div>
            </div>
            {fridgeOptions.map((item, index) => (
                <div key={index} className="flex gap-3 mt-7 text-base font-medium tracking-tight text-gray-700">
                    <img loading="lazy" src={"/assets/iconrefridge.png"} alt={item.refrigeratorName} className="shrink-0 rounded-lg aspect-square w-[34px]" />
                    <div className="flex-auto my-auto">{item.refrigeratorName}</div>
                    <img src={"/assets/cogwheel.png"}  className="shrink-0 rounded-lg aspect-square w-[25px] h-[25px]" onClick={editNavigate}/>
                </div>
            ))}
        </section>
    );
};

export default Refrigerator;

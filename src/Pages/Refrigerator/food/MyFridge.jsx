import MenuNavigate from "../../../components/Common/MenuNavigate";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyFridge = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleNavigate = () => {
        navigate('/Refrigerator/food/AddFridge'); // 페이지 이동할 경로 설정
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit" />
            <div className="text-center mt-24" style={{ width: 342, height: 111 }}>
                <h2 className="font-bold text-2xl">
                    아직 등록된 냉장고가<br />
                    없어요
                </h2>
                <p className="font-medium text-sm text-gray-600 mt-4">
                    냉장고를 등록해 음식을 편리하게 관리해보세요.
                </p>
            </div>
            <img className="w-60 h-60 mt-16" src="/assets/refridge.png" alt="냉장고 이미지" />
            <div
                className={`w-[342px] h-14 rounded-xl border border-[#E1E1E1] flex items-center justify-center mt-8 cursor-pointer transition-colors duration-300 ${
                    true ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-[#D1D1D1]'
                }`}
                onClick={handleNavigate}
            >
                <p className="font-medium text-lg">냉장고 등록하기</p>
            </div>
        </main>
    );
};

export default MyFridge;

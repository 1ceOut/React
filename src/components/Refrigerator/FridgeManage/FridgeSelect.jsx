// FridgeSelect 컴포넌트
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate 추가
import useUserStore from '../../../store/useUserStore'; // zustand 상태 관리 라이브러리 import
import useFridgeOptions from '../../../query/RefriQuery'; // 수정된 경로

const FridgeSelect = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const navigate = useNavigate(); // navigate 훅 추가

    // useFridgeOptions 훅을 사용하여 냉장고 옵션 데이터 fetch
    const { data: fridgeOptions = [], isLoading, error } = useFridgeOptions(userId);

    useEffect(() => {
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken); // 토큰이 있다면 로그인 상태 초기화
        }
        if (!userId) {
            navigate('/login'); // 로그인 안되어 있으면 로그인 페이지로 이동
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    if (isLoading) {
        return <div>Loading...</div>; // 데이터 로딩 중 상태
    }

    if (error) {
        return <div>Error loading fridge options.</div>; // 에러 발생 시 상태
    }

    return (
        <div className="self-stretch w-[342px] h-[60px] border rounded-xl bg-[#F3F3F3]">
            <div className="flex my-1 mx-[10px] overflow-x-auto">
                {fridgeOptions.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelection(option)} // 옵션 클릭 시 선택 상태 업데이트
                        className={`flex items-center justify-center h-[46px] text-gray-900 cursor-pointer ${
                            selectedOption === option ? 'bg-white border-0 rounded-xl' : 'bg-[#F3F3F3] rounded-xl'
                        }`}
                        style={{ minWidth: '161px', padding: '4px 10px' }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FridgeSelect;

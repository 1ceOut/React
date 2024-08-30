import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import useFridgeOptions from '../../../query/RefriQuery';

const FridgeSelect = ({ onSelectFridge }) => { // onSelectFridge prop 추가
    const [selectedOption, setSelectedOption] = useState(null);

    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const navigate = useNavigate();

    const { data: fridgeOptions = [], isLoading, error } = useFridgeOptions(userId);

    useEffect(() => {
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate('/');
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    const handleSelection = (option) => {
        setSelectedOption(option);
        onSelectFridge(option.refrigeratorName); // 선택된 냉장고 이름을 상위 컴포넌트로 전달
    };

    return (
        <div className="self-stretch w-[342px] h-[60px] border rounded-xl bg-[#F3F3F3]">
            <div className="flex my-1 mx-[10px] overflow-x-auto whitespace-nowrap">
                {fridgeOptions.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelection(option)}
                        className={`flex items-center justify-center h-[46px] text-gray-900 cursor-pointer ${
                            selectedOption === option ? 'bg-white border-2 border-gray-900 rounded-xl' : 'bg-[#F3F3F3] rounded-xl'
                        }`}
                        style={{minWidth: '161px', padding: '4px 10px'}}
                    >
                        {option.refrigeratorName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FridgeSelect;

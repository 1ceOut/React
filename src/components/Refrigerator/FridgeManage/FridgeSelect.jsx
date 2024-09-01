import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import useFridgeOptions from '../../../query/RefriQuery';

const FridgeSelect = ({ onSelectFridge }) => {
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

        // 세션 스토리지에서 이전에 선택된 냉장고 가져오기
        const storedFridge = sessionStorage.getItem('selectedFridge');
        if (storedFridge) {
            const selectedFridgeOption = fridgeOptions.find(option => option.refrigeratorName === storedFridge);
            if (selectedFridgeOption) {
                setSelectedOption(selectedFridgeOption);
                onSelectFridge(selectedFridgeOption.refrigeratorName);
            }
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus, fridgeOptions, onSelectFridge]);

    const handleSelection = (option) => {
        setSelectedOption(option);
        sessionStorage.setItem('selectedFridge', option.refrigeratorName);
        onSelectFridge(option.refrigeratorName);
    };

    return (
        <div className="self-stretch w-[342px] h-[60px] border rounded-xl bg-[#F3F3F3]">
            <div className="flex my-1 mx-[10px] overflow-x-auto whitespace-nowrap">
                {fridgeOptions.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelection(option)}
                        className={`flex items-center justify-center h-[46px] text-gray-900 cursor-pointer ${
                            selectedOption?.refrigeratorName === option.refrigeratorName
                                ? 'bg-white border-2 border-gray-900 rounded-xl'
                                : 'bg-[#F3F3F3] rounded-xl'
                        }`}
                        style={{ minWidth: '161px', padding: '4px 10px' }}
                    >
                        {option.refrigeratorName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FridgeSelect;

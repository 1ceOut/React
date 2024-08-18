
import { useState } from 'react';
import FridgeDeleteButton from './FridgeDeleteButton';

const FridgeSelect = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelection = (option) => {
        setSelectedOption(option);
    };

    const options = [
        '일반 냉장고',
        '김치 냉장고',
    ];
    
    return (
        <div className="self-stretch">
            <div className="h-[220px] flex flex-col">
                {options.map((option, index) => (
                <label
                    key={index}
                    className={`flex items-center font-['Pretendard'] text-[#191F28] text-base font-semibold w-[342px] h-14 mb-3 border rounded-xl cursor-pointer ${
                    selectedOption === option ? 'border-blue-500' : 'border-[#E1E1E1]'
                    } hover:border-[#E1E1E1]`}
                >
                    <input
                    type="checkbox"
                    checked={selectedOption === option}
                    onChange={() => handleSelection(option)}
                    className="w-6 h-6 ml-2 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                    />
                    <div className="flex justify-center w-[342px]">
                    {option}
                    </div>
                </label>
                ))}
            </div>
            <FridgeDeleteButton isEnabled={!!selectedOption} nextPath=" /addinfo/favorite" />
        </div>
    );
};

export default FridgeSelect;
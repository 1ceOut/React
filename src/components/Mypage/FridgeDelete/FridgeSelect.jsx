
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
        <div className="self-stretch w-[480px]">
                <div className='h-[220px] flex flex-col justify-evenly'>
                        <div
                            type="checkbox"
                            className="w-11 h-11 appearance-none border-solid border border-pointColor1 rounded-md
                                checked:bg-pointColor1 checked:bg-[url('https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/checkbox.png')]
                                bg-md bg-no-repeat bg-center"
                        />
                    {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelection(option)}
                        className={`flex font-['Pretendard'] text-[#191F28] text-base font-semibold items-center justify-center w-[342px] h-14 border rounded-xl cursor-pointer ${
                        selectedOption === option ? 'border-blue-500' : 'border-[#E1E1E1]'
                        }`}
                    >
                        <div className="flex items-center justify-center w-full px-5 h-[19px]">
                            {option}
                        </div>
                        {selectedOption === option && (
                            <div className="text-blue-500">&#10003;</div>
                        )}
                    </div>
                    ))}
                </div>
            <FridgeDeleteButton isEnabled={!!selectedOption} nextPath=" /addinfo/favorite" />
        </div>
    );
};

export default FridgeSelect;
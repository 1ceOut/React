import { useState } from 'react';
import NextButton from './../Common/NextButton';

const HabbitSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const options = [
    '식습관을 잘 지키는 편이에요',
    '나름 지킬려고 하는 편이에요',
    '식습관 관리가 힘든 편이에요',
  ];

  return (
    <div className="self-stretch w-[480px]">
      <div className='h-[220px] flex flex-col justify-evenly'>
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
      <NextButton isEnabled={!!selectedOption} nextPath="/addinfo/favorite" />
    </div>
  );
};

export default HabbitSelect;
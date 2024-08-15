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
    <div className="self-stretch">
      <div className="h-[220px] flex flex-col justify-evenly">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center font-['Pretendard'] text-[#191F28] text-base font-semibold w-[342px] h-14 border rounded-xl cursor-pointer ${
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
      <NextButton isEnabled={!!selectedOption} nextPath="/addinfo/favorite" />
    </div>
  );
};

export default HabbitSelect;
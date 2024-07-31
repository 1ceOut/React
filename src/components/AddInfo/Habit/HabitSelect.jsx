import { useState } from 'react';

const HabbitSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      alert('Next clicked!');
    }
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
          className={`flex font-['Pretendard'] text-[#191F28] text-base font-semibold items-center justify-center w-[342px] h-14 border rounded-[12px] cursor-pointer ${
            selectedOption === option ? 'border-blue-500' : 'border-[#E1E1E1]'
          }`}
        >
          <div className="flex items-center justify-center w-[302px] h-[19px]">
            {option}
          </div>
          {selectedOption === option && (
            <div className="text-blue-500">&#10003;</div>
          )}
        </div>
      ))}
      </div>
      <div
        className={`flex text-[#868686] rounded-[12px] self-stretch justify-center items-center w-[342px] h-14 mt-60 cursor-pointer ${
          selectedOption ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
        }`}
        onClick={selectedOption ? handleSubmit : null}
      >
        다음
      </div>
    </div>
  );
};

export default HabbitSelect;
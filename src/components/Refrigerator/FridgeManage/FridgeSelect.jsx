import { useState } from 'react';

const FridgeSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['일반 냉장고', '김치 냉장고', '미니 냉장고', '와인 냉장고', '냉장고 1', '냉장고 2']; // Example options

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="self-stretch w-[342px] h-[60px] border rounded-xl bg-[#F3F3F3]">
      <div className="flex my-1 mx-[10px] overflow-x-auto">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelection(option)}
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
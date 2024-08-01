import { useState } from 'react';

const FridgeSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['일반 냉장고', '김치 냉장고', '미니 냉장고', '와인 냉장고', '냉장고 1', '냉장고 2']; // Example options

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="self-stretch max-w-[342px] border rounded-xl overflow-x-auto">
      <div className="flex bg-[#F3F3F3]">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelection(option)}
            className={`flex items-center justify-center h-14 text-gray-900 cursor-pointer border-r ${
              selectedOption === option ? 'bg-white' : 'bg-[#F3F3F3]'
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
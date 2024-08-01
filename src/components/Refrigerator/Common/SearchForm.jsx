import { useState } from 'react';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="self-stretch w-[480px]">
      <div className="self-stretch flex items-center border rounded-xl w-[342px] my-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="찾고 있는 음식을 검색해주세요"
          className="flex items-center justify-center rounded-xl px-5 w-full h-14 text-gray-900 outline-none"
        />
        <div>
          <img src="/assets/SearchIcon.png" alt="searchicon" onClick={"/addinfo/habit"}
          className="cursor-pointer pr-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
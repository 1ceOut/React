import { useState } from 'react';
import {keywordSearchFood} from "../../../query/FoodDataSearch.jsx";

const SearchForm = ({selectedFridge}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const searchButton = async () => {
    console.log(selectedFridge);
    console.log(inputValue);
    await keywordSearchFood(selectedFridge,inputValue);
  }

  return (
    <div className="self-stretch w-[480px] h-14">
      <div className="self-stretch flex items-center border rounded-xl w-[342px]">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="찾고 있는 음식을 검색해주세요"
          className="flex items-center justify-center rounded-xl px-5 w-full h-14 text-gray-900 outline-none"
        />
        <div>
          <img src="/assets/SearchIcon.png" alt="searchicon" onClick={searchButton}
          className="cursor-pointer pr-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
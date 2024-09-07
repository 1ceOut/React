import { useState } from "react";
import { keywordSearchFood } from "../../../query/FoodDataSearch.jsx";

const SearchForm = ({ selectedFridge, onSearchResults }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const searchButton = async () => {
    console.log(selectedFridge);
    console.log(inputValue);

    // 검색어가 없을 때 빈 배열 전달
    if (!inputValue.trim()) {
      onSearchResults([]);
      return;
    }

    // 검색 결과 가져오기
    const results = await keywordSearchFood(selectedFridge, inputValue);

    // 검색 결과가 없을 때 빈 배열 전달
    if (!results || results.length === 0) {
      onSearchResults([]);
    } else {
      onSearchResults(results); // 부모 컴포넌트로 검색 결과를 전달
    }
  };

  return (
    <div className="self-stretch w-[342px] h-14">
      <div className="self-stretch flex items-center border rounded-xl w-[342px]">
        <textarea
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="찾고 있는 음식을 검색해주세요"
          className="flex items-center justify-center rounded-xl px-5 w-full h-14 text-gray-900 outline-none"
        />
        <div>
          <img
            src="/assets/SearchIcon.png"
            alt="searchicon"
            onClick={searchButton}
            className="cursor-pointer pr-5"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

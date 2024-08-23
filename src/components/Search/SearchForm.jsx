import { useState } from "react";
import useSearchStore from './../../store/udseSearchStore';

const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    const addSearch = useSearchStore((state) => state.addSearch);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            addSearch(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="self-stretch h-14 flex justify-center items-center space-x-[14px] mt-[50px]">
            <div className="self-stretch flex items-center border rounded-xl w-[300px]">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요"
                    className="flex items-center justify-center rounded-xl px-5 w-full text-gray-900 outline-none"
                />
                <div>
                    <img 
                        src="/assets/SearchIcon.png" 
                        alt="searchicon" 
                        onClick={handleSearch}
                        className="cursor-pointer pr-5" 
                    />
                </div>
            </div>
            <div>
                취소
            </div>
        </div>
    );
};

export default SearchForm;
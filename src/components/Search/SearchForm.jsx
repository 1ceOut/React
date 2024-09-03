import { useEffect, useState } from "react";
import useSearchStore from '../../store/useSearchStore.js';
import useUserStore from "../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { SearchAllFood } from "../../query/FoodListQuery.jsx";
import RecentSearch from "../../components/Search/RecentSearch";

const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

    const addSearch = useSearchStore((state) => state.addSearch);
    const navigate = useNavigate();
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate("/");
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = async () => {
        if (inputValue.trim() === '') {
            setShowPopup(true); // 입력이 비어 있으면 팝업 표시
            return;
        }

        const response = await SearchAllFood(userId, inputValue);
        setResponse(response);
       
        if (inputValue.trim()) {
            addSearch(inputValue.trim());
            setInputValue('');
        }
        console.log(response);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
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
                <div></div>
            </div>
            
            {/* 검색 결과 */}
            {response.length > 0 && response.map((item, index) => (
                <div key={index} className="mb-6">
                    <RecentSearch
                        option={item.productName}
                        refrigeratorName={item.refrigeratorName}
                        count={item.count}
                        userId={item.userId}
                        id={item.id}
                        createdDate={item.createdDate}
                        expiryDate={item.expiryDate}
                        lcategory={item.lcategory}
                        productType={item.productType}
                        scategory={item.scategory}
                        barcode={item.barcode}
                    />
                </div>
            ))}

            {/* 팝업 */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 mb-[100px]">
                    <div className="bg-white p-4 border rounded-lg shadow-lg  mb-[50px]">
                        <p className="text-center text-lg ">검색어를 입력하세요!</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded ml-[40px]"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchForm;

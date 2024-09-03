import { useEffect, useState } from "react";
import useSearchStore from '../../store/useSearchStore.js';
import useUserStore from "../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { SearchAllFood } from "../../query/FoodListQuery.jsx";
import RecentSearch from "../../components/Search/RecentSearch";

const SearchForm = () => {
    const [inputValue, setInputValue] = useState('');
    
    const [response, setResponse] = useState([]); // response 상태 추가
    
    const addSearch = useSearchStore((state) => state.addSearch);
    const navigate = useNavigate();
    
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken); // 토큰이 있다면 로그인 상태 초기화
        }
        if (!userId) {
            navigate("/"); // 로그인 안되어 있으면 로그인 페이지로 이동
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = async () => {
        const response = await SearchAllFood(userId, inputValue);
        setResponse(response);
       
        if (inputValue.trim()) {
            addSearch(inputValue.trim());
            setInputValue('');
        }
        console.log(response);
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
                <div>
                    
                </div>
            </div>
            {response.length > 0 ? (
  response.map((item, index) => (
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
        ))
      ) : (
        <div>No posts available</div>
      )} 
        </div>
    );
};

export default SearchForm;



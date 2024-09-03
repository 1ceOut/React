import { useState, useEffect } from "react";
import DetailButton from "../../../components/Common/DetailButton";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import SearchForm from "../../../components/Refrigerator/Common/SearchForm";
import { useLocation } from "react-router-dom";
import { listFromLcategory } from "../../../query/FoodListQuery.jsx";
import BarNavigate from "./../../../components/Common/BarNavigate";

const FoodList = () => {
  const location = useLocation();
  const category = location.state?.category;
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    const fetchFoodList = async () => {
      setLoading(true);
      const refrigeratorName = sessionStorage.getItem("selectedFridge"); // 세션 스토리지에서 refrigeratorName 가져오기
      try {
        const data = await listFromLcategory(refrigeratorName, category);
        setFoodList(data); // 데이터 설정
      } catch (error) {
        console.error("Failed to fetch food list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodList();
  }, [category]);

  // 팝업 토글 함수
  const togglePopup = () => setShowPopup(!showPopup);

  // 옵션 클릭 핸들러
  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      // If the same option is clicked, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new option is clicked, set to ascending order by default
      setSelectedOption(option);
      setSortOrder("asc");
    }
    sortFoodList(option);
  };

  // Food list sorting function
  const sortFoodList = (option) => {
    let sortedList = [...foodList];
    if (option === "이름 순") {
      sortedList.sort((a, b) =>
        sortOrder === "asc"
          ? a.productName.localeCompare(b.productName, "ko")
          : b.productName.localeCompare(a.productName, "ko")
      );
    } else if (option === "등록일 순") {
      sortedList.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdDate) - new Date(b.createdDate)
          : new Date(b.createdDate) - new Date(a.createdDate)
      );
    } else if (option === "유통기한 순") {
      sortedList.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.expiryDate) - new Date(b.expiryDate)
          : new Date(b.expiryDate) - new Date(a.expiryDate)
      );
    }
    setFoodList(sortedList);
  };

  // 백그라운드 클릭 시 팝업 닫기
  const handleBackgroundClick = () => {
    setShowPopup(false);
  };

  const closeModal = () => {
    setShowPopup(!showPopup);
  };

  // 팝업 내부 클릭 시 이벤트 전파 방지
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  // Function to render the sort arrow
  const renderSortArrow = (option) => {
    if (selectedOption === option) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate option={`${category}`} alertPath="/addinfo/habit" />

      <div className="self-stretch pt-8">
        <SearchForm />
      </div>

      <div className="w-[342px] h-[33px] relative mt-8">
        <div className="flex justify-between items-center h-full">
          <div className="font-medium text-[28px]">{category}</div>
          <div className="flex items-center absolute right-0 bottom-0">
            <div className="flex items-center mr-2">
              <div className="mr-1 font-medium text-[14px]">총</div>
              <div className="font-medium text-[14px]">{foodList.length}개</div>
            </div>
            <img
              src="/assets/filter.png"
              alt="Filter"
              className="w-4 h-[14px] cursor-pointer"
              onClick={togglePopup}
            />
          </div>
        </div>
      </div>

      <div className="self-stretch pt-5 mt-4">
        {loading ? (
          <p>로딩 중...</p>
        ) : foodList.length === 0 ? (
          <p>{category}에 해당하는 음식이 없습니다.</p>
        ) : (
          foodList.map((food, index) => (
            <DetailButton
              key={index}
              id={food.id}
              productName={food.productName}
              expiryDate={food.expiryDate}
              count={food.count}
              productType={food.productType}
              createdDate={food.createdDate}
              lcategory={food.lcategory}
              scategory={food.scategory}
              option={food.productName}
            />
          ))
        )}
      </div>

      {showPopup && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-end z-[9999]"
          onClick={handleBackgroundClick} // 백그라운드 클릭 시 팝업 닫기
        >
          <div
            className="w-[390px] h-[258px] bg-white rounded-t-[24px] p-5 flex flex-col items-center"
            onClick={handlePopupClick} // 팝업 내부 클릭 시 이벤트 전파 방지
          >
            <div className="w-full h-[46px] font-semibold text-[18px] ml-6 box-border">
              조회 조건 설정
            </div>
            <div className="w-[342px] h-[56px] mt-4 flex justify-between">
              <div
                className={`w-[108px] h-[56px] rounded-[12px] flex justify-center border-[1px] items-center text-center font-normal text-[16px] cursor-pointer ${
                  selectedOption === "이름 순"
                    ? "border-[#2377EF] text-[#2377EF]"
                    : "border-[#E1E1E1] text-black"
                }`}
                onClick={() => handleOptionClick("이름 순")}
              >
                이름 순 {renderSortArrow("이름 순")}
              </div>
              <div
                className={`w-[108px] h-[56px] rounded-[12px] flex justify-center border-[1px] items-center text-center font-normal text-[16px] cursor-pointer ${
                  selectedOption === "등록일 순"
                    ? "border-[#2377EF] text-[#2377EF]"
                    : "border-[#E1E1E1] text-black"
                }`}
                onClick={() => handleOptionClick("등록일 순")}
              >
                등록일 순 {renderSortArrow("등록일 순")}
              </div>
              <div
                className={`w-[108px] h-[56px] rounded-[12px] flex justify-center border-[1px] items-center text-center font-normal text-[16px] cursor-pointer ${
                  selectedOption === "유통기한 순"
                    ? "border-[#2377EF] text-[#2377EF]"
                    : "border-[#E1E1E1] text-black"
                }`}
                onClick={() => handleOptionClick("유통기한 순")}
              >
                유통기한 순 {renderSortArrow("유통기한 순")}
              </div>
            </div>
            <div className="w-[342px] h-[56px] rounded-[12px] bg-[#2377EF] mt-6 flex items-center justify-center">
              <p
                className="font-semibold text-[16px] text-white m-0"
                onClick={closeModal}
              >
                조회
              </p>
            </div>
          </div>
        </div>
      )}
      <BarNavigate
        shoppingsrc="/assets/shopping.png"
        homesrc="/assets/home.png"
        searchsrc="/assets/search.png"
      />
    </main>
  );
};

export default FoodList;

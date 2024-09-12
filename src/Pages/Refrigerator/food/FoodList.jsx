import React, { useState, useEffect } from "react";
import DetailButton from "../../../components/Common/DetailButton";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import SearchForm from "../../../components/Refrigerator/Common/SearchForm";
import { useLocation } from "react-router-dom";
import { listFromLcategory } from "../../../query/FoodListQuery.jsx";
import BarNavigate from "./../../../components/Common/BarNavigate";
import Modal from "../../../components/Refrigerator/FridgeManage/Modal.jsx";

const FoodList = () => {
  const location = useLocation();
  const category = location.state?.category;
  const [foodList, setFoodList] = useState([]);
  const [sortedFoodList, setSortedFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  useEffect(() => {
    const fetchFoodList = async () => {
      setLoading(true);
      const refrigeratorName = sessionStorage.getItem("selectedFridge"); // 세션 스토리지에서 refrigeratorName 가져오기
      try {
        const data = await listFromLcategory(refrigeratorName, category);
        setFoodList(data); // 데이터 설정
        setSortedFoodList(data); // 초기 로딩 시 정렬된 리스트 설정
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
    setSelectedOption(option);
  };
  // 음식 리스트 정렬 함수
  const sortFoodList = (option) => {
    let sortedList = [...foodList];
    switch (option) {
      case "이름 순":
        sortedList.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "등록일 순":
        sortedList.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        break;
      case "유통기한 순":
        sortedList.sort((a, b) => {
          const expiryA = new Date(a.expiryDate);
          const expiryB = new Date(b.expiryDate);
          const daysLeftA = Math.ceil(
            (expiryA - new Date()) / (1000 * 60 * 60 * 24)
          );
          const daysLeftB = Math.ceil(
            (expiryB - new Date()) / (1000 * 60 * 60 * 24)
          );
          return daysLeftA - daysLeftB;
        });
        break;
      default:
        break;
    }
    setSortedFoodList(sortedList);
    setShowPopup(false); // 팝업 닫기
  };

  // 검색 결과를 처리하는 함수
  const handleSearchResults = (results) => {
    // 현재 카테고리에 맞는 항목만 필터링
    const filteredResults = results.filter(
      (item) => item.lcategory === category
    );
    setSearchResults(filteredResults);
    setIsModalOpen(true); // 검색 결과 모달 열기
  };

  // 버튼 스타일
  const buttonStyle = (option) => ({
    width: 108,
    height: 56,
    borderRadius: 12,
    border:
      selectedOption === option ? "1px solid #2377EF" : "1px solid #E1E1E1",
    color: selectedOption === option ? "#2377EF" : "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    cursor: "pointer",
  });

  // 백그라운드 클릭 시 팝업 닫기
  const handleBackgroundClick = () => {
    setShowPopup(false);
  };

  // 팝업 내부 클릭 시 이벤트 전파 방지
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate option={`${category}`} alertPath="/addinfo/habit" />

      <div className="self-stretch pt-8">
        <SearchForm
          selectedFridge={sessionStorage.getItem("selectedFridge")}
          onSearchResults={handleSearchResults}
        />
      </div>

      <div
        style={{
          width: 342,
          height: 33,
          position: "relative",
          marginTop: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ fontWeight: 500, fontSize: 28 }}>{category}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <div
                style={{
                  marginRight: 4,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                총
              </div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>
                {sortedFoodList.length}개
              </div>
            </div>
            <img
              src="/assets/filter.png"
              alt="Filter"
              style={{ width: 16, height: 14, cursor: "pointer" }}
              onClick={togglePopup}
            />
          </div>
        </div>
      </div>

      <div className="self-stretch pt-5 mt-[16px]">
        {loading ? (
          <p>로딩 중...</p>
        ) : sortedFoodList.length === 0 ? (
          <p>{category}에 해당하는 음식이 없습니다.</p>
        ) : (
          sortedFoodList.map((food, index) => (
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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">검색 결과</h2>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((food, index) => (
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
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-8">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        </Modal>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 9999,
          }}
          onClick={handleBackgroundClick} // 백그라운드 클릭 시 팝업 닫기
        >
          <div
            style={{
              width: "390px",
              height: "258px",
              backgroundColor: "#FFFFFF",
              borderRadius: "24px 24px 0px 0px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={handlePopupClick} // 팝업 내부 클릭 시 이벤트 전파 방지
          >
            <div
              style={{
                width: "100%",
                height: "46px",
                fontWeight: 600,
                fontSize: "18px",
                marginLeft: "24px",
                boxSizing: "border-box",
              }}
            >
              조회 조건 설정
            </div>
            <div
              style={{
                width: 342,
                height: 56,
                marginTop: 15,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={buttonStyle("이름 순")}
                onClick={() => handleOptionClick("이름 순")}
              >
                이름 순
              </div>
              <div
                style={buttonStyle("등록일 순")}
                onClick={() => handleOptionClick("등록일 순")}
              >
                등록일 순
              </div>
              <div
                style={buttonStyle("유통기한 순")}
                onClick={() => handleOptionClick("유통기한 순")}
              >
                소비기한 순
              </div>
            </div>
            <div
              style={{
                width: 342,
                height: 56,
                borderRadius: 12,
                background: "#2377EF",
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => sortFoodList(selectedOption)} // 조회 버튼 클릭 시 정렬 및 팝업 닫기
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#FFFFFF",
                  margin: 0,
                }}
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

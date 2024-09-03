import React, { useState, useEffect } from 'react';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';
import CategoryFood from './../../components/Refrigerator/FridgeManage/CategoryFood';
import { fetchSavedBarcodes } from '../../query/FoodListQuery';
import DetailButton from "../../components/Common/DetailButton.jsx";
import Modal from "../../components/Refrigerator/FridgeManage/Modal.jsx";

const FridgeManagePage = () => {
    const [selectedFridge, setSelectedFridge] = useState(null);
    const [saveFoodList, setSaveFoodList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(3);
    const [searchResults, setSearchResults] = useState([]);  // 검색 결과 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);   // 모달 상태 추가


    useEffect(() => {
        const storedFridge = sessionStorage.getItem('selectedFridge');
        if (storedFridge) {
            setSelectedFridge(storedFridge);
        }
    }, []);

    useEffect(() => {
        if (selectedFridge) {
            setLoading(true);
            fetchSavedBarcodes(selectedFridge)
                .then((response) => {
                    setSaveFoodList(response || []);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setSaveFoodList([]);
        }
    }, [selectedFridge]);

    const groupByCategory = (foods) => {
        if (!Array.isArray(foods)) {
            console.error('Expected an array but got', foods);
            return {};
        }

        return foods.reduce((acc, food) => {
            if (!acc[food.lcategory]) {
                acc[food.lcategory] = [];
            }
            acc[food.lcategory].push(food);
            return acc;
        }, {});
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);  // 검색 결과를 상태에 저장
        setIsModalOpen(true);       // 검색 결과 모달을 엽니다.
    };

    const groupedFoodList = groupByCategory(saveFoodList);

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px]">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit"/>
            <FridgeSelect onSelectFridge={setSelectedFridge}/>
            <div className="self-stretch pt-3 text-lg font-semibold">
                {selectedFridge ? `선택된 냉장고: ${selectedFridge}` : '냉장고를 선택해주세요'}
            </div>
            <div className="self-stretch pt-[10px]">
                <CreateButton
                    option={"음식 추가하기"}
                    nextPath={`/Refrigerator/food/AddFood?fridge=${encodeURIComponent(selectedFridge)}`}
                    selectedFridge={selectedFridge}
                />
            </div>

            <div className="self-stretch pt-8">
                <SearchForm selectedFridge={selectedFridge} onSearchResults={handleSearchResults} />
            </div>

            <div className="self-stretch pt-5">
                {loading ? (
                    <p>로딩 중...</p>
                ) : selectedFridge === null ? (
                    <p>냉장고를 선택하면 해당 냉장고에 있는 음식이 나와요</p>
                ) : Object.keys(groupedFoodList).length === 0 ? (
                    <p>선택한 냉장고의 음식이 없습니다.</p>
                ) : (
                    Object.keys(groupedFoodList).map((category) => (
                        <div key={category}>
                            <CategoryFood option={category}/>
                            {groupedFoodList[category].slice(0, itemsToShow).map((food, index) => (
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
                    ))
                )}
            </div>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div className="p-4">
                        {/* 검색 결과 안내 문구 */}
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
                            // 검색 결과가 없을 때 표시할 내용
                            <p className="text-gray-500 text-center mt-8">검색 결과가 없습니다.</p>
                        )}
                    </div>
                </Modal>
            )}

        </main>
    );
};

export default FridgeManagePage;

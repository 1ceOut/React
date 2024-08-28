import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailButton from './../../components/Common/DetailButton';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';
import CategoryFood from './../../components/Refrigerator/FridgeManage/CategoryFood';
import { fetchSavedBarcodes } from '../../query/FoodListQuery';

const FridgeManagePage = () => {
    const [showMore, setShowMore] = useState(false);
    const [selectedFridge, setSelectedFridge] = useState(null);
    const [saveFoodList, setSaveFoodList] = useState([]);

    const handleShowMore = () => {
        setShowMore(true);
    };

    useEffect(() => {
        if (selectedFridge) {
            fetchSavedBarcodes(selectedFridge).then((response) => {
                setSaveFoodList(response);
            });
        } else {
            setSaveFoodList([]); // 냉장고가 선택되지 않았을 때 음식 목록 초기화
        }
    }, [selectedFridge]);

    const groupByCategory = (foods) => {
        return foods.reduce((acc, food) => {
            if (!acc[food.lcategory]) {
                acc[food.lcategory] = [];
            }
            acc[food.lcategory].push(food);
            return acc;
        }, {});
    };

    const groupedFoodList = groupByCategory(saveFoodList);

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px]">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit" />
            <FridgeSelect onSelectFridge={setSelectedFridge} />

            <div className="self-stretch pt-[10px]">
                <CreateButton
                    option={"음식 추가하기"}
                    nextPath={`/Refrigerator/food/AddFood?fridge=${encodeURIComponent(selectedFridge)}`}
                    selectedFridge={selectedFridge}
                />
            </div>

            <div className="self-stretch pt-8">
                <SearchForm />
            </div>

            {/* 냉장고가 선택되지 않았을 때와 선택된 냉장고가 비어있을 때 메시지 표시 */}
            <div className="self-stretch pt-5">
                {selectedFridge === null ? (
                    <p>냉장고를 선택하면 해당 냉장고에 있는 음식이 나와요</p>
                ) : Object.keys(groupedFoodList).length === 0 ? (
                    <p>냉장고 텅텅텅텅 비었음, ㅋ</p>
                ) : (
                    Object.keys(groupedFoodList).map((category) => (
                        <div key={category}>
                            <CategoryFood option={category} />
                            {groupedFoodList[category].map((food, index) => (
                                <DetailButton
                                    key={index}
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

            {!showMore && selectedFridge && Object.keys(groupedFoodList).length > 0 && (
                <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShowMore}>
                    <span>더보기</span>
                    <img
                        src="/assets/downarrow.png"
                        alt='down arrow'
                        style={{ marginLeft: 8 }}
                    />
                </div>
            )}

            {showMore && selectedFridge && (
                <div className="self-stretch pt-5">
                    {Object.keys(groupedFoodList).map((category) => (
                        <div key={category}>
                            <CategoryFood option={category} />
                            {groupedFoodList[category].map((food, index) => (
                                <DetailButton
                                    key={index}
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
                    ))}
                </div>
            )}
        </main>
    );
};

export default FridgeManagePage;

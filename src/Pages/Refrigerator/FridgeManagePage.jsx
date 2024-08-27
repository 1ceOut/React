import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailButton from './../../components/Common/DetailButton';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';
import CategoryFood from './../../components/Refrigerator/FridgeManage/CategoryFood';

const FridgeManagePage = () => {
    const [showMore, setShowMore] = useState(false);
    const [selectedFridge, setSelectedFridge] = useState(null); // 선택된 냉장고 상태
    const [saveFoodList, setSaveFoodList] = useState([]); // 음식 목록 상태

    const handleShowMore = () => {
        setShowMore(true);
    };

    useEffect(() => {
        if (selectedFridge) {
            fetchSavedBarcodes(selectedFridge);
        }
    }, [selectedFridge]);

    const fetchSavedBarcodes = async (selectedFridge) => {
        try {
            // 쿼리 파라미터에 selectedFridge를 올바르게 포함시키는지 확인
            const response = await axios.get(`http://localhost:9000/api/list`, {
                params: {
                    refrigeratorName: selectedFridge
                }
            });
            console.log(response.data);
            setSaveFoodList(response.data);
        } catch (error) {
            console.error('Error fetching saved barcodes', error);
        }
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px]">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit" />
            <FridgeSelect onSelectFridge={setSelectedFridge} /> {/* 선택된 냉장고 업데이트 함수 전달 */}

            <div className="self-stretch pt-[10px]">
                <CreateButton
                    option={"음식 추가하기"}
                    nextPath={`/Refrigerator/food/AddFood?fridge=${encodeURIComponent(selectedFridge)}`} // 선택된 냉장고 이름 포함
                    selectedFridge={selectedFridge} // 선택된 냉장고 전달
                />
            </div>

            <div className="self-stretch pt-8">
                <SearchForm />
            </div>

            {/* 선택된 냉장고의 음식 목록을 동적으로 렌더링 */}
            <div className="self-stretch pt-5">
                {saveFoodList.map((food, index) => (
                    <div key={index}>
                        <CategoryFood option={food.lcategory} />
                        <DetailButton
                        productName={food.productName}
                        expiryDate={food.expiryDate}
                        count={food.count}
                        productType={food.productType}
                        createdDate={food.createdDate}
                        lcategory={food.lcategory}
                        scategory={food.scategory}
                            option={food.productName}
                        />
                    </div>
                ))}
            </div>

            {!showMore && (
                <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShowMore}>
                    <span>더보기</span>
                    <img
                        src="/assets/downarrow.png"
                        alt='down arrow'
                        style={{ marginLeft: 8 }}
                    />
                </div>
            )}

            {showMore && (
                <div className="self-stretch pt-5">
                    {/* 추가적인 음식 목록을 렌더링 */}
                    {saveFoodList.map((food, index) => (
                        <div key={index}>
                            <CategoryFood option={food.lcategory} />
                            <DetailButton
                                productName={food.productName}
                                expiryDate={food.expiryDate}
                                count={food.count}
                                productType={food.productType}
                                createdDate={food.createdDate}
                                lcategory={food.lcategory}
                                scategory={food.scategory}
                                option={food.productName}
                            />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default FridgeManagePage;

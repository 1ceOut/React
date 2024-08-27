import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailButton from './../../components/Common/DetailButton';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';
import CategoryFood from './../../components/Refrigerator/FridgeManage/CategoryFood';

const FridgeManagePage = () => {
    const [showMore, setShowMore] = useState(false);
    const [selectedFridge, setSelectedFridge] = useState(null); // 선택된 냉장고 상태

    const handleShowMore = () => {
        setShowMore(true);
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

            <div className="self-stretch pt-5">
                <CategoryFood option={"유제품"} />
                <DetailButton foodCategory={"cheese"} expireDate={"2024.08.30"} option={"서울우유 체다치즈"} />
                <DetailButton foodCategory={"milkcow"} expireDate={"2024.08.11"} option={"서울우유 플레인 요거트 순수무가당"} />
                <DetailButton foodCategory={"milkcow"} expireDate={"2024.08.08"} option={"매일유업 매일바이오 제로 요구르트"} />
            </div>

            <div className="self-stretch pt-5">
                <CategoryFood option={"육류"} />
                <DetailButton foodCategory={"chicken"} expireDate={"2024.08.13"} option={"[올마레]춘천 국물 닭갈비 떡볶이"} />
                <DetailButton foodCategory={"meet"} expireDate={"2024.08.10"} option={"[브룩클린688] 호주산 토시살 구이용 냉장..."} />
                <DetailButton foodCategory={"groundmeat"} expireDate={"2024.08.07"} option={"국내산 다짐 쇠고기 600g"} />
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
                    <CategoryFood option={"해산물"} />
                    <DetailButton foodCategory={"seafood"} expireDate={"2024.08.15"} option={"노르웨이산 연어"} />
                    <DetailButton foodCategory={"shrimp"} expireDate={"2024.08.12"} option={"새우 1kg"} />
                    <CategoryFood option={"채소"} />
                    <DetailButton foodCategory={"vegetable"} expireDate={"2024.08.09"} option={"시금치"} />
                    <DetailButton foodCategory={"vegetable"} expireDate={"2024.08.10"} option={"방울토마토"} />
                </div>
            )}
        </main>
    );
};

export default FridgeManagePage;

import React, { useState, useEffect } from 'react';
import MenuNavigate from '../../../components/Common/MenuNavigate';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchNutritionInfo } from '../../../query/FoodDataSearch';
import ConfirmModal from '../../../components/Mypage/FridgeDelete/ConfirmModal.jsx';
import { foodDelete, updateCountByname } from "../../../query/FoodListQuery.jsx";

const FoodDetail = () => {
    const { state } = useLocation();
    const {
        id,
        expiryDate,
        option,
        count: initialCount,
        productType,
        createdDate,
        lcategory,
        scategory
    } = state || {};

    const [count, setCount] = useState(initialCount); // 상태 초기화
    const [nutritionInfo, setNutritionInfo] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await fetchNutritionInfo(option, scategory, productType);
            setNutritionInfo(data);
        };

        fetchInfo();
    }, [option, scategory, productType]);

    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${year}.${month}.${day}`;
    };

    const handleSave = async () => {
        try {
            // 서버에 상태를 업데이트
            await updateCountByname(option, id, count);

            // 알림 창 띄우기
            alert(`저장된 갯수: ${count}`);
            setCount(count);
            navigate('/fridge/fridgemanage');
        } catch (error) {
            console.error("저장 중 오류 발생:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false); // 모달 닫기

        await foodDelete(option, id);
        navigate('/fridge/fridgemanage');
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen overflow-auto">
            <MenuNavigate option={"상품 상세"} alertPath="/addinfo/habit"/>
            <div className="relative w-[342px] h-[60px] mt-5 flex items-center rounded-xl">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-[60px] h-[60px] rounded-xl bg-[#F0F0F0]">
                        <img src="/assets/milkcow.png" alt="" className="w-[40px] h-[40px]"/>
                    </div>
                    <div>
                        <div className="text-[#767676] text-[14px] font-normal ml-3">{productType}</div>
                        <div className="text-[18px] mt-2 ml-3">{option}</div>
                    </div>
                </div>
                <div className="absolute right-2 bottom-2 text-[14px] cursor-pointer">
                    <img
                        src="/assets/trashbox.png"
                        alt="Trashbox"
                        className="w-[28px] h-[28px]"
                        onClick={handleDeleteClick} // 삭제 클릭 시 모달 열기
                    />
                </div>
            </div>
            <div className="w-[342px] h-[87px] mt-8">
                <p className="text-[16px]">갯수</p>
                <input
                    type="text"
                    value={count} // value를 count로 설정
                    onChange={(e) => setCount(e.target.value)} // 상태를 업데이트
                    className="w-[342px] h-[56px] rounded-xl mt-3 border border-[#E1E1E1] text-[16px] px-5 box-border block leading-[19px]"
                />
            </div>
            <div className="w-[342px] h-[87px] mt-5">
                <p className="text-[16px] font-medium">유통기한</p>
                <div className="w-[342px] h-[56px] rounded-xl mt-3 bg-[#F4F4F4] relative">
                    <p className="text-[#9C9C9C] font-medium text-[16px] absolute top-5 left-5">
                        {formatDate(expiryDate)}
                    </p>
                </div>
            </div>
            <div className="w-[342px] h-[87px] mt-5">
                <p className="text-[16px] font-medium">등록일</p>
                <div className="w-[342px] h-[56px] rounded-xl mt-3 bg-[#F4F4F4] relative">
                    <p className="text-[#9C9C9C] font-medium text-[16px] absolute top-5 left-5">
                        {formatDate(createdDate)}
                    </p>
                </div>
            </div>
            <div className="w-[390px] h-[16px] bg-[#F4F4F4] mt-8"></div>
            {nutritionInfo ? (
                <div className="border-2 border-black w-[342px] font-sans text-[#333] p-2 mt-8">
                    <div className="text-left">
                        <h2 className="text-[1.5em] mb-2">영양정보</h2>
                        <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#aaa" }}>
                            총 내용량 {nutritionInfo.personal * count}g
                            ({nutritionInfo.personal}{nutritionInfo.personal_unit} x {count}개)
                        </p>
                    </div>

                    <table className="w-full border-collapse mt-2">
                        <thead>
                        <tr>
                            <th className="text-left text-[0.8em] text-[#777] pb-1 border-b border-[#ddd]">영양소</th>
                            <th className="text-right text-[0.8em] text-[#777] pb-1 border-b border-[#ddd]">{nutritionInfo.personal}({nutritionInfo.personal_unit})당 영양성분</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">열량</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.kcal) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">수분</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.water) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">탄수화물</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.carbon) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">단백질</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.protein) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">당분</td>
                            <td className="p-2 border-b border-[#eee] text-right">{nutritionInfo.sugar || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">지방</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.fat) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">콜레스테롤</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.cholesterol) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">나트륨</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.salt) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">섬유질</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.fiber) || '정보 없음'}</td>
                        </tr>
                        <tr>
                            <td className="p-2 border-b border-[#eee]">칼슘</td>
                            <td className="p-2 border-b border-[#eee] text-right">{Math.floor(nutritionInfo.calcium) || '정보 없음'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>영양정보 없는딩?</p>
            )}
            <div className="w-[342px] flex justify-between mt-8">
                <button
                    onClick={handleSave}
                    className="w-[330px] h-[48px] rounded-xl border border-[#009B77] bg-[#009B77] text-white text-[16px] font-medium"
                >
                    수정
                </button>
            </div>
            <ConfirmModal
                option={option}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </main>
    );
};

export default FoodDetail;

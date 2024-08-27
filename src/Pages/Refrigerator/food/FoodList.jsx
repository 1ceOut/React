import React, { useState, useEffect } from "react";
import axios from 'axios';
import DetailButton from "../../../components/Common/DetailButton";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import SearchForm from "../../../components/Refrigerator/Common/SearchForm";

const FoodList = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태 추가
    const [savedBarcodes, setSavedBarcodes] = useState([]);

    // 바코드 목록을 가져오는 함수
    const fetchSavedBarcodes = async () => {
        try {
            const response = await axios.get('/api/list');
            setSavedBarcodes(response.data);
        } catch (error) {
            console.error('Error fetching saved barcodes', error);
        }
    };

    useEffect(() => {
        fetchSavedBarcodes();
    }, []);

    // 바코드 삭제 함수
    const deleteBarcode = async (productName) => {
        try {
            await axios.delete(`/api/barcodes/${productName}`);
            fetchSavedBarcodes();
            alert('상품 삭제함');
        } catch (error) {
            console.error('Error deleting barcode', error);
        }
    };

    // 팝업 토글 함수
    const togglePopup = () => setShowPopup(!showPopup);

    // 옵션 클릭 핸들러
    const handleOptionClick = (option) => {
        setSelectedOption(option); // 버튼 클릭 시 선택된 옵션 업데이트
    };

    // 버튼 스타일
    const buttonStyle = (option) => ({
        width: 108,
        height: 56,
        borderRadius: 12,
        border: selectedOption === option ? '1px solid #2377EF' : '1px solid #E1E1E1',
        color: selectedOption === option ? '#2377EF' : '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 400,
        fontSize: 16,
        cursor: 'pointer',
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
            <MenuNavigate option="유제품 전체보기" alertPath="/addinfo/habit" />

            <div className="self-stretch pt-8">
                <SearchForm />
            </div>

            {savedBarcodes.length === 0 ? (
                <p>등록된 상품 없음</p>
            ) : (
                <div
                    style={{
                        width: 342,
                        height: 33,
                        position: 'relative',
                        marginTop: '32px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        <div style={{ fontWeight: 500, fontSize: 28 }}>유제품</div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 0,
                                bottom: 0
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: 8
                                }}
                            >
                                <div
                                    style={{
                                        marginRight: 4,
                                        fontWeight: 500,
                                        fontSize: 14
                                    }}
                                >
                                    총
                                </div>
                                <div style={{ fontWeight: 500, fontSize: 14 }}>20개</div>
                            </div>
                            <img
                                src="/assets/filter.png"
                                alt="Filter"
                                style={{ width: 16, height: 14, cursor: 'pointer' }}
                                onClick={togglePopup}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="self-stretch pt-5 mt-[16px]">
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.20"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.20"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.20"
                    option="매일유업 매일바이오 제로 요구르트"
                />
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.15"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.15"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.15"
                    option="매일유업 매일바이오 제로 요구르트"
                />
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.12"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.12"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.12"
                    option="매일유업 매일바이오 제로 요구르트"
                />
            </div>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        zIndex: 9999
                    }}
                    onClick={handleBackgroundClick} // 백그라운드 클릭 시 팝업 닫기
                >
                    <div
                        style={{
                            width: '390px',
                            height: '258px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px 24px 0px 0px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handlePopupClick} // 팝업 내부 클릭 시 이벤트 전파 방지
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '46px',
                                fontWeight: 600,
                                fontSize: '18px',
                                marginLeft: '24px',
                                boxSizing: 'border-box'
                            }}
                        >
                            조회 조건 설정
                        </div>
                        <div
                            style={{
                                width: 342,
                                height: 56,
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                style={buttonStyle('이름 순')}
                                onClick={() => handleOptionClick('이름 순')}
                            >
                                이름 순
                            </div>
                            <div
                                style={buttonStyle('등록일 순')}
                                onClick={() => handleOptionClick('등록일 순')}
                            >
                                등록일 순
                            </div>
                            <div
                                style={buttonStyle('유통기한 순')}
                                onClick={() => handleOptionClick('유통기한 순')}
                            >
                                유통기한 순
                            </div>
                        </div>
                        <div
                            style={{
                                width: 342,
                                height: 56,
                                borderRadius: 12,
                                background: '#2377EF',
                                marginTop: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    margin: 0
                                }}
                            >
                                조회
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default FoodList;

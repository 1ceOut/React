import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅 추가
import MenuNavigate from '../../../components/Common/MenuNavigate';

const AddInput = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
    const [additionalSelectValue, setAdditionalSelectValue] = useState('');
    const [productName, setProductName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [count, setCount] = useState('');

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);
    
    const navigate = useNavigate(); // useNavigate 훅 초기화

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value === 'processedFood' || value === 'rawMaterial') {
            setShowAdditionalSelect(true);
            setAdditionalSelectValue('');
        } else {
            setShowAdditionalSelect(false);
            setAdditionalSelectValue('');
        }
    };

    const handleAdditionalChange = (event) => {
        setAdditionalSelectValue(event.target.value);
    };

    const isFormValid = () => {
        return (
            selectedOption &&
            (!showAdditionalSelect || additionalSelectValue) &&
            productName &&
            expiryDate &&
            count
        );
    };

    const handleNavigate = () => {
        if (isFormValid()) {
            navigate('/fridge/fridgemanage'); // 페이지 이동
        }
    };

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}>
            <MenuNavigate option={"식품 추가"} alertPath="/addinfo/habit" />
            <div style={{ width: 342, height: 134, marginTop: 24 }}>
                <p style={{ width: 342, height: 76, fontWeight: 600, fontSize: 28 }}>
                    추가 입력을<br />
                    선택 하셨어요.
                </p>
                <p style={{ width: 342, height: 44, marginTop: 14, fontWeight: 500, fontSize: 15, color: '#767676' }}>
                    직접 입력하여 정확하게 표기를 할 수 있지만 실수할 경우 <br />
                    잘못 표기되니 잘 확인해 주세요!
                </p>
            </div>
            <div style={{ width: 342, marginTop: 49 }}>
                <select
                    id="foodType"
                    value={selectedOption}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        height: '56px',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #E1E1E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: '#767676',
                    }}
                >
                    <option value="" disabled>식품유형을 선택해주세요</option>
                    <option value="processedFood">가공식품</option>
                    <option value="rawMaterial">원자재성식품</option>
                </select>
            </div>
            {showAdditionalSelect && (
                <div style={{ width: 342, marginTop: 12 }}>
                    <select
                        id="additionalSelect"
                        value={additionalSelectValue}
                        onChange={handleAdditionalChange}
                        style={{
                            width: '100%',
                            height: '56px',
                            padding: '10px',
                            borderRadius: '12px',
                            border: '1px solid #E1E1E1',
                            backgroundColor: '#FFFFFF',
                            fontSize: '15px',
                            color: '#767676',
                        }}
                    >
                        <option value="" disabled>식품 상세</option>
                        <option value="option1">가공식품 상세</option>
                        <option value="option2">원자재성식품 상세</option>
                    </select>
                </div>
            )}
            <div style={{ width: 342, marginTop: 12 }}>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="제품 이름을 적어주세요"
                    style={{
                        width: '100%',
                        height: '56px',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #E1E1E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: '#767676',
                    }}
                />
            </div>
            <div style={{ width: 342, marginTop: 12 }}>
                <input
                    type="date"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="유통기한을 적어주세요"
                    style={{
                        width: '100%',
                        height: '56px',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #E1E1E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: '#767676',
                    }}
                />
            </div>
            <div style={{ width: 342, marginTop: 12 }}>
                <input
                    type="text"
                    id="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="상품 갯수를 적어주세요"
                    style={{
                        width: '100%',
                        height: '56px',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #E1E1E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: '#767676',
                    }}
                />
            </div>
            <button
                disabled={!isFormValid()}  // 조건에 따라 버튼 비활성화
                onClick={handleNavigate}  // 페이지 이동 처리
                style={{
                    width: '342px',
                    height: '56px',
                    borderRadius: '12px',
                    background: isFormValid() ? '#2377EF' : '#A9A9A9',  // 유효하면 파란색, 아니면 회색
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: '56px',
                    fontSize: 16,
                    color: '#FFFFFF',
                    cursor: isFormValid() ? 'pointer' : 'not-allowed',
                }}
            >
                생성
            </button>
        </main>
    );
};

export default AddInput;

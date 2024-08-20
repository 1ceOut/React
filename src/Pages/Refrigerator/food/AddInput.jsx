import React, { useState } from 'react';
import MenuNavigate from '../../../components/Common/MenuNavigate';
import NextButton from '../../../components/AddInfo/Common/NextButton';

const AddInput = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
    const [additionalSelectValue, setAdditionalSelectValue] = useState('');
    const [productName, setProductName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [count, setCount] = useState('');

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
        // 모든 필드가 입력되었는지 확인
        return (
            selectedOption &&
            (!showAdditionalSelect || additionalSelectValue) &&
            productName &&
            expiryDate &&
            count
        );
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"추가 입력"} alertPath="/addinfo/habit" />
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
            <NextButton isEnabled={isFormValid()} nextPath="/Refrigerator/food/FoodDetail" />
        </main>
    );
};

export default AddInput;

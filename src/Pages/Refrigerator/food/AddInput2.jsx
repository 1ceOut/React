import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuNavigate from '../../../components/Common/MenuNavigate';
import axios from 'axios';
import useProductStore from '../../../store/useProductStore';
import useUserStore from '../../../store/useUserStore';

const PRODUCT_TYPES = {
    RECIPE: '가공식품',
    FOOD: '원자재성 식품'
};

const AddInput2 = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // location.state에서 이전 페이지에서 넘겨준 상태를 가져옵니다.
    const { barcode: initialBarcode, productName: initialProductName, expiryDate: initialExpiryDate, refrigeratorName } = location.state || {};
    console.log(refrigeratorName);
    const [productName, setProductName] = useState(initialProductName || '');
    const [expiryDate, setExpiryDate] = useState(initialExpiryDate || '');
    const [barcode, setBarcode] = useState(initialBarcode || '');
    const [count, setCount] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [additionalSelectValue, setAdditionalSelectValue] = useState('');
    const [subcategoryValue, setSubcategoryValue] = useState('');
    const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const { lcategories, scategories, fetchLcategories, fetchScategories } = useProductStore();
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    useEffect(() => {
        if (initialBarcode) setBarcode(initialBarcode);
        if (initialProductName) setProductName(initialProductName);
        if (initialExpiryDate) setExpiryDate(initialExpiryDate);
    }, [initialBarcode, initialProductName, initialExpiryDate]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (selectedOption) {
                await fetchLcategories(selectedOption === 'processedFood' ? PRODUCT_TYPES.RECIPE : PRODUCT_TYPES.FOOD);
                setShowAdditionalSelect(true);
            } else {
                setShowAdditionalSelect(false);
                setAdditionalSelectValue('');
                setSubcategoryValue('');
            }
        };

        fetchCategories();
    }, [selectedOption]);

    useEffect(() => {
        if (additionalSelectValue) {
            fetchScategories(selectedOption === 'processedFood' ? PRODUCT_TYPES.RECIPE : PRODUCT_TYPES.FOOD, additionalSelectValue);
        } else {
            setSubcategoryValue('');
        }
    }, [additionalSelectValue]);

    useEffect(() => {
        setIsEnabled(productName && expiryDate && count && selectedOption && (!showAdditionalSelect || (additionalSelectValue && subcategoryValue)));
    }, [productName, expiryDate, count, selectedOption, additionalSelectValue, subcategoryValue, showAdditionalSelect]);

    useEffect(() => {
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate('/login');
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    const saveBarcode = async () => {
        const product = {
            barcode,
            productName,
            expiryDate,
            count,
            productType: selectedOption,
            lcategory: additionalSelectValue,
            scategory: subcategoryValue,
            refrigeratorName: refrigeratorName || '기본 냉장고 이름', // 냉장고 이름을 서버로 전달
            userId
        };

        try {
            const response = await axios.post('http://localhost:9000/api/barcodes', product);
            if (response.data.exists) {
                alert('중복된 바코드가 이미 존재합니다.');
            } else {
                alert(`${product.productName}이 성공적으로 저장되었습니다.`);
                navigate('/Refrigerator/food/FoodList');
            }
        } catch (error) {
            console.error('DB에 제품을 저장하는 중 오류 발생', error);
        }
    };

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-screen`}>
            <MenuNavigate option={"추가 입력"} alertPath="/addinfo/habit"/>
            <div style={{width: 342, height: 134, marginTop: 24}}>
                <p style={{width: 342, height: 76, fontWeight: 600, fontSize: 28}}>
                    추가 입력을<br/>
                    선택 하셨어요.
                </p>
                <p style={{width: 342, height: 44, marginTop: 14, fontWeight: 500, fontSize: 15, color: '#767676'}}>
                    직접 입력하여 정확하게 표기를 할 수 있지만 실수할 경우 <br/>
                    잘못 표기되니 잘 확인해 주세요!
                </p>
            </div>
            <div style={{width: 342, marginTop: 49}}>
                <select
                    id="foodType"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
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
                <div style={{width: 342, marginTop: 12}}>
                    <select
                        id="additionalSelect"
                        value={additionalSelectValue}
                        onChange={(e) => setAdditionalSelectValue(e.target.value)}
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
                        <option value="" disabled>식품 상세를 선택해주세요</option>
                        {lcategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            )}
            {showAdditionalSelect && additionalSelectValue && scategories.length > 0 && (
                <div style={{width: 342, marginTop: 12}}>
                    <select
                        id="subcategorySelect"
                        value={subcategoryValue}
                        onChange={(e) => setSubcategoryValue(e.target.value)}
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
                        <option value="" disabled>소분류를 선택해주세요</option>
                        {scategories.map((scategory, index) => (
                            <option key={index} value={scategory}>{scategory}</option>
                        ))}
                    </select>
                </div>
            )}
            <div style={{width: 342, marginTop: 12}}>
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
            <div style={{width: 342, marginTop: 12}}>
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
            <div style={{width: 342, marginTop: 12}}>
                <input
                    type="number"
                    id="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="수량을 적어주세요"
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
            <div
                style={{
                    width: 342,
                    height: 56,
                    borderRadius: 12,
                    border: "1px solid #E1E1E1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 32
                }}
                className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] h-14 cursor-pointer ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={isEnabled ? saveBarcode : null} // 클릭 시 제출 함수 호출
            >
                <p style={{fontWeight: 500, fontSize: 16}}>냉장고 등록하기</p>
            </div>
        </main>
    );
};

export default AddInput2;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import NextButton from './../Common/NextButton';
import useProductStore from "../../../store/useProductStore.jsx";
import Tags from "@yaireo/tagify/react";
import '@yaireo/tagify/dist/tagify.css'
import useAddInfo from "../../../store/useAddInfo.js";

const PRODUCT_TYPES = {
    RECIPE: '가공식품',
    FOOD: '원자재성 식품'
};

const InputForm = () => {
    const tagifyRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const {setFavorite} = useAddInfo();

    const [selectedOption, setSelectedOption] = useState("");
    const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
    const [additionalSelectValue, setAdditionalSelectValue] = useState("");
    const [subcategoryValue, setSubcategoryValue] = useState('');
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

    const [animationClass, setAnimationClass] = useState("animate-slideInUp");
    const { lcategories, fetchLcategories } = useProductStore();

    useEffect(() => {
        setAnimationClass("animate-slideInUp");

        return () => {
            setAnimationClass("animate-slideOutDown");
        };
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            if (selectedOption) {
                await fetchLcategories(selectedOption === '가공식품' ? PRODUCT_TYPES.RECIPE : PRODUCT_TYPES.FOOD);
                setShowAdditionalSelect(true);
            } else {
                setShowAdditionalSelect(false);
                setAdditionalSelectValue('');
                setSubcategoryValue('');
            }
        };

        fetchCategories();
    }, [selectedOption]);

    const handleAdditionalSelectChange = (e) => {
        const selectedValue = e.target.value;
        setAdditionalSelectValue(selectedValue);

        // Tags에 선택된 값을 추가
        if (tagifyRef.current) {
            tagifyRef.current.addTags([selectedValue]);
            setFavorite(tagifyRef.current.value)
        }
    };

    const handleTagChange = (e) => {
        // 태그가 삭제될 때마다 NextButton의 활성화 상태를 업데이트
        console.groupCollapsed(tagifyRef.current)
        const tags = e.detail.value; // 현재 태그 목록
        const isEnabled = tags.length > 0; // 태그가 하나라도 있으면 활성화
        setIsNextButtonEnabled(isEnabled);
    };

    return (
        <div
            className={`${animationClass} flex flex-col items-center pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}
        >
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
                    <option value="가공식품">가공식품</option>
                    <option value="원자재성 식품">원자재성식품</option>
                </select>
            </div>
            {showAdditionalSelect && (
                <div style={{width: 342, marginTop: 12}}>
                    <select
                        id="additionalSelect"
                        value={additionalSelectValue}
                        onChange={handleAdditionalSelectChange}
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
            <div style={{width: 342, marginTop: 12,marginBottom: 24}}>
                <Tags
                    tagifyRef={tagifyRef}
                    settings={{
                        maxTags: 15,
                        userInput: false,
                    }}
                    defaultValue="" // initial value
                    onChange={handleTagChange}
                    userInput={false}
                    style={{ width: '100%', fontSize: '15px', padding: '5px', marginTop:'30px'}}
                />
            </div>
            <NextButton isEnabled={isNextButtonEnabled} nextPath="/addinfo/bodyinfo" />
        </div>
    );
};

export default InputForm;
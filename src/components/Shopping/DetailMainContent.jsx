import React, {useRef, useState} from 'react';
import HorizontalLine from './../Common/HorizontalLine';
import {PropTypes} from 'prop-types';
import DetailItems from "./ShoppingDetail/DetailItems.jsx";
import {useQuery} from "@tanstack/react-query";
import {BestShoppingList} from "../../query/ShopQuery.js";
import storeDummyData from "../../testdata/shopingdata.json";
import Tags from "@yaireo/tagify/react";
import {Radio, RadioGroup} from "@mui/joy";
import Button from '@mui/joy/Button';

const DetailMainContent = ({setIsModalVisible}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const tagifyRef = useRef();
    const [priceFilter, setPriceFilter] = useState("low");
    const [discount, setDiscount] = useState(false);
    const [review, setReview] = useState(false);
    const [dataList, setDataList] = useState([]);

    const handleClick = () => {
        setModalVisible(true);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setIsModalVisible(false);
    };

    const handleInit = () => {
        setDiscount(false);
        setReview(false);
        setPriceFilter("low");
        tagifyRef.current.removeAllTags();
    }

    const addFilter = (e) => {
        tagifyRef.current.addTags(e.target.value);
    }

    const deleteFilter = (e) => {
        tagifyRef.current.removeTag(e.target.value);
    }

    const handleCheckboxChange = (filterType, setFilter) => (e) => {
        if (filterType) {
            deleteFilter(e);
        } else {
            addFilter(e);
        }
        setFilter(!filterType);
    };

    const {data: storedata, isLoading, isError} = useQuery({
        queryKey: ["BestShoppingList"],
        queryFn: BestShoppingList,
        staleTime: Infinity,
        cacheTime: 86400000,
        refetchOnReconnect: false,
        meta: {persist: true},
        select: (data) => {
            return data.length === 0 ? storeDummyData : data;
        }
    });

    const sortedData = React.useMemo(() => {
        if (!storedata) return storeDummyData;

        // 문자열을 숫자로 변환하는 함수
        const parsePrice = (price) => Number(price.replace(/[^\d]+/g, ""));

        // 가격 정렬 함수
        const sortByPrice = (a, b) => parsePrice(a.price) - parsePrice(b.price);

        // 리뷰 정렬 함수
        const sortByReviewCount = (a, b) => {
            const totalA = parsePrice(b.review_count);
            const totalB = parsePrice(a.review_count);
            // 할인율이 높은 순으로 정렬
            if (totalB !== totalA) {
                return totalA - totalB;
            }

            // 할인율이 같을 경우 높은 가격 순으로 정렬
            if (priceFilter==="low") return parsePrice(a.price) - parsePrice(b.price);
            else return parsePrice(b.price) - parsePrice(a.price);
        };

        const sortByDiscountAndPrice = (a, b) => {
            const discountA = Number(a.discount_percent.replace("%", ""));
            const discountB = Number(b.discount_percent.replace("%", ""));

            // 할인율이 높은 순으로 정렬
            if (discountB !== discountA) {
                return discountB - discountA;
            }

            // 할인율이 같을 경우 높은 가격 순으로 정렬
            if (priceFilter==="low") return parsePrice(a.price) - parsePrice(b.price);
            else return parsePrice(b.price) - parsePrice(a.price);
        };

        // 할인 + 리뷰 정렬 함수
        const sortByDiscount = (a, b) => {
            const totalA = parsePrice(a.review_count) + Number(a.discount_percent.replace("%", ""));
            const totalB = parsePrice(b.review_count) + Number(b.discount_percent.replace("%", ""));
            // 할인율이 높은 순으로 정렬
            if (totalB !== totalA) {
                return totalB - totalA;
            }

            // 할인율이 같을 경우 높은 가격 순으로 정렬
            if (priceFilter==="low") return parsePrice(a.price) - parsePrice(b.price);
            else return parsePrice(b.price) - parsePrice(a.price);
        };

        // 필터링 및 정렬
        let filteredData = storedata;

        if (discount) {
            filteredData = filteredData.filter((item) => item.discount_percent !== null);
        }

        // 기본적으로 가격으로 정렬
        filteredData.sort(sortByPrice);
        if (priceFilter === "high") {
            filteredData.reverse();
        }

        // 할인과 리뷰가 모두 있는 경우 할인으로 정렬
        if (discount && review) {
            return filteredData.sort(sortByDiscount);
        } else if (discount) {
            return filteredData.sort(sortByDiscountAndPrice);
        } else if (review) {
            return filteredData.sort(sortByReviewCount);
        } else {
            return filteredData;
        }
    }, [storedata, discount, review, priceFilter]);

    return (
        <div className="max-h-[830px]">
            <div className='self-stretch mt-[30px] mx-auto max-w-[342px]'>
                <div className='flex justify-between items-center h-6'>
                    <div className='font-medium text-[18px]'>상세필터</div>
                    <div>
                        <img src="/assets/filter.png" alt="필터사진" className='cursor-pointer' onClick={handleClick}/>
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-3 mt-8'>
                    <Tags
                        tagifyRef={tagifyRef}
                        settings={{
                            maxTags: 15,
                            userInput: false,
                        }}
                        defaultValue="" // initial value
                        userInput={false}
                        onRemove={(e) => {
                            if (e.detail.data.value === "할인율 순") {
                                setDiscount(false);
                            }
                            else setReview(false);

                        }}
                        style={{width: '100%', fontSize: '15px', padding: '5px', marginTop: '30px'}}
                    />
                </div>
                <div className='mt-[10px] mb-8'>
                </div>
                <div className="max-h-[500px] overflow-y-auto overscroll-y-none">
                    <div className='w-[340px]'>
                        {isModalVisible && (
                            <div className='w-[390px]'>
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-50"
                                    onClick={closeModal}
                                ></div>

                                <div className="fixed bg-white w-[390px] h-[408px] px-6 z-50 rounded-2xl">
                                    <div className="flex justify-between items-center mt-1 h-[46px]">
                                        <div className="text-lg font-bold">상세 필터</div>
                                        <button onClick={closeModal} className="text-lg font-bold">
                                            &times;
                                        </button>
                                    </div>
                                    <div className="cursor-pointer mt-8 flex justify-evenly w-[342px] flex-col">
                                        <div>
                                            <div className='font-semibold text-[16px] mb-6'>
                                                가격순
                                            </div>
                                            <div
                                                className='font-medium text-[14px] text-[#767676] flex space-x-10 justify-center'>
                                                <RadioGroup defaultValue="" name="radio-buttons-group"
                                                            orientation="horizontal" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                                                    <Radio value="low" label="가격 낮은 순" variant="outlined"/>
                                                    <Radio value="high" label="가격 높은 순" variant="outlined"/>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-semibold text-[16px] mt-[40px] mb-3'>기타</div>
                                            <div className='font-medium text-[14px] space-y-[20px] text-[#767676]'>
                                                <div className='flex items-center'>
                                                    <input
                                                        type="checkbox"
                                                        checked={discount}
                                                        onChange={handleCheckboxChange(discount, setDiscount)}
                                                        value="할인율 순"
                                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                                    />
                                                    할인율 순
                                                </div>
                                                <div className='flex items-center'>
                                                    <input
                                                        type="checkbox"
                                                        checked={review}
                                                        onChange={handleCheckboxChange(review, setReview)}
                                                        value="리뷰 높은 순"
                                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                                    />
                                                    리뷰 높은 순
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-center mt-10'>
                                        <Button onClick={handleInit} size="lg" variant="outlined" color="neutral"
                                                sx={{marginX: "20px"}}>초기화</Button>
                                        <Button onClick={closeModal} size="lg" variant="solid" color="primary"
                                                sx={{width: "200px"}}>조회</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {
                        sortedData !== undefined ? sortedData.map((item, index) => {
                            return <DetailItems key={index} item={item}/>;
                        }) : <div className="flex flex-col items-center ml-3">
                            <img style={{width: 220, height: 220}} className="ml-12" src='/assets/basket.png'
                                 alt='No data'/>
                            <p className="ml-12">추천 데이터가 없습니다.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

DetailMainContent.propTypes = {
    setIsModalVisible: PropTypes.func.isRequired
};

export default DetailMainContent;

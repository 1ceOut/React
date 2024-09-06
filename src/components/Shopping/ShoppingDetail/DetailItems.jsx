import React from 'react';
import PropTypes from 'prop-types';

const DetailItems = ({ item }) => {

    const click_function = () => {
        window.open(item.url);
    }

    return (
        <div className='flex justify-center items-center my-4'>
            <div className='flex mr-3 w-[120px] h-[140px] min-w-[120px] min-h-[120px]'>
                <img src={item.image} alt={item.title || '상품 이미지'} className="rounded-lg w-full h-full object-fill" onClick={click_function}/>
            </div>
            <div className='flex flex-col justify-evenly'>
                <div className='flex flex-col space-y-2'>
                    <div className='font-normal text-[15px] overflow-hidden text-ellipsis whitespace-nowrap w-[200px]'>
                        {item.title || '제목 없음'}
                    </div>
                    <div
                        className='py-1 font-medium text-[13px] text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap w-[200px]'>
                        {item.subtitle || '부제목 없음'}
                    </div>
                    <div className="text-[12px]">리뷰 : {item.review_count || 0}개</div>
                </div>
                <div className='flex justify-between items-end'>
                    <div className='text-[#EC3A3A] font-semibold text-[18px]'>
                        {item.discount_percent ? (
                            <div className="flex mt-1">
                                <del className="text-[0.9rem] text-gray-400 mr-4">{item.origin_price}원</del>
                                <p className="text-[1.2rem]">{item.discount_percent}</p>
                            </div>
                        ) : ("")}
                    </div>
                    <div className='font-bold text-[15px]'>{item.price}원</div>
                </div>
            </div>
        </div>
    );
}

DetailItems.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        review_count: PropTypes.string,
        discount_percent: PropTypes.string,
        origin_price: PropTypes.string,
        price: PropTypes.string
    }),
};


export default DetailItems;

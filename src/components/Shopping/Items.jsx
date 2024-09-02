import React from 'react';
import PropTypes from 'prop-types';
import DetailItems from "./ShoppingDetail/DetailItems.jsx";

const Items = ({item}) => {
    const click_function = () => {
        window.open(item.url);
    }
    return (
        <div className="mt-4 mr-4 my-3" onClick={()=>click_function()}>
            <img src={item.image} className="rounded-lg mb-2" alt="Apple"/>
            <p className="w-[153px] h-[42px] font-normal text-sm text-[#333D4B]">
                {item.title}<br/>
            </p>
            <p className="font-normal text-xs text text-[#333D4B]">{item.subtitle===null?"":item.subtitle}</p>
            <div className="relative">
                {
                    item.discount_percent !== null ? (
                        <div className="flex justify-between inset-x-0 bottom-0">
                            <p className="w-[62px] h-[21px] text-sm font-semibold">{item.price}원</p>
                            <p className="w-[52px] h-[21px] text-lg font-semibold text-red-500">{item.discount_percent}</p>
                        </div>
                    ): (
                        <p className="w-[62px] h-[21px] text-sm font-semibold">{item.price}원</p>
                    )
                }
            </div>
        </div>
    );
}

Items.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        review_count: PropTypes.string,
        discount_percent: PropTypes.string,
        origin_price: PropTypes.string,
    }),
};

export default Items;
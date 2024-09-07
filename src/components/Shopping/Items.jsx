import React from 'react';
import PropTypes from 'prop-types';
import DetailItems from "./ShoppingDetail/DetailItems.jsx";

const Items = ({item}) => {
    const click_function = () => {
        window.open(item.url);
    }
    return (
        <div className="mt-4 mr-4 my-3" onClick={()=>click_function()}>
            <img src={item.image} className="rounded-lg mb-2 cursor-pointer" alt={item.title}/>
            <p className="w-[153px] h-[21px] font-normal text-sm text-[#333D4B] overflow-hidden text-ellipsis whitespace-nowrap">
                {item.title}
            </p>
            <p className="w-[153px] h-[16px] font-normal text-xs text text-[#333D4B] overflow-hidden text-ellipsis whitespace-nowrap">{item.subtitle===null?"":item.subtitle}</p>
            <div className="relative">
                {
                    item.discount_percent !== null ? (
                        <div className="flex justify-start inset-x-0 bottom-0 mt-1 flex-col">
                            <p className="text-xs text-gray-400 line-through">{item.origin_price}원</p>
                            <div className="flex">
                                <p className="w-[38px] h-[21px] text-base font-semibold text-red-500">{item.discount_percent}</p>
                                <p className="w-[80px] h-[21px] text-base font-semibold">{item.price}원</p>
                            </div>

                        </div>
                    ) : (
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
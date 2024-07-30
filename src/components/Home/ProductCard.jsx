import React from 'react';

const ProductCard = () => {
    return (
        <article className="flex flex-col pb-5 mt-2.5 w-full bg-white rounded-xl max-w-[380px]">
            <img loading="lazy"
                 src="/assets/shop_ex.png"
                 alt="Product image" className="w-full rounded-t-xl aspect-[1.85]"/>
            <div className="flex flex-col items-start pr-12 pl-5 mt-5">
                <h3 className="text-base font-medium tracking-tight text-gray-900">
                    [이목] 무항생제 소고기 채끝 구이용 200g (냉장)
                </h3>
                <div className="flex gap-4 mt-4 whitespace-nowrap">
                    <div className="flex gap-2 self-start">
                        <div className="grow text-sm tracking-tight text-neutral-500">19,900원</div>
                        <div className="text-lg font-semibold tracking-tight text-red-500">33%</div>
                    </div>
                    <div className="flex-auto text-lg font-semibold tracking-tight text-gray-900">13,200원</div>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;

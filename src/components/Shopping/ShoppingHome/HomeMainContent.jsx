

const HomeMainContent = () => {
    return (
        <div>
            <div className="flex justify-between items-center max-w-[324px] mt-8 ml-6">
                <p className="font-semibold text-lg">이장우님의 식재료 추천</p>
                <p className="font-medium text-sm text-gray-500 border-b border-gray-500 cursor-pointer">전체보기</p>
            </div>

            <div className="flex w-[390px] h-[227px]">
                <div className="ml-6 mt-4 mr-2.5">
                    <img src="/assets/apple.png" alt="Apple" />
                    <p className="w-[153px] h-[42px] font-normal text-sm text-[#333D4B]">
                        새콤달콤 제철과일 사과<br />
                        3kg(박스)
                    </p>
                    <p className="w-[62px] h-[21px] text-sm font-semibold">19,900원</p>
                </div>

                <div className="mt-4 mr-2.5">
                    <img src="/assets/yuk.png" alt="육개장" />
                    <p className="w-[153px] h-[42px] font-normal text-sm text-[#333D4B]">
                        [소반옥] 듬뿍 육개장 칼칼<br />
                        2인분
                    </p>
                    <p className="w-[62px] h-[21px] text-sm font-semibold">7,840원</p>
                </div>

                <div className="mt-4">
                    <img src="/assets/milk.png" alt="Milk" />
                    <p className="w-[153px] h-[42px] font-normal text-sm text-[#333D4B]">
                        연세우유 전용목 우유<br />
                        1.8L
                    </p>
                    <p className="w-[62px] h-[21px] text-sm font-semibold">4,900원</p>
                </div>
            </div>
        </div>
    );
};

export default HomeMainContent;
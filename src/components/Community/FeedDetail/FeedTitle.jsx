

const FeedTitle = () => {
    return (
        <div className="w-[390px] flex flex-col justify-center items-center">
                <div className="flex justify-center items-center w-[390px]">
                    <img src="/assets/kimchi.png" alt="김치찌개" className="w-[390px] h-auto"/>
                </div>
                <div className=" self-stretchmy-[14px] text-[15px] font-medium">
                    자취생이 추천하는 초간단 김치찌개 레시피 공유한다
                </div>
        </div>
    );
};

export default FeedTitle;
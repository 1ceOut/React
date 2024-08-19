

const Feed = () => {
    return (
        <div className="self-stretch max-w-[342px] mb-8">
            <div className="flex items-center justify-between w-[342px] h-[38px]">
                <div className="flex justify-center items-center">
                    <div>
                        <img src="/assets/cha.png" alt="차은우" className="w-[30px] h-[30px] mr-2"/>
                    </div>
                    <div>
                        <div className="font-semibold text-sm">이장우</div>
                        <div className="font-normal text-xs">1시간 전</div>
                    </div>
                </div>
                <div>...</div>
            </div>
            <div>
                <div>
                    <img src="/assets/kimchi.png" alt="김치찌개" className="w-[342px] h-auto"/>
                </div>
                <div className="my-[14px] text-[15px] font-medium">자취생이 추천하는 초간단 김치찌개 레시피 공유한다</div>
            </div>
            <div className="flex flex-col font-medium text-[#767676]">
                <div className="flex justify-between items-center text-[12px] mb-[10px]">
                    <div className="flex justify-center items-center">
                        <img src="/assets/heart.png" alt="하트" className="mr-[4px]"/>
                        좋아요 25개
                    </div>
                    <div>댓글 2개</div>
                </div>
                <div className="flex justify-evenly items-center text-[13px]">
                    <div className="flex justify-center items-center">
                        <img src="/assets/heart.png" alt="하트" className="mr-[4px]"/>
                        좋아요
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="/assets/comment.png" alt="댓글" className="mr-[4px]"/>
                        댓글쓰기
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="/assets/subscribe.png" alt="구독" className="mr-[4px]"/>
                        구독하기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
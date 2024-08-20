

const FeedMenu = () => {
    return (
        <div className="self-stretch">
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

export default FeedMenu;


const FeedComment = () => {
    return (
        <div className="self-stretch">
            <div className="my-5">관련성 높은 댓글</div>
            <div className="flex">
                <div><img src="/assets/cha.png" alt="차은우" className="w-8 h-8"/></div>
                <div className="ml-2">
                    <div className="w-[302px] h-auto bg-[#F5F5F5] p-[14px]">
                        글쓴이
                        <br /><br />
                        초간단 이라구 해서 봤는데 초간단 까지는 아닌듯 하네요 ㅇㅇ..
                    </div>
                    <div className="flex space-x-5 font-normal text-[12px] text-[#767676]">
                        <div>1시간</div>
                        <div>답글달기</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedComment;
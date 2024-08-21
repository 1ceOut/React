

const FeedProfile = () => {
    return (
        <div className="self-stretch mb-3">
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
        </div>
    );
};

export default FeedProfile;
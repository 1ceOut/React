
import HorizontalLine from './../../Common/HorizontalLine';

const FeedContent = () => {
    return (
        <div>
            <div>
                <div className="flex h-[60px]">
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-[#767676] font-semibold text-base">
                            게시물
                        </div>
                        <div className="text-black font-semibold text-base">
                            6개
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-[#767676] font-semibold text-base">
                            받은 댓글
                        </div>
                        <div className="text-black font-semibold text-base">
                            2개
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-[#767676] font-semibold text-base">
                            받은 좋아요
                        </div>
                        <div className="text-black font-semibold text-base">
                            25개
                        </div>
                    </div>
                </div>
                <div className='mt-[10px] mb-4'>
                    <HorizontalLine/>
                </div>
            </div>
            <div className="self-stretch space-y-[8px]">
                <div className="flex space-x-[3px]">
                    <div>
                        <img src="/assets/feed1.png" alt="피드" className="w-28 h-28"/>
                    </div>
                    <div>
                        <img src="/assets/feed2.png" alt="피드" className="w-28 h-28"/>
                    </div>
                    <div>
                        <img src="/assets/feed3.png" alt="피드" className="w-28 h-28"/>
                    </div>
                </div>
                <div className="flex space-x-[3px]">
                    <div>
                        <img src="/assets/feed4.png" alt="피드" className="w-28 h-28"/>
                    </div>
                    <div>
                        <img src="/assets/feed5.png" alt="피드" className="w-28 h-28"/>
                    </div>
                    <div>
                        <img src="/assets/feed6.png" alt="피드" className="w-28 h-28"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedContent;
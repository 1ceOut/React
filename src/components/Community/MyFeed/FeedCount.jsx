
import HorizontalLine from './../../Common/HorizontalLine';

const FeedCount = () => {
    return (
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
    );
};

export default FeedCount;
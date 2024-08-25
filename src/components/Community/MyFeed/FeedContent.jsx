
import HorizontalLine from './../../Common/HorizontalLine';

const FeedContent = () => {
    return (
        <div>
            <div>
                <div className="flex justify-between items-center h-8">
                    <div className='flex justify-center items-center w-1/2'>
                        스토리
                    </div>
                    <div className='flex justify-center items-center w-1/2'>
                        영상
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
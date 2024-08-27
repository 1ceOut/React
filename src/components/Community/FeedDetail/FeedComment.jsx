import { Rating } from '@mui/material';
import { useState } from 'react';

const FeedComment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleClick = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const getButtonClassNames = (filter) => {
        return selectedFilter === filter
            ? 'w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#2377EF] text-[#2377EF]'
            : 'w-[108px] h-[56px] flex justify-center items-center rounded-xl border-[1px] border-[#E1E1E1]';
    };

    return (
        <div className="self-stretch">
            <div className="my-5 cursor-pointer flex" onClick={handleClick}>
                관련성 높은 댓글
                <img src="/assets/downarrow.png" alt="아래방향" className='ml-2 flex justify-center items-center'/>
            </div>
            <div className="flex">
                <div>
                    <img src="/assets/cha.png" alt="차은우" className="w-8 h-8" />
                </div>
                <div className="ml-2">
                    <div className="w-[302px] rounded-xl h-auto bg-[#F5F5F5] p-[14px]">
                        <div className="flex space-x-4">
                            <div>
                                글쓴이
                            </div>
                            <div className='flex justify-center items-center'>
                                <Rating size='small' readOnly/>
                            </div>
                            <div>
                                상중하
                            </div>
                        </div>
                        <br />
                        초간단 이라구 해서 봤는데 초간단 까지는 아닌듯 하네요 ㅇㅇ..
                    </div>
                    <div className="flex space-x-5 font-normal text-[12px] text-[#767676]">
                        <div>1시간</div>
                    </div>
                </div>
            </div>

            {isModalVisible && (
                <div>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeModal}
                    ></div>

                    <div className="fixed bottom-0 bg-white w-[390px] h-[258px] px-6 z-50">
                        <div className="flex justify-between items-center mt-1 h-[46px]">
                            <div className="text-lg font-bold">댓글 필터링</div>
                            <button onClick={closeModal} className="text-lg font-bold">
                                &times;
                            </button>
                        </div>
                        <div className="cursor-pointer mt-8 flex justify-evenly items-center w-[342px]">
                            <div
                                className={getButtonClassNames('latest')}
                                onClick={() => handleFilterClick('latest')}
                            >
                                최신순
                            </div>
                            <div
                                className={getButtonClassNames('all')}
                                onClick={() => handleFilterClick('all')}
                            >
                                모든 댓글
                            </div>
                            <div
                                className={getButtonClassNames('best')}
                                onClick={() => handleFilterClick('best')}
                            >
                                베스트 댓글
                            </div>
                        </div>
                        <div className="mt-6 w-[342px] h-[56px] cursor-pointer rounded-xl text-white flex justify-center items-center bg-[#2377EF]">
                            조회
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedComment;
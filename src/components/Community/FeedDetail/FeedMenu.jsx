import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { PropTypes } from 'prop-types';
import Rating from '@mui/material/Rating';

const FeedMenu = ({ option }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const closeHidden = () => {
        setIsHidden(false);
    };

    const showHidden = () => {
        setIsHidden(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // 이미지 base64 저장
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="self-stretch">
            <div className="flex flex-col font-medium text-[#767676]">
                <div className="flex justify-between items-center text-[12px] mb-[10px]">
                    <div className="flex justify-center items-center">
                        <img src="/assets/heart.png" alt="하트" className="mr-[4px]" />
                        좋아요 25개
                    </div>
                    <div>댓글 2개</div>
                </div>
                <div className="flex justify-evenly items-center text-[13px]">
                    <div className="flex justify-center items-center">
                        <img src="/assets/heart.png" alt="하트" className="mr-[4px]" />
                        좋아요
                        <button>
                        </button>
                    </div>
                    <div className="flex justify-center items-center cursor-pointer" onClick={showHidden}>
                        <img src="/assets/comment.png" alt="댓글" className="mr-[4px]" />
                        댓글쓰기
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="/assets/subscribe.png" alt="구독" className="mr-[4px]" />
                        구독하기
                    </div>
                </div>
            </div>
            {isHidden && (
                <div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50" onClick={closeHidden}></div>
                            <div className="relative bg-white w-[90%] max-w-lg p-5 rounded-lg shadow-lg">
                                <div className="flex justify-between text-lg">
                                    <div className="w-6 h-6"></div>
                                    <div className="flex">
                                        요리후기(리뷰)
                                    </div>
                                    <div className="cursor-pointer w-6 h-6" onClick={closeHidden}>
                                        X
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    요리사진, 메세지를 {option}님께 보냅니다!
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <Rating size="large"/>
                                    <div className="text-xs text-[#A8A8A8]">
                                        최고
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    상중하
                                </div>
                                <div className="border-[2px] w-full min-h-28 h-auto mt-2">
                                    <input
                                        id="food"
                                        name="food"
                                        type="text"
                                        placeholder="감사의 한마디 부탁드려요!"
                                        className="block outline-none pl-3 text-gray-900 placeholder:text-[#A8A8A8]"
                                    />
                                </div>
                                <div className="flex items-center mb-4 mt-1">
                                    <label
                                        htmlFor="image-upload"
                                        className="relative cursor-pointer w-16 h-16 bg-gray-50 border-[1px] flex justify-center items-center overflow-hidden"
                                    >
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt="Uploaded"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <AiOutlinePlus size={20} className="text-gray-500" />
                                            </div>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    직접 요리 후 작성하는 후기인가요?
                                </div>
                                <div className="bg-blue-600 rounded-md cursor-pointer text-white flex justify-center items-center h-9">
                                    요리후기 남기기
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

FeedMenu.propTypes = {
    option: PropTypes.string.isrequired,
}

export default FeedMenu;
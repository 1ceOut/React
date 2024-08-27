import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';


const FeedMenu = () => {

    const [isHidden, setIsHidden] = useState(false);

    const closeHidden = () => {
        setIsHidden(false);
    }

    const showHidden = () => {
        setIsHidden(true);
    }

    return (
        <div className="self-stretch">
            <div className="flex flex-col font-medium text-[#767676]">
                <div className="flex justify-between items-center text-[12px] mb-[10px]">
                    <div className="flex justify-center items-center">
                        <FavoriteIcon sx={{ color: red[500] }}/>
                        좋아요 25개
                    </div>
                    <div>댓글 2개</div>
                </div>
                <div className="flex justify-evenly items-center text-[13px]">
                    <div className="flex justify-center items-center">
                        <img src="/assets/heart.png" alt="하트" className="mr-[4px]"/>
                        좋아요
                    </div>
                    <div className="flex justify-center items-center cursor-pointer" onClick={showHidden}>
                        <img src="/assets/comment.png" alt="댓글" className="mr-[4px]"/>
                        댓글쓰기
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="/assets/subscribe.png" alt="구독" className="mr-[4px]"/>
                        구독하기
                    </div>
                </div>
            </div>
            {isHidden && (
                <div>
                    <div className="border-[2px] w-full min-h-16 h-auto mt-2 rounded-3xl flex justify-center items-center">
                        <input
                            id="food"
                            name="food"
                            type="text"
                            placeholder="댓글 추가..."
                            className="block outline-none w-[302px] h-14 pl-3 rounded-3xl text-gray-900 placeholder:text-[#A8A8A8]"
                        />
                        <img src="/assets/right.png" alt="입력 이모티콘" className="w-5 h-5" onClick={closeHidden}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedMenu;
import React from 'react';

const FeedProfile = ({ writeday, userProfile, userName }) => {
    return (
        <div className="self-stretch mb-3">
            <div className="flex items-center justify-between w-[342px] h-[38px]">
                <div className="flex items-center">
                    <div className="relative w-[30px] h-[30px] mr-2">
                        {/* 프로필 이미지 */}
                        <img 
                            src={userProfile || "/assets/cha.png"} 
                            alt={userName || "User Profile"} 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-sm">{userName || "Unknown User"}</div>
                        <div className="font-normal text-xs">{writeday}</div>
                    </div>
                </div>
                <div>...</div>
            </div>
        </div>
    );
};

export default FeedProfile;

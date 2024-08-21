

const ProfileInfo = () => {
    return (
        <div className="self-stretch flex items-center w-[342px] h-14 mt-[30px]"> 
            <div className="flex justify-start items-center">
                <div className="flex justify-center items-center w-14 h-14  mr-[14px] bg-[#EFEFEF] rounded-full">
                    <img className="w-10 h-10" src="/assets/profile.png" alt="프로필 사진" />
                </div>
                <div>
                    <div className="font-semibold text-[18px]">
                        이장우
                    </div>
                    <div className="font-normal text-[14px] text-[#767676]">
                        8282qwe@gmail.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
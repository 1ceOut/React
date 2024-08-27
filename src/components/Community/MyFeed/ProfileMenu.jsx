

const ProfileMenu = () => {

    return (
        <div className="self-stretch flex justify-between items-center mt-6 mb-8">
            <div className="self-stretch flex items-center justify-center">
                <div className="mr-10 flex items-center justify-center">
                    <img src="/assets/cha.png" alt="차은우" className="w-20 h-20"/>
                </div>
                <div className="flex justify-evenly items-center w-52">
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-black font-semibold text-base">
                            6개
                        </div>
                        <div className="text-[#767676] font-semibold text-base">
                            게시물
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-black font-semibold text-base">
                            180
                        </div>
                        <div className="text-[#767676] font-semibold text-base">
                            팔로워
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[114px]">
                        <div className="text-black font-semibold text-base">
                            300
                        </div>
                        <div className="text-[#767676] font-semibold text-base">
                            팔로잉
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMenu;
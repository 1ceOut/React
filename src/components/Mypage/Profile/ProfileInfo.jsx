
import useUserStore from './../../../store/useUserStore';

const ProfileInfo = () => {

    const { userProfile, userName } = useUserStore();


    return (
        <div className="self-stretch flex items-center w-[342px] h-14 mt-[30px]"> 
            <div className="flex justify-start items-center">
                <div className="flex justify-center items-center w-14 h-14  mr-[14px] bg-[#EFEFEF] rounded-full">
                    <img
                        src={userProfile}
                        alt="프로필사진"
                        className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                    />
                </div>
                <div>
                    <div className="font-semibold text-[18px]">
                        {userName}
                    </div>
                    <div className="font-normal text-[14px] text-[#767676]">
                        gahyunee012@gmail.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
import useUserStore from '../../../store/useUserStore'; // Zustand store import

const FeedProfile = ({writeday}) => {
    const { userProfile, userName, isLogin } = useUserStore(); // Zustand store에서 값 가져오기
    
    return (
        <div className="self-stretch mb-3">
            <div className="flex items-center justify-between w-[342px] h-[38px]">
                <div className="flex justify-center items-center">
                    <div>
                        <img src="/assets/cha.png" alt="차은우" className="w-[30px] h-[30px] mr-2"/>
                    </div>
                    <div>
                        <div className="font-semibold text-sm">{userName}</div>
                        <div className="font-normal text-xs">{writeday}</div>
                    </div>
                </div>
                <div>...</div>
            </div>
        </div>
    );
};

export default FeedProfile;
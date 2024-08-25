

const InvitedUser = () => {
    return (
        <div>
            <div className="self-stretch  flex items-center justify-between w-[342px] text-[#333D4B] font-medium text-[16px] mb-[18px]">
                나의 초대코드로 입장한 구성원
            </div>
            <div className="flex items-center mb-4">
                <div>
                    <img src="/assets/taeyeon.png" alt="테스트 사진" className="w-[34px] h-[34px] mr-3" />
                </div>
                <div>
                    <div className="font-normal text-[13px] text-[#767676]">이장우</div>
                    <div className="font-semibold text-[13px] text-[#333D4B]">00-0000-0000</div>
                </div>
            </div>
        </div>
    );
};

export default InvitedUser;
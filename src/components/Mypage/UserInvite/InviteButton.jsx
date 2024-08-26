

const InviteButton = () => {
    return (
        <div className="w-[342px] h-[56px] bottom-[54px] absolute rounded-xl border-[1px] flex justify-center items-center font-medium text-[16px]">
            <input
            id="userinvite"
            name="userinvite"
            type="text"
            placeholder="초대코드를 입력해주세요"
            className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
          />
        </div>
    );
};

export default InviteButton;
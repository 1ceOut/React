import HorizontalLine from "../../Common/HorizontalLine";


const MyInviteCode = () => {
    return (
    <div>
      <div className="self-stretch flex items-center justify-between w-[342px]">
        <div className="text-base font-semibold">
           00-0000-0000
        </div>
        <div className="text-base font-semibold text-[#767676] border-b-[1px] border-[##767676] cursor-pointer">
           복사하기
        </div>
      </div>
      <div className="my-8">
         <HorizontalLine/>
      </div>
    </div>
   
    );
};

export default MyInviteCode;
import AddFridgeInvite from "./AddFridgeInvite";
import AddFridgeInput from "./AddFridgeInput";
import { useState } from "react";

const AddFridgeProcess = () => {
  // State to manage which component was clicked
  const [clickedComponent, setClickedComponent] = useState(null);

  // Function to handle the click event for AddFridgeInvite
  const handleInviteClick = () => {
    setClickedComponent("invite");
  };

  // Function to handle the click event for AddFridgeInput
  const handleInputClick = () => {
    setClickedComponent("input");
  };

  return (
    <div className="self-stretch space-y-2 mt-8">
      {!clickedComponent ? (
        <>
          <div onClick={handleInviteClick}>
            <AddFridgeInvite />
          </div>
          <div onClick={handleInputClick}>
            <AddFridgeInput />
          </div>
        </>
      ) : (
        <div className="self-stretch space-y-2">
          {clickedComponent === "invite" ? (
            <input
              type="text"
              placeholder="냉장고 초대코드를 입력해주세요."
              className="w-[342px] h-14 border-[1px] border-[#E1E1E1] p-2 rounded-xl"
            />
          ) : (
            <input
              type="text"
              placeholder="냉장고 등록이름을 입력해주세요"
              className="w-[342px] h-14 border-[1px] border-[#E1E1E1] p-2 rounded-xl"
            />
          )}
          <div className="self-stretch w-[342px] h-14 border-[1px] border-[#E1E1E1] rounded-xl flex justify-center items-center cursor-pointer bg-blue-500 text-white">
            등록하기
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFridgeProcess;

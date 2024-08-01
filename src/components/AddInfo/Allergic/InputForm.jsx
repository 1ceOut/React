import { useState } from 'react';
import NextButton from './../Common/NextButton';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='self-stretch w-[480px]'>
      <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center my-4">
        <input
          id="food"
          name="food"
          type="text"
          placeholder="알레르기, 지병을 입력해주세요."
          className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <NextButton isEnabled={inputValue.length > 0} nextPath="/login/signupcomplete" />
    </div>
  );
};

export default InputForm;
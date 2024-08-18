import { useState } from 'react';
import NextButton from './../Common/NextButton';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='self-stretch w-[342px]'>
      <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center my-4">
        <input
          id="food"
          name="food"
          type="text"
          placeholder="좋아하는 음식을 적어주세요."
          className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <NextButton isEnabled={inputValue.length > 0} nextPath="/addinfo/allergic" />
    </div>
  );
};

export default InputForm;
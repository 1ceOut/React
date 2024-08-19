import { useState } from 'react';
import NextButton from './../Common/NextButton';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='self-stretch w-[480px]'>
      <div className="self-stretch border rounded-xl w-[342px] flex items-center my-4">
        <input
          id="food"
          name="food"
          type="text"
          placeholder="좋아하는 음식을 적어주세요."
          className="block outline-none px-5 w-full h-14 text-gray-900 placeholder:text-[#A8A8A8]"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <NextButton isEnabled={inputValue.length > 0} nextPath="/addinfo/allergic" />
    </div>
  );
};

export default InputForm;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputValue) {
      navigate('/login/signupcomplete');
    }
  };

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
    <div
    className={`flex text-[#868686] rounded-[12px] self-stretch justify-center items-center w-[342px] h-14 mt-60 cursor-pointer ${
      inputValue.length > 0 ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
    }`}
    onClick={inputValue.length > 0 ? handleSubmit : null}
  >
    다음
  </div>
      </div>
    );
};

export default InputForm;
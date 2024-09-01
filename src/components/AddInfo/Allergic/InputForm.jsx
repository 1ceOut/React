import { useState } from 'react';
import NextButton from './../Common/NextButton';
import useAddInfo from "../../../store/useAddInfo.js";

const InputForm = () => {
  const {height, weight,setHeight,setWeight} = useAddInfo();

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
      setWeight(e.target.value);
  }

  return (
      <div className='self-stretch w-[342px]'>
          <div className="flex justify-center items-center">
              <p className="flex mr-4 min-w-[50px] justify-center">키</p>
              <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center my-4">
                  <input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="키를 입력해 주세요."
                      className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                      value={height}
                      onChange={handleHeightChange}
                      min="0"
                      max="300"
                  />
              </div>
          </div>
          <div className="flex justify-center items-center">
              <p className="flex mr-4 min-w-[50px] justify-center">몸무게</p>
              <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center my-4">
                  <input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="몸무게를 입력해주세요."
                      className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                      value={weight}
                      onChange={handleWeightChange}
                      min="0"
                      max="300"
                  />
              </div>
          </div>
          <NextButton isEnabled={true} nextPath="/login/signupcomplete"/>
      </div>
  );
};

export default InputForm;
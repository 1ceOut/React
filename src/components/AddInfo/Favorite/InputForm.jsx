

const InputForm = () => {
    return (
        <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center">
          <input
            id="price"
            name="price"
            type="text"
            placeholder="좋아하는 음식을 적어주세요."
            className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
          </div>
        </div>
    );
};

export default InputForm;
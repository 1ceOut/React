import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNavigate from "../../../components/Common/MenuNavigate";

const AddInput = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
  const [additionalSelectValue, setAdditionalSelectValue] = useState("");
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [count, setCount] = useState("");

  const [animationClass, setAnimationClass] = useState("animate-slideInUp");

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "processedFood" || value === "rawMaterial") {
      setShowAdditionalSelect(true);
      setAdditionalSelectValue("");
    } else {
      setShowAdditionalSelect(false);
      setAdditionalSelectValue("");
    }
  };

  const handleAdditionalChange = (event) => {
    setAdditionalSelectValue(event.target.value);
  };

  const isFormValid = () => {
    return (
      selectedOption &&
      (!showAdditionalSelect || additionalSelectValue) &&
      productName &&
      expiryDate &&
      count
    );
  };

  const handleNavigate = () => {
    if (isFormValid()) {
      navigate("/fridge/fridgemanage");
    }
  };

  return (
    <main
      className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}
    >
      <MenuNavigate option="식품 추가" alertPath="/addinfo/habit" />
      <div className="w-[342px] h-[134px] mt-6">
        <p className="w-[342px] h-[76px] font-semibold text-[28px]">
          추가 입력을
          <br />
          선택 하셨어요.
        </p>
        <p className="w-[342px] h-[44px] mt-4 font-medium text-[15px] text-[#767676]">
          직접 입력하여 정확하게 표기를 할 수 있지만 실수할 경우
          <br />
          잘못 표기되니 잘 확인해 주세요!
        </p>
      </div>
      <div className="w-[342px] mt-12">
        <select
          id="foodType"
          value={selectedOption}
          onChange={handleChange}
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-[15px] text-[#767676]"
        >
          <option value="" disabled>
            식품유형을 선택해주세요
          </option>
          <option value="processedFood">가공식품</option>
          <option value="rawMaterial">원자재성식품</option>
        </select>
      </div>
      {showAdditionalSelect && (
        <div className="w-[342px] mt-3">
          <select
            id="additionalSelect"
            value={additionalSelectValue}
            onChange={handleAdditionalChange}
            className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-[15px] text-[#767676]"
          >
            <option value="" disabled>
              식품 상세
            </option>
            <option value="option1">가공식품 상세</option>
            <option value="option2">원자재성식품 상세</option>
          </select>
        </div>
      )}
      <div className="w-[342px] mt-3">
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="제품 이름을 적어주세요"
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-[15px] text-[#767676]"
        />
      </div>
      <div className="w-[342px] mt-3">
        <input
          type="date"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="소비기한을 적어주세요"
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-[15px] text-[#767676]"
        />
      </div>
      <div className="w-[342px] mt-3">
        <input
          type="text"
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="상품 갯수를 적어주세요"
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-[15px] text-[#767676]"
        />
      </div>
      <button
        disabled={!isFormValid()}
        onClick={handleNavigate}
        className={`w-[342px] h-[56px] rounded-xl mt-7 flex justify-center items-center text-white text-[16px] ${
          isFormValid()
            ? "bg-[#2377EF] cursor-pointer"
            : "bg-[#A9A9A9] cursor-not-allowed"
        }`}
      >
        생성
      </button>
    </main>
  );
};

export default AddInput;

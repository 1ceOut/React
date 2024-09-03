import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import useProductStore from "../../../store/useProductStore";
import useUserStore from "../../../store/useUserStore";
import { saveBarcode } from "../../../query/RefriQuery";

const PRODUCT_TYPES = {
  RECIPE: "가공식품",
  FOOD: "원자재성 식품",
};

const AddInput2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 이전 페이지에서 넘어온 상태를 가져옵니다.
  const {
    barcode: initialBarcode,
    productName: initialProductName,
    expiryDate: initialExpiryDate,
    refrigeratorName,
    inputMethod,
  } = location.state || {};
  const [productName, setProductName] = useState(initialProductName || "");
  const [expiryDate, setExpiryDate] = useState(initialExpiryDate || "");
  const [barcode, setBarcode] = useState(initialBarcode || "");
  const [count, setCount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalSelectValue, setAdditionalSelectValue] = useState("");
  const [subcategoryValue, setSubcategoryValue] = useState("");
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const { lcategories, scategories, fetchLcategories, fetchScategories } =
    useProductStore();
  const { userId, isLogin, LoginSuccessStatus } = useUserStore();

  const [animationClass, setAnimationClass] = useState("animate-slideInUp");

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  useEffect(() => {
    if (initialBarcode) setBarcode(initialBarcode);
    if (initialProductName) setProductName(initialProductName);
    if (initialExpiryDate) setExpiryDate(initialExpiryDate);
  }, [initialBarcode, initialProductName, initialExpiryDate]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedOption) {
        await fetchLcategories(
          selectedOption === "가공식품"
            ? PRODUCT_TYPES.RECIPE
            : PRODUCT_TYPES.FOOD
        );
        setShowAdditionalSelect(true);
      } else {
        setShowAdditionalSelect(false);
        setAdditionalSelectValue("");
        setSubcategoryValue("");
      }
    };

    fetchCategories();
  }, [selectedOption]);

  useEffect(() => {
    if (additionalSelectValue) {
      fetchScategories(
        selectedOption === "가공식품"
          ? PRODUCT_TYPES.RECIPE
          : PRODUCT_TYPES.FOOD,
        additionalSelectValue
      );
    } else {
      setSubcategoryValue("");
    }
  }, [additionalSelectValue]);

  useEffect(() => {
    setIsEnabled(
      productName &&
        expiryDate &&
        count &&
        selectedOption &&
        (!showAdditionalSelect || (additionalSelectValue && subcategoryValue))
    );
  }, [
    productName,
    expiryDate,
    count,
    selectedOption,
    additionalSelectValue,
    subcategoryValue,
    showAdditionalSelect,
  ]);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !isLogin) {
      LoginSuccessStatus(savedToken);
    }
    if (!userId) {
      navigate("/login");
    }
  }, [userId, isLogin, navigate, LoginSuccessStatus]);

  const handleSave = async () => {
    try {
      // 상품 데이터를 하나의 객체로 묶어서 전달
      const product = {
        barcode,
        productName,
        expiryDate,
        count,
        productType: selectedOption,
        lcategory: additionalSelectValue,
        scategory: subcategoryValue,
        refrigeratorName,
      };

      // saveBarcode 호출 시 객체와 성공 콜백을 전달
      await saveBarcode(product, () => navigate("/fridge/fridgemanage"));
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <main
      className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-screen`}
    >
      <MenuNavigate option={"음식 등록"} alertPath="/addinfo/habit" />
      <div className="w-[342px] h-[134px] mt-6">
        <p className="w-[342px] h-[76px] font-semibold text-2xl">
          {inputMethod === "manual" ? "직접 입력" : "바코드 추가 입력"}을<br />
          선택 하셨어요.
        </p>
        <p className="w-[342px] h-[44px] mt-4 font-medium text-sm text-[#767676]">
          {inputMethod === "manual"
            ? "직접 입력하여 정확하게 표기할 수 있지만 실수할 경우 잘못 표기되니 확인해 주세요!"
            : "바코드를 촬영하여 정확한 입력을 할 수 있습니다."}
        </p>
      </div>
      <div className="w-[342px] mt-12">
        <select
          id="foodType"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
        >
          <option value="" disabled>
            식품유형을 선택해주세요
          </option>
          <option value="가공식품">가공식품</option>
          <option value="원자재성 식품">원자재성식품</option>
        </select>
      </div>
      {showAdditionalSelect && (
        <div className="w-[342px] mt-3">
          <select
            id="additionalSelect"
            value={additionalSelectValue}
            onChange={(e) => setAdditionalSelectValue(e.target.value)}
            className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
          >
            <option value="" disabled>
              식품 상세를 선택해주세요
            </option>
            {lcategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
      {showAdditionalSelect &&
        additionalSelectValue &&
        scategories.length > 0 && (
          <div className="w-[342px] mt-3">
            <select
              id="subcategorySelect"
              value={subcategoryValue}
              onChange={(e) => setSubcategoryValue(e.target.value)}
              className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
            >
              <option value="" disabled>
                소분류를 선택해주세요
              </option>
              {scategories.map((scategory, index) => (
                <option key={index} value={scategory}>
                  {scategory}
                </option>
              ))}
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
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
        />
      </div>
      <div className="w-[342px] mt-3">
        <input
          type="date"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
        />
      </div>
      <div className="w-[342px] mt-3">
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="수량을 적어주세요"
          className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
        />
      </div>
      <div
        className={`w-[342px] h-[56px] rounded-xl border border-[#E1E1E1] flex justify-center items-center mt-8 cursor-pointer ${
          isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1] text-[#868686]"
        }`}
        onClick={isEnabled ? handleSave : null}
      >
        <p className="font-medium text-lg">냉장고 등록하기</p>
      </div>
    </main>
  );
};

export default AddInput2;

import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import useProductStore from "../../../store/useProductStore";
import useUserStore from "../../../store/useUserStore";
import { saveBarcode } from "../../../query/RefriQuery";

// MUI components for date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import {TextField} from "@mui/material";
import {koKR} from "@mui/x-date-pickers/locales";

// 카테고리 타입
const PRODUCT_TYPES = {
  RECIPE: "가공식품",
  FOOD: "원자재성 식품",
};

const AddInput2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location에서 받아온 데이터들
  const {
    barcode: initialBarcode,
    productName: initialProductName,
    expiryDate: initialExpiryDate,
    refrigeratorName,
    inputMethod,
  } = location.state || {};

  const [productName, setProductName] = useState(initialProductName || "");
  const [expiryDate, setExpiryDate] = useState(initialExpiryDate || null);
  const [barcode, setBarcode] = useState(initialBarcode || "");
  const [count, setCount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalSelectValue, setAdditionalSelectValue] = useState("");
  const [subcategoryValue, setSubcategoryValue] = useState("");
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Store에서 카테고리 정보 불러오기
  const { lcategories, scategories, fetchLcategories, fetchScategories } = useProductStore();
  const { userId, isLogin, LoginSuccessStatus } = useUserStore();

  // 첫 번째 옵션 선택에 따른 상위 카테고리 불러오기
  useEffect(() => {
    if (selectedOption) {
      fetchLcategories(selectedOption === "가공식품" ? PRODUCT_TYPES.RECIPE : PRODUCT_TYPES.FOOD);
      setShowAdditionalSelect(true);
    } else {
      setShowAdditionalSelect(false);
      setAdditionalSelectValue("");
      setSubcategoryValue("");
    }
  }, [selectedOption]);

  // 두 번째 옵션 선택에 따른 하위 카테고리 불러오기
  useEffect(() => {
    if (additionalSelectValue) {
      fetchScategories(
          selectedOption === "가공식품" ? PRODUCT_TYPES.RECIPE : PRODUCT_TYPES.FOOD,
          additionalSelectValue
      );
    } else {
      setSubcategoryValue("");
    }
  }, [additionalSelectValue]);

  // 모든 필수 입력값이 있는지 체크
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

  // 저장 버튼 클릭 시 실행
  const handleSave = async () => {
    try {
      // 날짜를 "yyyy-MM-dd" 형식으로 변환
      const formattedDate = expiryDate ? format(expiryDate, "yyyy-MM-dd") : "";

      const product = {
        barcode,
        productName,
        expiryDate: formattedDate,
        count,
        productType: selectedOption,
        lcategory: additionalSelectValue,
        scategory: subcategoryValue,
        refrigeratorName,
      };

      await saveBarcode(product, () => navigate("/fridge/fridgemanage"));
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
      <main className="flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-screen">
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

        {/* 첫 번째 MUI Select */}
        <div className="w-[342px] mt-12">
          <Select
              value={selectedOption}
              onChange={(e, value) => setSelectedOption(value)}
              sx={{ minWidth: 240 }}
              placeholder="식품유형을 선택해주세요"
          >
            <Option value="가공식품">
              <ListItemDecorator>
                <Avatar src="/assets/basket.png" />
              </ListItemDecorator>
              <Box component="span" sx={{ display: "block" }}>
                <Typography component="span" level="title-sm">
                  가공식품
                </Typography>
              </Box>
            </Option>
            <Option value="원자재성 식품">
              <ListItemDecorator>
                <Avatar src="/assets/vegfru.png" />
              </ListItemDecorator>
              <Box component="span" sx={{ display: "block" }}>
                <Typography component="span" level="title-sm">
                  원자재성 식품
                </Typography>
              </Box>
            </Option>
          </Select>
        </div>

        {/* 두 번째 MUI Select */}
        {showAdditionalSelect && (
            <div className="w-[342px] mt-3">
              <Select
                  value={additionalSelectValue}
                  onChange={(e, value) => setAdditionalSelectValue(value)}
                  sx={{ minWidth: 240 }}
                  placeholder="식품 상세를 선택해주세요"
              >
                {lcategories.map((category, index) => (
                    <Option key={index} value={category}>
                      {category}
                    </Option>
                ))}
              </Select>
            </div>
        )}

        {/* 세 번째 MUI Select */}
        {showAdditionalSelect && additionalSelectValue && scategories.length > 0 && (
            <div className="w-[342px] mt-3">
              <Select
                  value={subcategoryValue}
                  onChange={(e, value) => setSubcategoryValue(value)}
                  sx={{ minWidth: 240 }}
                  placeholder="소분류를 선택해주세요"
              >
                {scategories.map((scategory, index) => (
                    <Option key={index} value={scategory}>
                      {scategory}
                    </Option>
                ))}
              </Select>
            </div>
        )}

        {/* 나머지 입력 필드 */}
        <div className="w-[342px] mt-3">
          <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="제품 이름을 적어주세요"
              className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
          />
        </div>
        <div className="w-[342px] mt-3">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={koKR}>
            <DatePicker
                className='w-[342px] mt-3'
                label="유통기한 선택"
                value={expiryDate}
                onChange={(newValue) => setExpiryDate(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        helperText="" // 불필요한 도움말 삭제
                        sx={{
                          "& .MuiInputBase-input": { textAlign: "center" }, // 입력 필드 스타일 조정
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: null, // 기본 달력 아이콘 제거
                        }}
                    />
                )}
            />
          </LocalizationProvider>
        </div>
        <div className="w-[342px] mt-3">
          <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="수량을 적어주세요"
              className="w-full h-[56px] p-2.5 rounded-xl border border-[#E1E1E1] bg-white text-sm text-[#767676]"
          />
        </div>

        {/* 저장 버튼 */}
        <div
            className={`w-[342px] h-[56px] rounded-xl border border-[#E1E1E1] flex justify-center items-center mt-8 cursor-pointer ${
                isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1] text-[#868686]"
            }`}
            onClick={isEnabled ? handleSave : null}
        >
          <p className="font-medium text-lg">식재료 등록하기</p>
        </div>
      </main>
  );
};

export default AddInput2;

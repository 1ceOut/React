import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { addFridge } from "../../../query/FoodListQuery.jsx"; // zustand 상태 관리 라이브러리 import
import axios from "axios";

const AddFridge = () => {
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false); // 버튼 활성화 상태
  const [form, setForm] = useState({ refrigeratorName: "" });

  useEffect(() => {
    // input 창에 값이 있을 때 버튼을 활성화
    setIsEnabled(form.refrigeratorName.trim().length > 0);
  }, [form.refrigeratorName]);

  // 로그인 userid 가져오고, 로그인 상태확인
  const { userId, isLogin, LoginSuccessStatus } = useUserStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !isLogin) {
      LoginSuccessStatus(savedToken); // 토큰이 있다면 로그인 상태 초기화
    }
    if (!userId) {
      navigate("/"); // 로그인 안되어 있으면 로그인 페이지로 이동
    }
  }, [userId, isLogin, navigate, LoginSuccessStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);

    const product = { ...form, userId }; // userId를 포함한 데이터

    try {
      const responseData = await addFridge(product); // addFridge 호출

      if (responseData.exists) {
        alert("중복된 이름의 냉장고가 이미 존재합니다.");
      } else {
        alert(
          `${product.refrigeratorName} 냉장고가 성공적으로 생성되었습니다.`
        );
        setForm({ refrigeratorName: "" }); // 폼 초기화

        //알림 전송 // 냉장고 생성
        await axios.post(`${import.meta.env.VITE_ALERT_IP}/createRefrigeratorNotification`, null, { params:{
          sender: userId  // userId를 sender로 전송
        }});


        navigate("/fridge/fridgemanage"); // 냉장고 관리 페이지로 이동
      }
    } catch (error) {
      console.log(userId);
      console.error("DB에 냉장고를 저장하는 중 오류 발생", error);
    }
  };

  return (
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      <MenuNavigate option={"냉장고 추가"} />
      <div className="w-[342px] h-[111px] font-semibold text-2xl mt-6">
        냉장고 이름을 입력해주세요.
        <br />
        <div className="w-[342px] h-[21px] font-medium text-sm text-gray-500 mt-3">
          냉장고를 등록해 음식을 편리하게 관리해보세요.
        </div>
      </div>
      <img
        className="w-[240px] h-[240px] mt-6"
        src="/assets/refridge.png"
        alt="냉장고 이미지"
      />
      <div className="w-[342px] mt-3">
        <input
          type="text"
          id="addFridge"
          placeholder="냉장고 이름을 입력해주세요"
          name="refrigeratorName"
          value={form.refrigeratorName}
          onChange={handleInputChange} // input 값 업데이트
          className="w-full h-[56px] p-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-500 mt-7"
        />
      </div>
      <div
        className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] h-14 cursor-pointer mt-6 ${
          isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1]"
        }`}
        onClick={isEnabled ? handleSubmit : null} // 클릭 시 제출 함수 호출
      >
        <div className="font-medium text-lg">냉장고 등록하기</div>
      </div>
    </main>
  );
};

export default AddFridge;

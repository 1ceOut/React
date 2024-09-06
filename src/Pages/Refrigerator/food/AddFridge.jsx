import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { addFridge } from "../../../query/FoodListQuery.jsx";
import axios from "axios";
import ConfirmModal from "./ConfirmModal"; // ConfirmModal 임포트

const AddFridge = () => {
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [form, setForm] = useState({ refrigeratorName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  useEffect(() => {
    setIsEnabled(form.refrigeratorName.trim().length > 0);
  }, [form.refrigeratorName]);

  const { userId, isLogin, LoginSuccessStatus } = useUserStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !isLogin) {
      LoginSuccessStatus(savedToken);
    }
    if (!userId) {
      navigate("/");
    }
  }, [userId, isLogin, navigate, LoginSuccessStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const product = { ...form, userId };

    try {
      const responseData = await addFridge(product);

      if (responseData.exists) {
        alert("중복된 이름의 냉장고가 이미 존재합니다.");
      } else {
        alert(
          `${product.refrigeratorName} 냉장고가 성공적으로 생성되었습니다.`
        );
        setForm({ refrigeratorName: "" }); // 폼 초기화

        try {
          // 알림 전송 - 냉장고 생성
          await axios.post(
            `${import.meta.env.VITE_ALERT_IP}/createRefrigeratorNotification`,
            null,
            {
              params: {
                //sender: encodeURIComponent(userId), // userId를 sender로 전송
                sender: userId,
                memo:product.refrigeratorName,
              },
            }
          );
          //console.log("알림이 성공적으로 전송되었습니다.");
        } catch (error) {
          //console.error("알림 전송 중 오류 발생:", error);
          //alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
        }
        setModalMessage(`${product.refrigeratorName} 냉장고가 성공적으로 생성되었습니다.`);
        setForm({ refrigeratorName: "" });

        navigate("/fridge/fridgemanage");
      }
    } catch (error) {
      console.error("DB에 냉장고를 저장하는 중 오류 발생", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleConfirmModal = () => {
    handleSubmit(); // 등록하기 실행
    setIsModalOpen(false); // 모달 닫기
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
              onChange={handleInputChange}
              className="w-full h-[56px] p-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-500 mt-7"
          />
        </div>
        <div
            className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] h-14 cursor-pointer mt-6 ${
                isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1]"
            }`}
            onClick={isEnabled ? handleOpenModal : null} // 클릭 시 모달 열기
        >
          <div className="font-medium text-lg">냉장고 등록하기</div>
        </div>

        {/* ConfirmModal 컴포넌트 */}
        <ConfirmModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmModal}
            fridgeName={form.refrigeratorName} // 냉장고 이름 전달
        />
      </main>
  );
};

export default AddFridge;

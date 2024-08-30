import React, {useEffect, useState} from "react";
import {inviteRefri} from "../../../query/RefriQuery.jsx";
import useUserStore from "../../../store/useUserStore.js";
import {useNavigate} from "react-router-dom";

const InviteButton = () => {
    const [code, setCode] = useState('');
    const [isEnabled, setIsEnabled] = useState(false); // 상태 추가
    const navigate = useNavigate();
    //로그인 userid 가져오고, 로그인 상태확인
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

    const handleSubmit = async () => {
        await inviteRefri(userId,code)
        alert(`초대 코드: ${code}`);
    };

    const handleChange = (event) => {
        setCode(event.target.value);
        setIsEnabled(event.target.value.trim() !== '');
    };

    return (
        <div className="w-[342px] h-auto bottom-[100px] absolute rounded-xl border-[1px] flex flex-col items-center font-medium text-[16px]">
            <input
                id="userinvite"
                name="userinvite"
                type="text"
                value={code}
                placeholder="초대코드를 입력해주세요"
                className="block outline-none w-[302px] h-14 border-y-[1px] text-gray-900 placeholder:text-[#A8A8A8] mt-4"
                onChange={handleChange} // 수정된 부분
            />
            <div
                style={{
                    width: 342,
                    height: 56,
                    borderRadius: 12,
                    border: "1px solid #E1E1E1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 16, // 버튼과 입력박스 사이의 간격 조정
                }}
                className={`flex text-[#868686] rounded-xl justify-center items-center cursor-pointer ${
                    isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1]"
                }`}
                onClick={isEnabled ? handleSubmit : null} // 클릭 시 제출 함수 호출
            >
                <div style={{ fontWeight: 500, fontSize: 16 }}>냉장고 등록하기</div>
            </div>
        </div>
    );
};

export default InviteButton;

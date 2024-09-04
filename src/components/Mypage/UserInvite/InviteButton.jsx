import React, { useEffect, useState } from "react";
import { inviteRefri } from "../../../query/RefriQuery.jsx";
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InviteButton = () => {
    const [code, setCode] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const navigate = useNavigate();
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

    const handleSubmit = async () => {
        try {
            const result = await inviteRefri(userId, code);
            console.log("초대 결과:", result);

            // 알림 전송 // 냉장고 등록
            await axios.post(`${import.meta.env.VITE_ALERT_IP}/registRefrigeratorUserNotification`, {
                sender: userId, // 이벤트를 발생시킨 사용자 ID
                senderrefri: code // 초대된 냉장고 ID (API에서 반환된 값 사용)
            });

            alert(`초대 코드: ${code}`);
            navigate("/");
        } catch (error) {
            console.error("초대 실패:", error);
        }
    };

    const handleChange = (event) => {
        setCode(event.target.value);
        setIsEnabled(event.target.value.trim() !== '');
    };

    return (
        <div className="w-full max-w-[342px] mx-auto my-4 p-4 rounded-lg border border-gray-200 shadow-lg bg-white flex flex-col items-center">
            <input
                id="userinvite"
                name="userinvite"
                type="text"
                value={code}
                placeholder="초대코드를 입력해주세요"
                className="block w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={handleChange}
            />
            <div
                className={`w-full h-12 rounded-lg mt-4 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out ${
                    isEnabled ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md hover:scale-105" : "bg-gray-300 text-gray-500"
                }`}
                onClick={isEnabled ? handleSubmit : null}
            >
                <span className="font-medium text-lg">냉장고 등록하기</span>
            </div>
        </div>
    );
};

export default InviteButton;

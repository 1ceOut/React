import React, { useEffect, useState } from "react";
import { inviteRefri } from "../../../query/RefriQuery.jsx";
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

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
            alert(`초대 코드: ${code}`);
        } catch (error) {
            console.error("초대 실패:", error);
        }
    };

    const handleChange = (event) => {
        setCode(event.target.value);
        setIsEnabled(event.target.value.trim() !== '');
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg">
            <div className="w-full max-w-[342px] mx-auto rounded-xl border flex flex-col items-center font-medium text-[16px]">
                <input
                    id="userinvite"
                    name="userinvite"
                    type="text"
                    value={code}
                    placeholder="초대코드를 입력해주세요"
                    className="block outline-none w-full max-w-[302px] h-14 border-y-[1px] text-gray-900 placeholder:text-[#A8A8A8] mt-4 px-2"
                    onChange={handleChange}
                />
                <div
                    style={{
                        width: '100%',
                        maxWidth: 342,
                        height: 56,
                        borderRadius: 12,
                        border: "1px solid #E1E1E1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 16,
                    }}
                    className={`flex text-[#868686] rounded-xl justify-center items-center cursor-pointer ${
                        isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1]"
                    }`}
                    onClick={isEnabled ? handleSubmit : null}
                >
                    <div style={{ fontWeight: 500, fontSize: 16 }}>냉장고 등록하기</div>
                </div>
            </div>
        </div>
    );
};

export default InviteButton;

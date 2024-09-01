import { useEffect, useState } from "react";
import { inviteUserList } from "../../../query/RefriQuery.jsx";
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

const InvitedUser = ({ refrigeratorId }) => {
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate("/");
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    useEffect(() => {
        const fetchInvitedUserData = async () => {
            if (refrigeratorId) {
                try {
                    const data = await inviteUserList(userId, refrigeratorId);
                    setUserData(data || []);
                } catch (error) {
                    console.error("초대된 사용자 데이터를 가져오는 데 실패했습니다", error);
                    setUserData([]);
                }
            }
        };

        fetchInvitedUserData();
    }, [refrigeratorId, userId]);

    return (
        <div className="w-full max-w-[800px] mx-auto p-4">
            <div className="text-[#333D4B] font-medium text-[18px] mb-6">
                선택한 냉장고의 초대 구성원
            </div>
            <div className="text-[#6C757D] text-[14px] mb-4">
                아래는 해당 냉장고의 초대코드로 입장한 구성원 목록입니다.
            </div>
            <div className="grid gap-4">
                {userData.map((user, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
                        <img src={user.photo} alt="사용자 사진" className="w-[50px] h-[50px] rounded-full mr-4 object-cover" />
                        <div className="flex-1">
                            <div className="text-[#333D4B] font-semibold text-[16px]">{user.name}</div>
                            <div className="text-[#6C757D] text-[14px]">{user.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvitedUser;

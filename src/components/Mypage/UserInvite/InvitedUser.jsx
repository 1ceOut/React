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
                    console.error("Failed to fetch invited user data", error);
                    setUserData([]);
                }
            }
        };

        fetchInvitedUserData();
    }, [refrigeratorId, userId]);

    return (
        <div>
            <div className="self-stretch flex items-center justify-between w-[342px] text-[#333D4B] font-medium text-[16px] mb-[18px]">
                위 냉장고를 선택하면 해당 냉장고의 초대코드로 입장한 구성원을 확인 할 수있음ㅇㅇㅇ
            </div>
            <div className="flex flex-col items-start">
                {userData.map((user, index) => (
                    <div key={index} className="flex items-center mb-4">
                        <div>
                            <img src={user.photo} alt="테스트 사진" className="w-[34px] h-[34px] mr-3" />
                        </div>
                        <div>
                            <div className="font-normal text-[13px] text-[#767676]">{user.name}</div>
                            <div className="font-semibold text-[13px] text-[#333D4B]">{user.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvitedUser;

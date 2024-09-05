// FridgeUser.jsx
import React, {useEffect, useState} from "react";
import useUserStore from "../../../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {masterUserList} from "../../../query/RefriQuery.jsx";
import UserSelect from "./UserSelect.jsx";
import UserDeleteButton from "./UserDeleteButton";

const FridgeUser = () => {

    const [userData, setUserData] = useState([]);
    const [checkedUsers, setCheckedUsers] = useState({}); // 냉장고별 체크된 유저를 관리
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate("/login");
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await masterUserList(userId);
                setUserData(data || []);
            } catch (error) {
                console.error("Failed to fetch user data", error);
                setUserData([]);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // 특정 냉장고의 체크된 유저를 업데이트하는 함수
    const handleUserSelectChange = (refriId, selectedUsers) => {
        setCheckedUsers((prevCheckedUsers) => ({
            ...prevCheckedUsers,
            [refriId]: selectedUsers,
        }));
    };

    // 모든 냉장고에서 체크된 유저들을 합쳐서 확인
    const allCheckedUsers = Object.values(checkedUsers).flat();
    const isAnyChecked = allCheckedUsers.length > 0;
    const checkedUserIds = allCheckedUsers.map(user => user.id);
    const checkedUserNames = allCheckedUsers.map(user => user.name);

    return (
        <div className="self-stretch flex flex-col w-[342px] mb-5">
            <div className="text-base font-semibold flex flex-col overflow-x-hidden h-[410px]">
                {userData.map((refri, index) => (
                    <div key={index} className="items-center space-x-2 mb-2">
                        <div className="bg-blue-100 text-xl font-bold text-blue-800 p-3 rounded-lg shadow-md mb-3 text-center">
                            {refri.refrigeratorName} 냉장고
                        </div>
                        <div>
                            <UserSelect
                                userId={userId}
                                refriId={refri.refrigerator_id}
                                onUserSelectChange={handleUserSelectChange} // 변경된 체크 상태를 전달
                            />
                        </div>
                    </div>
                ))}
            </div>
            <UserDeleteButton
                isEnabled={isAnyChecked}
                checkedUserIds={checkedUserIds}
                checkedUserNames={checkedUserNames}
                refriId={userData.length > 0 ? userData[0].refrigerator_id : ""}
            />
        </div>
    );
};

export default FridgeUser;

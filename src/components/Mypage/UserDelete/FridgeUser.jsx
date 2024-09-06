import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import { masterUserList } from "../../../query/RefriQuery.jsx";
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

    // 선택된 유저 정보가 있는 냉장고 목록과 각 냉장고의 체크된 유저를 확인
    const isAnyChecked = Object.values(checkedUsers).some((users) => users.length > 0);

    return (
        <div className="self-stretch flex flex-col w-[342px] mb-5">
            {userData.length === 0 ? (
                <div className="space-y-8 mt-16">
                    <div className="flex justify-center items-center">
                        <img src={"/assets/confirm.png"} alt="confirm" />
                    </div>
                    <center><p>등록된 냉장고가 없습니다</p></center>
                </div>
            ) : (
                <>
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
                        checkedUsers={checkedUsers} // 냉장고별로 체크된 유저 전달
                    />
                </>
            )}
        </div>
    );
};

export default FridgeUser;

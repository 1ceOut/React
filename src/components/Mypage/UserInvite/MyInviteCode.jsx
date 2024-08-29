import HorizontalLine from "../../Common/HorizontalLine";
import { masterUserList } from '../../../query/RefriQuery';
import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

const MyInviteCode = () => {
    const [userData, setUserData] = useState([]);
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
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch user data", error);
                setUserData([]);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return (
        <div className="p-4">
            <div className="space-y-4">
                {userData.map((refri, index) => (
                    <div key={index} className="items-center space-x-2 mb-2">
                        <div className="text-sm font-medium text-gray-700 p-2">
                            {refri.refrigeratorName}
                        </div>
                        <input
                            id={`food-${index}`}
                            name={`food-${index}`}
                            type="text"
                            className="block w-full p-1 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm mb-2"
                            value={refri.refrigerator_id}
                            readOnly
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(refri.refrigerator_id)}
                            className="text-sm font-semibold text-blue-600 border border-blue-600 rounded-md px-4 py-2 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            복사하기
                        </button>
                    </div>
                ))}
            </div>
            <div className="my-8">
                <HorizontalLine />
            </div>
        </div>
    );
};

export default MyInviteCode;

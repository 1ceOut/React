import React, { useEffect, useState } from 'react';
import { masterUserList, masterUserRefri } from '../../../query/RefriQuery';
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
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

    const handleInputChange = (index, e) => {
        const newValue = e.target.value;

        setUserData(prevData => {
            const updatedData = [...prevData];
            updatedData[index] = {
                ...updatedData[index],
                refrigeratorName: newValue
            };
            return updatedData;
        });
    };

    const updateData = async () => {
        try {
            const requestPayload = {
                userId: userId,
                data: userData
            };
            const updatedData = await masterUserRefri(requestPayload);
            console.log("Updated Data: ", updatedData);
        } catch (error) {
            console.error("Failed to update data", error);
        }
    };

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

    return (
        <div className='self-stretch w-[342px]'>
            <div className="self-stretch border rounded-[12px] w-[342px] p-4 bg-white shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">니가 만든 냉장고임;</h2>
                <div className="flex flex-col gap-3">
                    {userData.map((refri, index) => (
                        <div key={index} className="w-full">
                            <input
                                id={`food-${index}`}
                                name={`food-${index}`}
                                type="text"
                                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                value={refri.refrigeratorName}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-[342px] flex justify-between mt-8">
                    <button
                        onClick={updateData}
                        className="w-[300px] h-[48px] rounded-xl border border-[#009B77] bg-[#009B77] text-white text-[16px] font-medium"
                    >
                        이름 수정
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;

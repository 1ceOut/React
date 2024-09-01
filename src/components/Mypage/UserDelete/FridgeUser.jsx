import React, {useEffect, useState} from "react";
import useUserStore from "../../../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {masterUserList} from "../../../query/RefriQuery.jsx";
import UserSelect from "./UserSelect.jsx";


const FridgeUser = () => {


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
        <div className="self-stretch flex items-center justify-between w-[342px] mb-5">
             <div className="text-base font-semibold">
                 {userData.map((refri, index) => (
                     <div key={index} className="items-center space-x-2 mb-2">
                         <div className="text-sm font-medium text-gray-700 p-2 mb-3" >
                             {refri.refrigeratorName} 냉장고
                         </div>
                         <UserSelect userId={userId} refriId={refri.refrigerator_id}/>
                     </div>
                 ))}
             </div>
        </div>
    );
};

export default FridgeUser;
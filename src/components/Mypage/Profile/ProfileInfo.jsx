
import useUserStore from './../../../store/useUserStore';
import {useEffect, useState} from "react";
import {UserList} from "../../../query/RefriQuery.jsx";

const ProfileInfo = () => {

    const { userProfile, userName,userId } = useUserStore();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchInvitedUserData = async () => {
            if (userId) {
                try {
                    const data = await UserList(userId);
                    setUserData(data || []);
                } catch (error) {
                    setUserData([]);
                }
            }
        };

        fetchInvitedUserData();
    }, [userId]);

    return (
        <div className="self-stretch flex items-center w-[342px] h-14 mt-[30px]"> 
            <div className="flex justify-start items-center">
                <div className="flex justify-center items-center w-20 h-20 mr-[14px] bg-[#EFEFEF] rounded-full">
                    <img
                        src={userProfile}
                        alt="프로필사진"
                        className="w-20 h-20 rounded-full object-cover cursor-pointer"
                    />
                </div>
                <div>
                    <div className="font-semibold text-[18px]">
                        {userName}
                    </div>
                    {userData.map((user, index) => (
                    <div key={index} className="font-normal text-[14px] text-[#767676]">
                        {user.email}
                    </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProfileInfo;
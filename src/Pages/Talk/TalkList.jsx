import { useNavigate } from 'react-router-dom';
import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import useUserStore from "../../store/useUserStore.js";
import useFridgeOptions, {masterUserList} from "../../query/RefriQuery.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

import ProfileImages from "../../components/Talk/ProfileImages.jsx";
import "../../../public/css/ChatCSS/chat.css";

const Talk = () => {
    const navigate = useNavigate();

    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const { data, error, isLoading, } = useFridgeOptions(userId);
    const [filteredFridges, setFilteredFridges] = useState([]);
    const [fridgeIds, setFridgeIds] = useState([]); // fridgeIds 상태 추가
    const [lastMessages, setLastMessages] = useState({});
    const [userMap, setUserMap] = useState({}); // 냉장고 ID별 유저 데이터 저장

    const fetchLastMessage = async (refrigerator_id) => {
        try {
            //const response = await axios.get(`http://localhost:8081/api/chatroom/${refrigerator_id}/last-message`);
            const response = await axios.get(`https://api.icebuckwheat.kro.kr/api/chatroom/${refrigerator_id}/last-message`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching last message for fridge ${refrigerator_id}:`, error);
            return null;
        }
    };

    const fetchUsersForFridge = async (refrigerator_id) => {
        try {
            const response = await axios.get(`https://api.icebuckwheat.kro.kr/api/food/find/refriUser?refrigerator_id=${refrigerator_id}`);
            return response.data.map(user => ({
                ...user,
                profileImageUrl: user.photo // 여기서 프로필 이미지 URL을 가져온다고 가정
            }));
        } catch (error) {
            console.error(`Error fetching users for fridge ${refrigerator_id}:`, error);
            return [];
        }
    };

    useEffect(() => {
        const fetchMasterFridges = async () => {
            try {
                const masterFridges = await masterUserList(userId);

                if (Array.isArray(masterFridges)) {
                    console.log("masterFridges: "+masterFridges);

                    //userId와 id를 문자열로 비교
                    const filtered = masterFridges.filter(fridge => fridge.id == userId );
                    console.log("Filtered Fridges: ", filtered); // 필터링된 데이터 확인
                    setFilteredFridges(filtered);
                } else {
                    console.error("Unexpected data structure:", masterFridges);
                }
            } catch (error) {
                console.error("Error fetching master fridges:", error);
            }
        };

        const fetchAllFridges = () => {
            if (Array.isArray(data)) {
                console.log("All Fridges: ", data); // 전체 냉장고 데이터 확인

                // refrigerator_id만 추출하여 새로운 배열 생성
                const ids = data.map(fridge => fridge.refrigerator_id);

                console.log("Fridge IDs: ", ids); // 추출된 refrigerator_id 확인
                setFridgeIds(ids);
            } else {
                console.error("Unexpected data structure:", data);
            }
        };

        fetchAllFridges();
        fetchMasterFridges();


    }, [data,userId, isLogin, navigate, LoginSuccessStatus]);


    useEffect(() => {
        const fetchAllLastMessages = async () => {

            const messages = {};
            for (const id of fridgeIds) {
                const lastMessage = await fetchLastMessage(id);
                messages[id] = lastMessage;
            }
            setLastMessages(messages);
        };

        if (fridgeIds.length > 0) {
            fetchAllLastMessages();
        }
    }, [fridgeIds]);

    useEffect(() => {
        const fetchAndSetUsers = async () => {
            const userData = {};
            for (const id of fridgeIds) {
                const users = await fetchUsersForFridge(id);
                userData[id] = users; // 냉장고 ID를 키로 하고 유저 데이터를 값으로 저장
            }
            setUserMap(userData);
        };

        if (fridgeIds.length > 0) {
            fetchAndSetUsers();
        }
    }, [fridgeIds]);

    // 클릭 이벤트 핸들러
    const handleClick = (refrigeratorName, refrigerator_id) => {
        // 해당 냉장고의 userId만 넘김
        const selectedFridge = filteredFridges.find(fridge => fridge.refrigerator_id === refrigerator_id);

        if (selectedFridge) {
            navigate(`/Talk/TalkDetail?name=${refrigeratorName}&refri_id=${refrigerator_id}&id=${selectedFridge.id}`);
        }else {
            navigate(`/Talk/TalkDetail?name=${refrigeratorName}&refri_id=${refrigerator_id}&id=null`);
            console.error("Selected fridge not found.");
        }

    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // 냉장고 정보 사용
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"채팅방"} alertPath="/addinfo/habit"/>
            <div className="w-[342px] h-[44px] flex items-center">
                <div className="flex items-center w-6 h-6">
                    <img className="w-[23px] h-[23px]" src="/assets/alert_icon.png" alt="Alert Icon"/>
                </div>
                <p className="flex-grow font-medium text-[15px] mx-4">
                    {data?.length > 0 ? `${data[0].name}의 유통기한이 2일 남았어요` : '유통기한 정보가 없습니다'}
                </p>
                <div className="flex items-center w-6 h-6">
                    <img className="w-[23px] h-[23px]" src="/assets/right.png" alt="Right Arrow"/>
                </div>
            </div>
            <HorizontalLine/>
            <div>
                {data?.map(refri => (
                    <div key={refri.refrigerator_id}
                         className="mt-8 w-[342px] h-10 flex items-center px-1 cursor-pointer"
                         onClick={() => handleClick(refri.refrigeratorName, refri.refrigerator_id)}>
                        <ProfileImages users={userMap[refri.refrigerator_id] || []} />
                        <div className="flex-1 ml-2 flex flex-col justify-between h-full">
                            <div className="flex items-center justify-between h-1/2">
                                <div className="flex">
                                    <p className="font-semibold text-[15px]">{refri.refrigeratorName}</p>
                                    <p className="ml-2 font-semibold text-[13px] text-gray-500 flex justify-center items-center">
                                        {userMap[refri.refrigerator_id]?.length}
                                    </p>
                                </div>
                                <p className="font-normal text-[13px] text-gray-500 text-right">
                                    {lastMessages[refri.refrigerator_id]?.timestamp}
                                </p>
                            </div>
                            <div className="flex items-center w-52 overflow-hidden h-1/2">
                                <p className="w-[50px] h-[16px] m-0 font-normal text-[12.7px] text-gray-500 flex-1">
                                    {lastMessages[refri.refrigerator_id]?.message || ''}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Talk;

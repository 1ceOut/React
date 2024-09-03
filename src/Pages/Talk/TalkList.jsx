import { useNavigate } from 'react-router-dom';
import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import useUserStore from "../../store/useUserStore.js";
import useFridgeOptions, {masterUserList,inviteUserList} from "../../query/RefriQuery.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Talk = () => {
    const navigate = useNavigate();

    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const { data, error, isLoading, } = useFridgeOptions(userId);
    const [filteredFridges, setFilteredFridges] = useState([]);
    const [fridgeIds, setFridgeIds] = useState([]); // fridgeIds 상태 추가
    const [lastMessages, setLastMessages] = useState({});

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
            <div style={{width: 342, height: 44, display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', width: 24, height: 24}}>
                    <img style={{width: 23, height: 23}} src="/assets/alert_icon.png" alt="Alert Icon"/>
                </div>
                <p style={{flexGrow: 1, fontWeight: 500, fontSize: 15, margin: '0 16px'}}>
                    {data?.length > 0 ? `${data[0].name}의 유통기한이 2일 남았어요` : '유통기한 정보가 없습니다'}
                </p>
                <div style={{display: 'flex', alignItems: 'center', width: 24, height: 24}}>
                    <img style={{width: 23, height: 23}} src="/assets/right.png" alt="Right Arrow"/>
                </div>
            </div>
            <HorizontalLine/>
            <div>
                {data?.map(refri => (
                        <div key={refri.refrigerator_id}
                            style={{
                                marginTop: 32,
                                width: 342,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 4px',
                                cursor: 'pointer'
                            }}
                             onClick={() => handleClick(refri.refrigeratorName, refri.refrigerator_id)}>
                            <div style={{
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                                <img src="/assets/people.png" alt="People" style={{width: '100%', height: '100%'}}/>
                            </div>

                            <div style={{
                                flex: 1,
                                marginLeft: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%'
                            }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: '50%'
                                    }}>
                                    <div style={{display: 'flex'}}>
                                        <p style={{fontWeight: 600, fontSize: 15}}>{refri.refrigeratorName}</p>
                                        <p style={{
                                            display: 'flex',
                                            marginLeft: 8,
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: '#767676',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}></p>
                                    </div>
                                    <p style={{fontWeight: 400, fontSize: 13, color: '#767676', textAlign: 'right'}}>
                                        { lastMessages[refri.refrigerator_id]?.timestamp}</p>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', height: '50%'}}>
                                    <p style={{
                                        width: 290,
                                        height: 16,
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: 12.7,
                                        color: '#767676',
                                        flex: 1
                                    }}>
                                        {lastMessages[refri.refrigerator_id]?.message || 'No messages yet'}
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
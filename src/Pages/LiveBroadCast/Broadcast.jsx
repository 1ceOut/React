import React, { useEffect, useRef, useState } from 'react';
import "@livekit/components-styles";
import {
    ControlBar,
    LayoutContextProvider,
    LiveKitRoom,
    useToken,
    RoomAudioRenderer, DisconnectButton, TrackToggle, MediaDeviceSelect,
} from "@livekit/components-react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatComponent } from "../../components/LiveBroadCast/ChatComponent.jsx";
import VideoConference from "../../components/LiveBroadCast/VideoConference.jsx";
import useUserStore from "../../store/useUserStore.js";
import { Getuser, start, end } from "../../query/LiveroomQuery.js";
import axios from 'axios';

let LIVEKIT_URL = "wss://openvidu.midichi.kro.kr/";

const api_url = import.meta.env.VITE_API_IP;

const MyLiveKitApp = () => {
    const { roomName, participantName } = useParams();
    const { userId } = useUserStore();
    const token = useToken(`${api_url}/api/token`, roomName, {
        userInfo: { identity: participantName },
    });

    const [publisher, setPublisher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const response = await Getuser(roomName);
                setPublisher(response.data.name);
            } catch (error) {
                console.error("Error fetching publisher:", error);
            }
        };

        fetchPublisher();
        //if (participantName === publisher) start(userId);
        // if (participantName === publisher) {
        //     start(userId);
        //     //sendBroadcastNotification();
        // }
    }, [userId]);

    // //알림 전송 // 방송 시작
    // const sendBroadcastNotification = async () => {
    //     try {
    //         await axios.post(`${import.meta.env.VITE_ALERT_IP}/startBroadcasting`, null, {
    //             params: { sender: userId },
    //         });
    //         //console.log("Broadcast notification sent.");
    //     } catch (error) {
    //         //console.error("알림 전송 중 오류 발생:", error);
    //         //alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
    //     }
    // };

    const handleDisconnected = () => {
        if (participantName.startsWith("방장")) {
            end(userId)
        }
        navigate("/community/feed")
    }

    const handleLeave = () => {
        // 사용자가 페이지를 떠날 때 실행할 함수
        handleDisconnected();
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // 대화상자를 표시하기 위해 필요
            e.preventDefault();
            e.returnValue = ''; // 크롬에서는 이 값이 필요하지 않지만, 다른 브라우저 호환성을 위해 남겨둡니다.
        };

        const handleUnload = (e) => {
            // 페이지를 떠날 때 실행할 함수 호출
            handleLeave();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);


    return (
        <div className='flex flex-col items-center pt-5 pb-2 mx-auto w-full max-w-[390px] h-auto'>
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect={true}
                audio={true}
                video={true}
                data-lk-theme={"default"}
                debug={"true"}
                style={{ width: '100%', height: '100%', display: "flex" }}
                onDisconnected={handleDisconnected}
            >
                <LayoutContextProvider>
                    <div className="flex flex-col h-full w-full]">
                        <VideoConference style={{ height: '56vh', width: "100%", display: "flex" }}/>
                        {
                            participantName.startsWith("방장") ? (
                                <>
                                    <ControlBar style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: "flex",
                                        flexWrap: "wrap",
                                        maxHeight: "150px"
                                    }} />
                                </>)
                                : (<DisconnectButton>연결 끊기</DisconnectButton>)
                        }
                        <ChatComponent />
                    </div>
                </LayoutContextProvider>
                <RoomAudioRenderer />
            </LiveKitRoom>
        </div>
    );
};

export default MyLiveKitApp;

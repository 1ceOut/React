import React, {useEffect, useRef, useState} from 'react';
import "@livekit/components-styles";
import {
    ControlBar,
    LayoutContextProvider,
    LiveKitRoom,
    useToken,
    RoomAudioRenderer, DisconnectButton,
} from "@livekit/components-react";
import {useNavigate, useParams} from "react-router-dom";
import {ChatComponent} from "../../components/LiveBroadCast/ChatComponent.jsx";
import VideoConference from "../../components/LiveBroadCast/VideoConference.jsx";

let LIVEKIT_URL = "wss://openvidu.midichi.kro.kr/";

const api_url = import.meta.env.VITE_API_IP;
const MyLiveKitApp = () => {
    const {roomName, participantName} = useParams();
    const token = useToken(`${api_url}/api/token`, roomName, {
        userInfo: {identity: participantName},
    });
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center mx-auto w-full bg-zinc-100 max-w-[390px] h-screen'>
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect={true}
                audio={true}
                video={true}
                data-lk-theme={"default"}
                debug={"true"}
                style={{width: '38vh', height: '130vh'}}
            >
                <LayoutContextProvider>
                    <div className="flex flex-col h-full">
                        <VideoConference roomName={roomName} style={{flex: '1',height: '54%', width: "100%"}}
                                         participantName={participantName}/>
                        <ChatComponent/>
                        {
                            roomName===participantName?(<ControlBar style={{width: '100%', maxHeight: '150px', display: "flex",flexWrap:"wrap"}}/>)
                                :(<DisconnectButton onClick={()=>navigate("/community/feed")}>연결 끊기</DisconnectButton>)
                        }
                    </div>
                </LayoutContextProvider>
                <RoomAudioRenderer/>
            </LiveKitRoom>
        </div>
    );
};

export default MyLiveKitApp;

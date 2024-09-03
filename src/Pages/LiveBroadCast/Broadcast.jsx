import React, {useEffect, useRef, useState} from 'react';
import "@livekit/components-styles";
import {
    ControlBar,
    LayoutContextProvider,
    LiveKitRoom,
    useToken,
    RoomAudioRenderer, DisconnectButton, TrackToggle, MediaDeviceSelect,
} from "@livekit/components-react";
import { useNavigate, useParams} from "react-router-dom";
import {ChatComponent} from "../../components/LiveBroadCast/ChatComponent.jsx";
import VideoConference from "../../components/LiveBroadCast/VideoConference.jsx";
import useUserStore from "../../store/useUserStore.js";
import {Getuser,start,end} from "../../query/LiveroomQuery.js";

let LIVEKIT_URL = "wss://openvidu.midichi.kro.kr/";

const api_url = import.meta.env.VITE_API_IP;
const MyLiveKitApp = () => {
    const {roomName, participantName} = useParams();
    const {userId} = useUserStore();
    const token = useToken(`${api_url}/api/token`, roomName, {
        userInfo: {identity: participantName},
    });

    const [publisher, setPublisher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublisher = async () => {
            try {
                const response = await Getuser(userId);
                setPublisher(response.data.name);
            } catch (error) {
                console.error("Error fetching publisher:", error);
            }
        };

        fetchPublisher();
    }, [userId]);

    const handleDisconnected = () => {
        console.log("disconnected");
        if (publisher===participantName){
            end(userId)
        }
        navigate("/community/feed")
    }

    return (
        <div className='flex flex-col items-center mx-auto w-full bg-zinc-100 max-w-[390px] h-auto'>
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect={true}
                audio={true}
                video={true}
                data-lk-theme={"default"}
                debug={"true"}
                style={{width: '390px', height: '550px'}}
                onDisconnected={handleDisconnected}
            >
                <LayoutContextProvider>
                    <div className="flex flex-col h-full">
                        <VideoConference style={{flex: '1',height: '54%', width: "100%"}} publisherName={publisher}/>
                        <ChatComponent/>
                        {
                            participantName===publisher?(
                                <>
                                    <ControlBar style={{width: '100%', maxHeight: '100px', display: "flex",flexWrap:"wrap"}}/>
                                </>)
                                :(<DisconnectButton>연결 끊기</DisconnectButton>)
                        }
                    </div>
                </LayoutContextProvider>
                <RoomAudioRenderer/>
            </LiveKitRoom>
        </div>
    );
};

export default MyLiveKitApp;

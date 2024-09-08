import React, {useEffect, useRef, useState} from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Items from "../Shopping/Items.jsx";

const api_url = import.meta.env.VITE_API_IP;

const Subtitle = ({publisher}) => {
    const [value, setValue] = useState('');
    const stompClient = useRef(null);
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            // 음성인식 결과가 value 상태값으로 할당됩니다.
            stompClient.current.send(`/live/app/${roomName}/audio`, {}, result);
            setValue(result);
        },
    });

    const { roomName, participantName } = useParams();

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    useEffect(() => {
        const socket = new SockJS(`${api_url}/live/ws`, null, {
            transports: ['xhr-streaming', 'xhr-polling'],
            xhr: () => xhr,
        });
        // WebSocket 연결
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/live/topic/${roomName}/subtitles`, (message) => {
                setValue(message.body);
            });
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <div>{value}</div>
            {
                participantName.startsWith("방장")?(<button onMouseDown={listen} onMouseUp={stop}>
                        🎤
                    </button>):null
            }
            {
                listening && <div></div>
            }
        </div>
    );
}

Subtitle.propTypes = {
    publisher: PropTypes.string,
};

export default Subtitle;
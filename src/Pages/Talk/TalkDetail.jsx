import { useState, useEffect, useRef } from "react";
import MenuNavigate from "../../components/Common/MenuNavigate";
import { FaChevronDown, FaChevronUp, FaSmile } from 'react-icons/fa'; // FaSmile 아이콘 추가
import axiosApi from "./axiosApi.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import useUserStore from "../../store/useUserStore.js";
import { useLocation } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // EmojiPicker 임포트
import axios from "axios";

//시간 별x
const getTimeParts = (timestamp) => {
    const timeString = timestamp.match(/(오전|오후)\s(\d+):(\d+):(\d+)/);
    if (!timeString) {
        console.error("Invalid timestamp format:", timestamp);
        return { hours: null, minutes: null }; // null 반환
    }

    let hours = parseInt(timeString[2], 10);
    const minutes = parseInt(timeString[3], 10);
    const period = timeString[1];

    if (period === "오후" && hours !== 12) {
        hours += 12;
    } else if (period === "오전" && hours === 12) {
        hours = 0; // 오전 12시는 0시로 설정
    }

    return { hours, minutes };
};

// 날짜별로 메시지 그룹화
const groupMessagesByDate = (messages) => {
    const grouped = messages.reduce((acc, message) => {
        const date = new Date(message.datestamp).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(message);
        return acc;
    }, {});

    return grouped;
};

const TalkDetail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refrigeratorId = queryParams.get('refri_id');
    const masterId = queryParams.get('id');
    const refrigeratorName = queryParams.get('name');
    const chatroomSeq = refrigeratorId;

    const { userName, userProfile, userId: currentUserId } = useUserStore();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 이모지 선택기 상태
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        connect();
        fetchMessages();
        fetchAnnouncement(); // 공지사항 불러오기
        return;
    }, []);

    const chatEndRef = useRef(null);
    const stompClient = useRef(null);

    const api_server = import.meta.env.VITE_API_IP;

    const connect = () => {
        // const socket = new SockJS(`http://localhost:8081/ws`, null);
        const socket = new SockJS(`${api_server}/ws`, null, {
            transports: ['xhr-streaming', 'xhr-polling'],
            xhr: () => xhr,
        });
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, (frame) => {
            console.log("Connected: " + frame);
            console.log("WebSocket readyState:", stompClient.current.ws.readyState);

            stompClient.current.subscribe(`/topic/messages`, (message) => {
                console.log("Received message:", message.body);
                try {
                    const newMessage = JSON.parse(message.body);  // 메시지를 JSON으로 파싱
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                } catch (error) {
                    console.error("Failed to parse incoming message:", error);
                }
            });
        }, (error) => {
            console.error("STOMP error:", error);
            setTimeout(connect, 1000);
        });
    };

    const fetchMessages = () => {
        axiosApi.get(`${api_server}/api/chatroom/${chatroomSeq}/messages`, {
            // axiosApi.get(`/api/chatroom/${chatroomSeq}/messages`, {
            withCredentials: true
        })
            .then((response) => {
                console.log("Fetched messages:", response.data);
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error("Unexpected data format for messages:", response.data);
                }
            })
            .catch((error) => console.error("Failed to fetch chat messages.", error));
    };

    const fetchAnnouncement = () => {
        // 공지사항 불러오기
        axiosApi.get(`${api_server}/api/announcement/${chatroomSeq}`, {
            // axiosApi.get(`/api/announcement/${chatroomSeq}`, {
            withCredentials: true
        })
            .then((response) => {
                setAnnouncement(response.data.announcement); // 저장된 공지사항 세팅
            })
            .catch((error) => console.error("Failed to fetch announcement.", error));
    };

    const sendMessage = () => {
        if (!newMessage.trim()) {
            return; // 공백 또는 빈 메시지일 경우 전송 안함
        }
        if (stompClient.current && stompClient.current.ws.readyState === WebSocket.OPEN) {
            const messageObj = {
                chatroomSeq: chatroomSeq,
                sender: userName,
                message: newMessage,
                senderSeq: Date.now(),
                userProfile: userProfile,
                timestamp: new Date().toLocaleTimeString(),
                datestamp: new Date().toLocaleDateString()
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(messageObj));
            setNewMessage("");
        } else {
            console.error("WebSocket connection is not open.");
        }
    };


    const handleSetAnnouncement = () => {
        if (newAnnouncement.trim() !== "") {
            axiosApi.post(`${api_server}/api/announcement/${chatroomSeq}`, {
                // axiosApi.post(`/api/announcement/${chatroomSeq}`, {
                announcement: newAnnouncement
            }, {
                withCredentials: true
            }).then(() => {
                setAnnouncement(newAnnouncement);

                //sendNewChattingMasterNotification(); // 알림 전송 함수 호출

                setNewAnnouncement("");
                setIsAnnouncementVisible(false);
            }).catch((error) => {
                console.error("Failed to update announcement.", error);
            });
        }
    };

    // 새로운 공지 알림을 전송하는 함수
    const sendNewChattingMasterNotification = async () => {
        try {
            console.log(currentUserId);
            console.log(chatroomSeq);
            console.log(newAnnouncement);
            await axios.post(`${import.meta.env.VITE_ALERT_IP}/newChattingMaster`, {
                sender: encodeURIComponent(currentUserId),  // 공지사항을 설정한 사용자
                senderrefri: chatroomSeq, // 현재 냉장고(채팅방) ID
                memo: newAnnouncement,
            }, {
                withCredentials: true
            });
            //console.log("공지 알림이 성공적으로 전송되었습니다.");
        } catch (error) {
            //console.error("공지 알림 전송 중 오류 발생:", error);
        }
    };

    const toggleAnnouncementVisibility = () => {
        setIsAnnouncementVisible(!isAnnouncementVisible);
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "auto" });
    };


    const onEmojiClick = (emojiObject) => {
        setNewMessage(prevInput => prevInput + emojiObject.emoji); // 이모지를 메시지에 추가
        setShowEmojiPicker(false); // 이모지 선택기를 닫음
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <main className={`flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen`}>
            <div>
                <MenuNavigate option={refrigeratorName} alertPath="/addinfo/habit" />
            </div>
            <div className="flex flex-col w-[390px] h-full bg-gray-50">
                {/* 공지사항 */}
                <div className="bg-gray-100 p-3 text-center text-sm text-gray-600 flex items-center justify-between">
                    <img src="/assets/alert_icon.png" alt="확성기" className="w-5 h-5" />
                    <span className="w-[250px] overflow-hidden h-4">{announcement}</span> {/* 공지사항 내용 */}
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={toggleAnnouncementVisibility}
                        disabled={masterId !== currentUserId}
                    >
                        {isAnnouncementVisible ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>

                {isAnnouncementVisible && (
                    <div className="bg-gray-100 p-3 text-center text-sm">

                        <input
                            type="text"
                            className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 text-sm"
                            placeholder="새 공지사항 입력..."
                            value={newAnnouncement}
                            onChange={(e) => setNewAnnouncement(e.target.value)}
                        />

                        <button
                            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 text-sm"
                            onClick={handleSetAnnouncement}
                        >
                            공지사항 설정
                        </button>

                    </div>
                )}

                {/* 채팅 메시지 목록 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                    style={{ maxHeight: 'calc(100vh - 176px)' }}>
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                        <div key={date}>
                            <div className="text-center my-4">
                                <span className="px-4 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                                    {date}
                                </span>
                            </div>
                            {messages.map((msg, index) => {
                                const prevMsg = index > 0 ? messages[index - 1] : null;  // prevMsg 정의

                                const { hours: currentHours, minutes: currentMinutes } = getTimeParts(msg.timestamp);
                                const {
                                    hours: prevHours,
                                    minutes: prevMinutes
                                } = prevMsg ? getTimeParts(prevMsg.timestamp) : {};

                                const isSameSenderAsPrevious = index > 0 && prevMsg.sender === msg.sender;
                                const isSameMinuteAsPrevious = index > 0 && currentHours !== null && prevHours !== null && prevHours === currentHours && prevMinutes === currentMinutes;

                                const showProfileAndName = !isSameSenderAsPrevious || !isSameMinuteAsPrevious;

                                return (
                                    <div key={index}
                                        className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'} mb-4`}>
                                        {/* 프로필 사진 렌더링 (본인이 보낸 메시지에서는 생략) */}
                                        {showProfileAndName && msg.sender !== userName && (
                                            <img src={msg.userProfile} alt="profile"
                                                className="w-8 h-8 rounded-full mr-2" />
                                        )}

                                        <div
                                            className={`flex flex-col ${msg.sender === userName ? 'items-end' : 'items-start'}`}>
                                            {/* 발신자 이름을 연속 메시지에서 시, 분이 동일할 때는 생략 */}
                                            {showProfileAndName && (
                                                <div
                                                    className={`text-xs ${msg.sender === userName ? "text-blue-500" : "text-gray-500"} mb-1`}>
                                                    {msg.sender}
                                                </div>
                                            )}
                                            <div
                                                className={`flex ${msg.sender === userName ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                                                <div
                                                    className={`max-w-xs rounded-lg p-2 text-sm ${msg.sender === userName ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"} ${msg.sender === userName ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                                    {msg.message}
                                                </div>
                                                <span
                                                    className={`text-gray-400 text-xs ${msg.sender === userName ? 'mr-2' : 'ml-2'}`}>
                                                    {msg.timestamp}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    ))}

                    <div ref={chatEndRef} />
                </div>

                {/* 입력 및 전송 버튼 */}
                <div className="bottom-0 bg-white border-t border-gray-200 p-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 text-sm"
                            placeholder="메시지를 입력하세요..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        {/* 이모지 선택기 토글 버튼 */}
                        <button
                            className="ml-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <FaSmile />
                        </button>
                        <button
                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
                            onClick={sendMessage}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevent default form submission
                                    sendMessage();
                                }
                            }}
                        >
                            전송
                        </button>
                    </div>
                    {/* 이모지 선택기 */}
                    {showEmojiPicker && (
                        <div className="absolute bottom-20 right-4">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TalkDetail;

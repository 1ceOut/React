import { useState, useEffect, useRef } from "react";
import MenuNavigate from "../../components/Common/MenuNavigate";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TalkDetail = () => {
    const [messages, setMessages] = useState([
        { sender: "user", senderName: "사용자", text: "냉장고 채팅방임" },
        { sender: "other", senderName: "상대방", text: "하 하" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [announcement, setAnnouncement] = useState("이건 공지사항 띄울거임");
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);

    const chatEndRef = useRef(null);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { sender: "user", senderName: "사용자", text: newMessage }]);
            setNewMessage("");
        }
    };

    const handleSetAnnouncement = () => {
        if (newAnnouncement.trim() !== "") {
            setAnnouncement(newAnnouncement);
            setNewAnnouncement("");
            setIsAnnouncementVisible(false);
        }
    };

    const toggleAnnouncementVisibility = () => {
        setIsAnnouncementVisible(!isAnnouncementVisible);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option="일반 냉장고" alertPath="/addinfo/habit"/>

            <div className="flex flex-col w-[390px] h-full bg-gray-50">
                {/* 공지사항 */}
                <div className="bg-gray-100 p-3 text-center text-sm text-gray-600 flex items-center justify-between">
                    <img src="/assets/alert_icon.png" alt="확성기" className="w-5 h-5"/>
                    <span className="w-[250px] overflow-hidden h-4">{announcement}</span> {/*공지사항 내용*/}
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={toggleAnnouncementVisibility}
                    >
                        {isAnnouncementVisible ? <FaChevronUp/> : <FaChevronDown/>}
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ maxHeight: 'calc(100vh - 176px)' }}>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
                            <div className={`text-xs ${message.sender === "user" ? "text-blue-500" : "text-gray-500"} mb-1`}>
                                {message.senderName}
                            </div>

                            <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                {message.sender === "other" && (
                                    <img src="/assets/profile.png" alt="profile" className="w-8 h-8 rounded-full mr-2"/>
                                )}
                                <div
                                    className={`max-w-xs rounded-lg p-2 text-sm ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                                    {message.text}
                                </div>
                            </div>
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
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm"
                            onClick={handleSendMessage}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TalkDetail;

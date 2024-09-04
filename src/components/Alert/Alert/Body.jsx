import React, { useEffect } from "react";
import useUserStore from "../../../store/useUserStore.js"; // useUserStore import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // 날짜 형식화를 위해 사용

const Body = () => {
    const { notifications = [], setNotifications, setHasUnread } = useUserStore();
    const navigate = useNavigate();

    const updateHasUnread = (updatedNotifications) => {
        const hasUnread = updatedNotifications.some(notification => !notification.alertcheck);
        setHasUnread(hasUnread);
    };

    const handleMarkAsRead = async (alert_id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_ALERT_IP}/markAsRead/${alert_id}`);
            if (response.status === 200) {
                const updatedNotifications = notifications.map((notification) =>
                    notification.alert_id === alert_id
                        ? { ...notification, alertcheck: true }
                        : notification
                );
                setNotifications(updatedNotifications);
                updateHasUnread(updatedNotifications);
            }
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const handleDeleteNotification = async (alert_id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_ALERT_IP}/delete/${alert_id}`);
            if (response.status === 200) {
                const updatedNotifications = notifications.filter((notification) => notification.alert_id !== alert_id);
                setNotifications(updatedNotifications);
                updateHasUnread(updatedNotifications);
            }
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const renderNotificationItem = (notification) => {
        let imgSrc = '';
        let statusText = '';
        let titleText = '';
        console.log("notification : ", notification)

        switch (notification.alerttype) {
            case '냉장고 생성':
                imgSrc = '';
                statusText = '냉장고를 생성했어요!';
                titleText = `${notification.sender}님이 냉장고를 생성했어요.`;
                break;
            case '냉장고 수정':
                imgSrc = '';
                statusText = '냉장고 이름이 수정됐어요!';
                titleText = `${notification.sender}님이 ${notification.senderrefri}냉장고 이름을 수정했어요.`;
                break;
            case '냉장고 등록':
                imgSrc = '';
                statusText = '냉장고에 참가했어요!';
                titleText = `${notification.sender}님이 ${notification.senderrefri}냉장고에 참가했어요.`;
                break;
            case '냉장고 삭제':
                imgSrc = '';
                statusText = '냉장고가 삭제됐어요!';
                titleText = `${notification.sender}님이 ${notification.senderrefri}냉장고를 삭제했어요.`;
                break;
            case '채팅':
                imgSrc = '';
                statusText = '채팅을 올라왔어요!';
                titleText = `${notification.sender}님이 채팅을 남겼어요.`;
                break;
            case '채팅 공지':
                imgSrc = '';
                statusText = '채팅방 공지!';
                titleText = `${notification.sender}님이 ${notification.senderrefri}냉장고에 공지를 남겼어요.`;
                break;
            case '유통기한 임박':
                imgSrc = '';
                statusText = 'D-';
                titleText = `${notification.food}`;
                break;
            case '유통기한 경과':
                imgSrc = '';
                statusText = '유통기한이 지났어요..';
                titleText = `${notification.food}`;
                break;
            case '포스팅 작성':
                imgSrc = '';
                statusText = '레시피 등록!';
                titleText = `${notification.sender}님이 새로운 레시피를 남겼어요.`;
                break;
            case '좋아요':
                imgSrc = '';
                statusText = '좋아요를 받았어요!';
                titleText = `${notification.sender}님이 좋아요를 눌렀어요.`;
                break;
            case '댓글 작성':
                imgSrc = '';
                statusText = '새 댓글이 달렸어요!';
                titleText = `${notification.sender}님이 댓글을 남겼어요.`;
                break;
            case '구독':
                imgSrc = '';
                statusText = '새로운 구독자!';
                titleText = `${notification.sender}님이 구독했어요.`;
                break;
            case '방송 시작':
                imgSrc = '';
                statusText = '방송이 시작됐어요!';
                titleText = `${notification.sender}님이 방송을 시작했어요.`;
                break;
            default:
                imgSrc = '';
                statusText = '새로운 알림이 있습니다!';
                titleText = `${notification.sender}님이 알림을 보냈습니다.`;
                break;
        }

        return (
            <div key={notification.alert_id} className="mb-6">
                <div className="flex items-center bg-white p-4 rounded-lg mb-2 shadow-sm">
                    <div className="w-10 h-10 flex items-center justify-center text-2xl mr-4">
                        <img src={imgSrc} alt='' className="w-50 h-50 object-contain" />
                    </div>
                    <div
                        className={`flex-1 ${notification.alertcheck ? "text-gray-500" : "text-black"}`}
                        onClick={() => handleMarkAsRead(notification.alert_id)}
                        style={{ cursor: "pointer" }}>
                        <div className="text-xs mb-1">
                            {statusText}
                        </div>
                        <div className="text-sm">
                            {titleText}
                        </div>
                    </div>
                    <div
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteNotification(notification.alert_id)}
                    >
                        X
                    </div>
                </div>
            </div>
        );
    };

    // 알림 데이터를 날짜별로 그룹화
    const groupedNotifications = notifications.reduce((groups, notification) => {
        const date = format(new Date(notification.alertday), 'yyyy.MM.dd');
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {});

    return (
        <div className="w-[390px] p-6 bg-gray-50">
            {Object.keys(groupedNotifications).map((date) => (
                <div key={date} className="mb-6">
                    <div className="text-sm font-bold mb-2">{date}</div>
                    {groupedNotifications[date]
                        .slice()  // 원본 배열을 변경하지 않기 위해 복사
                        .sort((a, b) => new Date(b.alertday) - new Date(a.alertday)) // 최신순으로 정렬
                        .map(renderNotificationItem)}
                </div>
            ))}
        </div>
    );

};

export default Body;

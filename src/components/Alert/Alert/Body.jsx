import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/useUserStore.js"; // useUserStore import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // 날짜 형식화를 위해 사용

const Body = () => {
    const { notifications = [], setNotifications, setHasUnread } = useUserStore();
    const navigate = useNavigate();
    const [userInfoMap, setUserInfoMap] = useState({}); // 사용자 정보를 저장할 상태
    const [refrigeratorNameMap, setRefrigeratorNameMap] = useState({}); // 냉장고 이름을 저장할 상태
    const [postingMap, setPostingMap] = useState({});

    // 알림의 sender 값을 기반으로 사용자 정보를 API로부터 가져옴
    useEffect(() => {
        const fetchUserInfos = async () => {
            const promises = notifications.map(async (notification) => {
                try {
                    const decodedSender = decodeURIComponent(notification.sender);  // 디코딩 수행
                    //console.log("notification.sender : ", notification.sender);
                    //console.log("decodedSender : ", decodedSender);
                    const response = await axios.get(
                        `https://api.icebuckwheat.kro.kr/api/login/getuser`,
                        {
                            params: {
                                //user_id: notification.sender, // notification.sender 값으로 사용자 정보를 요청
                                user_id: decodedSender, // decodedSender 값으로 사용자 정보를 요청
                            },
                        }
                    );
                    return { sender: notification.sender, userInfo: response.data };
                } catch (error) {
                    console.error(`Failed to fetch user info for sender: ${notification.sender}`, error);
                    return { sender: notification.sender, userInfo: null };
                }
            });

            const userInfoArray = await Promise.all(promises);
            const newUserInfoMap = userInfoArray.reduce((map, { sender, userInfo }) => {
                map[sender] = userInfo;
                return map;
            }, {});

            setUserInfoMap(newUserInfoMap);
        };
        if (notifications.length > 0) {
            fetchUserInfos();
        }
    }, [notifications]);

    //알림의 senderrefri 값을 기반으로 냉장고 이름을 API로부터 가져옴
    useEffect(() => {
        const fetchRefrigeratorNames = async () => {
            const promises = notifications.map(async (notification) => {
                if (!notification.senderrefri) {
                    //console.error(`Notification ${notification.alert_id} does not have senderrefri`);
                    return { senderrefri: null, refriName: null };
                }
                try {
                    //console.log("notification.senderrefri : ", notification.senderrefri);
                    const response = await axios.get(
                        `https://api.icebuckwheat.kro.kr/api/food/find/refriName`,
                        {
                            params: {
                                refrigerator_id: notification.senderrefri, // notification.senderrefri 값으로 냉장고 이름 요청
                            },
                        }
                    );
                    return { senderrefri: notification.senderrefri, refriName: response.data };
                } catch (error) {
                    console.error(`Failed to fetch refrigerator name for senderrefri: ${notification.senderrefri}`, error);
                    return { senderrefri: notification.senderrefri, refriName: null };
                }
            });

            const refrigeratorNameArray = await Promise.all(promises);
            const newRefrigeratorNameMap = refrigeratorNameArray.reduce((map, { senderrefri, refriName }) => {
                map[senderrefri] = refriName; // 냉장고 ID를 키로 하고 이름을 값으로 저장
                return map;
            }, {});
            setRefrigeratorNameMap(newRefrigeratorNameMap); // 상태 업데이트
        };
        if (notifications.length > 0) {
            fetchRefrigeratorNames();
        }
    }, [notifications]);

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

    // 날짜별 알림 모두 삭제하는 함수
    const handleDeleteAllNotificationsForDate = async (date) => {
        const notificationsForDate = groupedNotifications[date];
        const deletePromises = notificationsForDate.map((notification) =>
            axios.delete(`${import.meta.env.VITE_ALERT_IP}/delete/${notification.alert_id}`)
        );
        try {
            await Promise.all(deletePromises);
            const updatedNotifications = notifications.filter(
                (notification) => format(new Date(notification.alertday), 'yyyy.MM.dd') !== date
            );
            setNotifications(updatedNotifications);
            updateHasUnread(updatedNotifications);
        } catch (error) {
            console.error("Failed to delete notifications for the date:", error);
        }
    };

    //알림 전부 지워지면 자동 이동
    useEffect(() => {
        if (notifications.length === 0) {
            navigate("/alert/noalert");
        }
    }, [notifications, navigate]);

    const renderNotificationItem = (notification) => {
        let statusText = '';
        let titleText = '';
        const userInfo = userInfoMap[notification.sender]; // 사용자 정보 매핑
        const userName = userInfo ? userInfo.name : notification.sender; // 사용자 이름 또는 sender ID
        const imgSrc = userInfo ? userInfo.photo : "default-profile.png"; // 사용자 이미지 또는 기본 이미지
        const refriName = refrigeratorNameMap[notification.senderrefri]; // 냉장고 이름 매핑

        switch (notification.alerttype) {
            case '냉장고 생성':
                statusText = '냉장고를 생성했어요!';
                titleText = `${userName}님이 ${notification.memo}냉장고를 생성했어요.`;
                break;
            case '냉장고 수정':
                statusText = '냉장고 이름이 수정됐어요!';
                titleText = `${userName}님이 ${notification.memo}냉장고 이름을 ${refriName}로 수정했어요.`;
                break;
            case '냉장고 등록':
                statusText = '냉장고에 참가했어요!';
                titleText = `${userName}님이 ${refriName}냉장고에 참가했어요.`;
                break;
            case '냉장고 삭제':
                statusText = '냉장고가 삭제됐어요!';
                titleText = `${userName}님이 ${notification.memo}냉장고를 삭제했어요.`;
                break;
            case '구성원 삭제':
                statusText = '구성원이 나왔어요!';
                titleText = `${userName}님이 ${refriName}냉장고에서 나왔어요.`;
                break;
            case '채팅':
                statusText = '채팅을 올라왔어요!';
                titleText = `${userName}님이 채팅을 남겼어요.`;
                break;
            case '채팅 공지':
                statusText = '채팅방 공지!';
                titleText = `${userName}님이 ${refriName}냉장고에 공지를 남겼어요.`;
                break;
            case '유통기한 임박':
                statusText = 'D-' + `${notification.memo}`;
                titleText = `${notification.sender}`;
                break;
            case '포스팅 작성':
                statusText = '레시피 등록!';
                titleText = `${userName}님이 "${notification.memo}" 레시피를 작성했어요.`;
                break;
            case '좋아요':
                statusText = '좋아요를 받았어요!';
                titleText = `${userName}님이 좋아요를 눌렀어요.`;
                break;
            case '댓글 작성':
                statusText = '새 댓글이 달렸어요!';
                titleText = `${userName}님이 댓글을 남겼어요.`;
                break;
            case '구독':
                statusText = '새로운 구독자!';
                titleText = `${userName}님이 구독했어요.`;
                break;
            case '방송 시작':
                statusText = '방송이 시작됐어요!';
                titleText = `${userName}님이 방송을 시작했어요.`;
                break;
            default:
                statusText = '새로운 알림이 있습니다!';
                titleText = `${userName}님이 알림을 보냈습니다.`;
                break;
        }

        return (
            <div key={notification.alert_id} className="mb-6">
                <div className="flex items-center bg-white p-4 rounded-lg mb-2 shadow-sm">
                    <div className="w-10 h-10 flex items-center justify-center text-2xl mr-4">
                        <img src={imgSrc} alt='' className="w-50 h-50 object-contain" />{/* 프로필사진 */}
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
                        className="text-gray-500 cursor-pointer"
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

    // 날짜별로 그룹을 최신순으로 정렬
    const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="w-[390px] p-6 bg-gray-50">
            {sortedDates.map((date) => (
                <div key={date} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold">{date}</div>
                        <button
                            className="text-red-500 text-sm"
                            onClick={() => handleDeleteAllNotificationsForDate(date)}
                        >
                            알림 전체 지우기
                        </button>
                    </div>
                    {groupedNotifications[date]
                        .slice()  // 원본 배열을 변경하지 않기 위해 복사
                        .sort((a, b) => new Date(b.alertday) - new Date(a.alertday)) // 날짜 내에서 최신순으로 정렬
                        .map(renderNotificationItem)}
                </div>
            ))}
        </div>
    );
};

export default Body;

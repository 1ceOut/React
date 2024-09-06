import { create } from "zustand";
import parseJwt from "../logic/parseJwt.js";
import { devtools, persist } from "zustand/middleware";
import axios from 'axios';

// 초기 상태
const initState = {
    userName: "",
    userProfile: "",
    userId: "",
    userRole: "",
    userAccessToken: "",
    isLogin: false,
    hasUnread: false,
    notifications: [],
    sse: null,
};

// SSE 관리 훅
const createSSE = (userId, onMessage) => {
    const encodedUserId = encodeURIComponent(userId);//encode타입 변환
    const sse = new EventSource(`${import.meta.env.VITE_ALERT_IP}/subscribe/${encodedUserId}`);//이벤트 소스로 하는게 맞아

    //알림이 존재하는지 확인
    sse.onmessage = async (event) => {
        const newNotification = JSON.parse(event.data);
        const hasUnreadResponse = await axios.get(`${import.meta.env.VITE_ALERT_IP}/hasUnread/${encodedUserId}`);
        onMessage(newNotification, hasUnreadResponse.data);
    };

    sse.onerror = () => {
        console.error("SSE connection error. Reconnecting automatically...");
        // 기본적으로 브라우저가 자동으로 재연결을 시도하므로 수동 재연결 코드를 추가하지 않음
    };

    return sse;
};

const store = (set, get) => ({
    ...initState,

    setNotifications: (newNotifications) => {
        set({ notifications: newNotifications });
    },

    setHasUnread: (hasUnread) => {
        set({ hasUnread });
    },

    AddinfoSuccessStatus : () =>{
        set({userRole:"ROLE_USER"})
    },

    initialize: () => {
        const state = get();
        if (state.isLogin && state.userAccessToken) {
            const jwt = parseJwt(state.userAccessToken);
            const userId = jwt.sub;//////
            const encodedUserId = encodeURIComponent(userId);//encode타입 변환
            const sse = createSSE(encodedUserId, get().handleSSEMessage);
            set({ sse });
        }
    },

    handleSSEMessage: (newNotification, hasUnread) => {
        set((state) => ({
            hasUnread,
            notifications: [
                ...state.notifications.filter(n => n.alert_id !== newNotification.alert_id),
                newNotification
            ],
        }));
    },

    LoginSuccessStatus: async (accessToken) => {
        const jwt = parseJwt(accessToken);
        const state = get();
        const userId = jwt.sub;
        const encodedUserId = encodeURIComponent(userId);//encode타입 변환//공백제거

        // 기존 SSE 연결 해제
        if (state.sse instanceof EventSource) {
            state.sse.close();
        }

        // 새로운 SSE 구독 생성 및 알림 초기화
        const sse = createSSE(encodedUserId, get().handleSSEMessage);

        try {
            const hasUnreadResponse = await axios.get(`${import.meta.env.VITE_ALERT_IP}/hasUnread/${encodedUserId}`);
            const notificationsResponse = await axios.get(`${import.meta.env.VITE_ALERT_IP}/getNotification/${encodedUserId}`);

            set({
                isLogin: true,
                userAccessToken: accessToken,
                userName: jwt.name,
                userProfile: jwt.photo,
                userRole: jwt.role,
                userId: jwt.sub,//공백 포함 데이터
                sse,
                hasUnread: hasUnreadResponse.data,
                notifications: notificationsResponse.data,
            });
        } catch (error) {
            console.error("Failed to fetch notifications on login:", error);
            set(initState);
        }
    },

    LogoutStatus: () => {
        const sse = get().sse;
        if (sse instanceof EventSource) {
            sse.close();
        }
        set(initState);
    },
});

const useUserStore = create(
    devtools(
        persist(store, {
            name: "LoginUser",
            onRehydrateStorage: () => (state) => {
                setTimeout(() => {
                    if (state && state.isLogin && state.userAccessToken) {
                        state.initialize();
                    }
                }, 0);
            },
        })
    )
);

// 새로고침 또는 페이지 나가기 시 연결 종료
window.addEventListener('beforeunload', () => {
    const { sse } = useUserStore.getState();
    if (sse instanceof EventSource) {
        sse.close();
    }
});

export default useUserStore;

import { create } from "zustand";
import parseJwt from "../logic/parseJwt.js";
import { devtools, persist } from "zustand/middleware";

// 유저정보 전역저장소
const initState = {
    userName: "",
    userProfile: "",
    userId: "",
    userAccessToken: "",
    isLogin: false
}

const store = (set) => ({
    ...initState,
    LoginSuccessStatus: (accessToken) => {
        const jwt = parseJwt(accessToken);
        set({
            isLogin: true,
            userAccessToken: accessToken,
            userName: jwt.name,
            userProfile: jwt.photo,
            userId: jwt.sub
        });
    },
    LogoutStatus: () => set(initState)
});

// persist 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
const useUserStore = create(
    devtools(
        persist(store, {
            name: "LoginUser", // 로컬 스토리지에 저장될 키
            getStorage: () => localStorage, // 사용할 스토리지
        })
    )
);

export default useUserStore;
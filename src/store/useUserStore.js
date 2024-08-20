import {create} from "zustand";
import parseJwt from "../logic/parseJwt.js";
import {devtools} from "zustand/middleware";


//유저정보 전역저장소
const initState = {
    userName : "",
    userProfile:"",
    userId:"",
    userAccessToken:"",
    isLogin: false
}

const store = (set) => ({
    ...initState,
    LoginSuccessStatus: (accessToken) => {
        const jwt = parseJwt(accessToken);
        set({isLogin: true,userAccessToken: accessToken,userName:jwt.name,userProfile:jwt.photo,userId:jwt.sub});
    },
    LogoutStatus: () => set(initState)
})

const useUserStore = create(devtools(store,{name:"UserStore"}))

export default useUserStore;
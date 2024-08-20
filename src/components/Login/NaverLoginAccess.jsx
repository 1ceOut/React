import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Naver_GetAccessToken} from "../../query/LoginQuery.jsx";
import {CircularProgress} from "@mui/joy";
import LoadingBar from "./LoadingBar.jsx";
import useUserStore from "../../store/useUserStore.js";

const NaverLoginAccess = () => {
    const code = new URLSearchParams(useLocation().search).get("code");
    const state = import.meta.env.VITE_NAVER_STATE;

    const navigate = useNavigate();
    const {LoginSuccessStatus} = useUserStore();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", code, state], // Include code and param in the query key for caching
        queryFn: () => Naver_GetAccessToken(code, state), // Call get_jwt with the parameters
        enabled: !!code && !!state, // Only run the query if code and param are truthy
        retry: false,
        refetchOnWindowFocus : false,
    });


    useEffect(() => {
        if (isLoading) {
            return <LoadingBar/>; // Do nothing while loading
        }

        if (isError) {
            navigate("/login"); // Navigate to login on error
        } else if (data && data.accessToken) {
            LoginSuccessStatus(data.accessToken);
            //localStorage.setItem('accessToken', data.accessToken); // 로컬 스토리지에 저장
            navigate("/"); // Navigate to the home page after storing the token
        }
    }, [isLoading, isError, data, navigate, LoginSuccessStatus]); // Dependencies for useEffect

    if (isLoading) {
        return <LoadingBar/> // Show loading state
    }

    return null; // Fallback return
};

export default NaverLoginAccess;

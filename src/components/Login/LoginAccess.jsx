import React, {useEffect} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {get_jwt} from "../../query/LoginQuery.jsx";

const LoginAccess = () => {
    const param = useParams(); //kakao,naver,google
    const code = new URLSearchParams(useLocation().search).get("code"); //return code 값

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", code, param], // Include code and param in the query key for caching
        queryFn: () => get_jwt(param, code), // Call get_jwt with the parameters
        enabled: !!code && !!param, // Only run the query if code and param are truthy
        retry: false,
        refetchOnWindowFocus : false,
    });


    useEffect(() => {
        if (isLoading) {
            return; // Do nothing while loading
        }

        if (isError) {
            navigate("/login"); // Navigate to login on error
        } else if (data && data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken); // Store the token in local storage
            navigate("/"); // Navigate to the home page after storing the token
        }
    }, [isLoading, isError, data, navigate]); // Dependencies for useEffect

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    return null; // Fallback return

    return null;
};

export default LoginAccess;

import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Google_GetAccessToken} from "../../query/LoginQuery.jsx";
import LoadingBar from "./LoadingBar.jsx";

const GoogleLoginAccess = () => {
    const code = new URLSearchParams(useLocation().search).get("code");
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", code], // Include code and param in the query key for caching
        queryFn: () => Google_GetAccessToken(code), // Call get_jwt with the parameters
        enabled: !!code, // Only run the query if code and param are truthy
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
        return <LoadingBar/> // Show loading state
    }

    return null; // Fallback return
};

export default GoogleLoginAccess;

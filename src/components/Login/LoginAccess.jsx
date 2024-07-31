import React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {get_jwt} from "../../query/LoginQuery.jsx";

const LoginAccess = () => {
    const param = useParams(); //kakao,naver,google
    const code = new URLSearchParams(useLocation().search).get("code"); //return code 값

    const {data,isLoading,isError,} = useQuery({
        queryKey: ["user"],
        queryFn:()=> get_jwt(code,param)
    });

    if (isLoading){
        return <div>Loading...</div>;
    }

    if (isError){
        return <div>Error</div>;
    }

    return (
        <div>
            {
                data
            }
        </div>
    );
};

export default LoginAccess;

import {useQuery} from "@tanstack/react-query";
import KakaoLogin from "react-kakao-login";
import {useEffect} from "react";

const SocialLoginButton  = () => {
    const socialButtons = [
        {src : "/assets/naver-svg.png",source:"http://localhost:8080/oauth2/authorization/naver"},
        {src : "/assets/kakao-svg.png" , source: "http://223.130.138.135/oauth2/authorization/kakao"},
        {src : "/assets/google-svg.png" , source: "http://223.130.138.135/oauth2/authorization/google"}
          ];

    const RestApiKey = import.meta.env.VITE_REST_API_KEY;
    const KakaoRedirect = import.meta.env.VITE_REDIRECT_URL;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${KakaoRedirect}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return (
        <div className='flex gap-5 justify-between mt-8'>
            {
                socialButtons.map((button,idx) => (
                    <button key={idx} className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full" onClick={handleLogin}>
                    <img loading="lazy" src={button.src} alt={button.alt} className="shrink-0 aspect-square w-[50px]"/>
                    </button>
                ))
            }
        </div>
    );
};

export default SocialLoginButton;
import {useQuery} from "@tanstack/react-query";
import KakaoLogin from "react-kakao-login";
import {useEffect} from "react";

const SocialLoginButton  = () => {
    const socialButtons = [
        {src : "/assets/naver-svg.png"},
        {src : "/assets/kakao-svg.png"},
        {src : "/assets/google-svg.png"}
          ];

    const KakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KakaoRedirect = import.meta.env.VITE_KAKAO_REDIRECT_URL;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApiKey}&redirect_uri=${KakaoRedirect}&response_type=code`

    const NaverRestApiKey = import.meta.env.VITE_NAVER_REST_API_KEY;
    const NaverRedirect = import.meta.env.VITE_NAVER_REDIRECT_URL;
    const NaverState = import.meta.env.VITE_NAVER_STATE;
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverRestApiKey}&redirect_uri=${NaverRedirect}&state=${NaverState}`

    const GoogleRestApiKey = import.meta.env.VITE_GOOGLE_REST_API_KEY;
    const GoogleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GoogleRestApiKey}&redirect_uri=${GoogleRedirect}&response_type=code&scope=openid email profile&state=${NaverState}`

    const handleLogin = (url)=>{
        window.location.href = url
    }
    return (
        <div className='flex gap-5 justify-between mt-8'>
            <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    onClick={()=>handleLogin(naverURL)}>
                <img loading="lazy" src={socialButtons[0].src} alt={socialButtons[0].alt}
                     className="shrink-0 aspect-square w-[50px]"/>
            </button>
            <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    onClick={()=>handleLogin(kakaoURL)}>
                <img loading="lazy" src={socialButtons[1].src} alt={socialButtons[1].alt}
                     className="shrink-0 aspect-square w-[50px]"/>
            </button>
            <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    onClick={()=>handleLogin(googleURL)}>
                <img loading="lazy" src={socialButtons[2].src} alt={socialButtons[2].alt}
                     className="shrink-0 aspect-square w-[50px]"/>
            </button>
        </div>
    );
};

export default SocialLoginButton;
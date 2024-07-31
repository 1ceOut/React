import axios from "axios";

const kakao_key = import.meta.env.VITE_API_KEY;
const kakao_redirect = import.meta.env.VITE_REDIRECT_URL;

const kakao_loin = async () => await axios.get(`https://kauth.kakao.com/oauth/authorize?client_id=${kakao_key}&redirect_uri=${kakao_redirect}&response_type=code`).then(res => res.data);

const get_jwt = async (provider,accesstoken) => await axios.get(`/api/login/${provider}`,{
    params : {
        accesstoken : accesstoken
    }
}.then((res) => res.data));

export {kakao_loin,get_jwt};


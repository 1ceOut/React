import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {Auto_Login} from "../../query/LoginQuery.jsx";
import useUserStore from "../../store/useUserStore.js";

const MenuNavigate = ({PageTitle}) => {
    const navigate = useNavigate();
    const {isLogin, userProfile, LoginSuccessStatus} = useUserStore();

    //홈화면 이동
    const homeNavigation = () => {
        navigate("/");
    }

    //채팅으로 이동
    const chatNavigation = () => {
        navigate("/mypage/profile");
    }

    //알림 페이지로 이동
    const alertNavigation = () => {
        navigate("/alert/noalert");
    }

    const profileNavigation = () => {
        navigate("/mypage/profile");
    }

    //첫 로그인 시도 시(쿠키에 저장된 값을 기반으로 자동로그인 기능)
    const AutoLogin = () => {
        Auto_Login().then((response) => {
            if (response.status === 200) {
                LoginSuccessStatus(response.data.accessToken);
            } else {
                navigate("/login")
            }
        })
    }

    return (
        <div className="relative self-stretch flex items-center justify-between w-[342px] h-14">
            <div className="absolute cursor-pointer left-0 flex justify-center items-center text-[#777C89] font-bold"
                 onClick={homeNavigation}>
                <img src="/assets/logo.png" alt="logo"
                     className='w-6 h-6 m-[6px]'/>
                냉모밀
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                {PageTitle!==undefined||PageTitle !== ""? PageTitle : ""}
            </div>
            <div className="absolute right-0 flex flex-row">
                <div className="pr-4">
                    <img src="/assets/chat.png" alt="chat" onClick={chatNavigation}
                         className='cursor-pointer'/>
                </div>
                <div className="pr-4">
                    <img src="/assets/alert.png" alt="alert" onClick={alertNavigation}
                         className='cursor-pointer'/>
                </div>
                <div>
                    {
                        isLogin?(<img src={userProfile} alt="profile" onClick={profileNavigation}
                                      className='cursor-pointer shrink-0 w-6 aspect-[1.04] rounded-lg' />):
                            (<img src="/assets/profile.png" alt="profile" onClick={AutoLogin}
                                  className='cursor-pointer shrink-0 w-6 aspect-[1.04]'/>)
                    }
                </div>
            </div>
        </div>
    );
};

MenuNavigate.propTypes = {
    PageTitle: PropTypes.string.isRequired,
};

export default MenuNavigate;
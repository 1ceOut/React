import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useUserStore from "./../../store/useUserStore";
import { Auto_Login } from "../../query/LoginQuery";

const MenuNavigate = ({ option, previousPage }) => {
  const { isLogin, userProfile, LoginSuccessStatus, hasUnread, notifications } = useUserStore();

  const AutoLogin = () => {
    Auto_Login().then((response) => {
      if (response.status === 200) {
        LoginSuccessStatus(response.data.accessToken);
      } else {
        navigate("/login");
      }
    });
  };

  const navigate = useNavigate();

  const chatNavigation = () => {
    navigate("/Talk/TalkList");
  };

  const alertNavigation = () => {
    if (notifications.length > 0) {
      navigate("/alert/alert");
    } else {
      navigate("/alert/noalert");
    }
  };

  const profileNavigation = () => {
    navigate("/mypage/profile");
  };

  const goBack = () => {
    if (previousPage === "/") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative self-stretch flex items-center justify-between w-[342px] h-14 mt-[50px]">
      <div className="absolute left-0 w-6 h-6 cursor-pointer" onClick={goBack}>
        {"<"}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {option}
      </div>
      <div className="absolute right-0 flex flex-row">
        <div className="pr-4">
          <img
            src="/assets/chat.png"
            alt="chat"
            onClick={chatNavigation}
            className="cursor-pointer"
          />
        </div>
        <div className="pr-4">
          <img
            src={hasUnread ? "/assets/alert2.png" : "/assets/alert.png"} 
            alt="alert"
            onClick={alertNavigation}
            className="cursor-pointer"
          />
        </div>
        <div>
          {isLogin ? (
            <img
              src={userProfile}
              alt="profile"
              onClick={profileNavigation}
              className="cursor-pointer shrink-0 w-6 h-6 aspect-[1.04] rounded-full"
            />
          ) : (
            <img
              src="/assets/profile.png"
              alt="profile"
              onClick={AutoLogin}
              className="cursor-pointer shrink-0 w-6 aspect-[1.04]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

MenuNavigate.propTypes = {
  option: PropTypes.string.isRequired,
  previousPage: PropTypes.string.isRequired,
};

export default MenuNavigate;

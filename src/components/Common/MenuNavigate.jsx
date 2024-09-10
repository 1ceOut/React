import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useUserStore from "./../../store/useUserStore";
import { Auto_Login } from "../../query/LoginQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IoChatbubbleSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

const MenuNavigate = ({ option, previousPage }) => {
  const { isLogin, userProfile, LoginSuccessStatus, hasUnread, notifications } =
    useUserStore();

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
    if (!isLogin) {
      navigate("/login");
    } else navigate("/Talk/TalkList");
  };

  const alertNavigation = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      if (notifications.length > 0) {
        navigate("/alert/alert");
      } else {
        navigate("/alert/noalert");
      }
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
    <div className="relative self-stretch flex items-center justify-between w-[342px] h-14 mt-[30px]">
      <div className="absolute left-0 w-6 h-6 cursor-pointer" onClick={goBack}>
        <ArrowBackIcon />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {option}
      </div>
      <div className="absolute right-0 flex flex-row">
        <div className="pr-4 flex justify-center items-center">
          <IoChatbubbleSharp
            className="w-5 h-5"
            color="grey"
            onClick={chatNavigation}
          />
        </div>
        <div className="pr-4 flex justify-center items-center">
          <IoNotifications
            className="w-5 h-5"
            color={hasUnread ? "#F2DC00" : "grey"}
            onClick={alertNavigation}
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

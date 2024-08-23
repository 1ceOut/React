import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MenuNavigate = ({ option }) => {
    const navigate=useNavigate();

    const chatNavigation = () => {
      navigate("/Talk/TalkList");
  }
  
    const alertNavigation = () => {
        navigate("/alert/noalert");
    }

    const profileNavigation = () => {
        navigate("/mypage/profile");
    }

    const goBack = () => {
      navigate(-1);
  }

    return (
    <div className="relative self-stretch flex items-center justify-between w-[342px] h-14 mt-[50px]">
      <div className="absolute left-0 w-6 h-6 cursor-pointer" onClick={goBack}>
        {'<'}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {option}
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
          <img src="/assets/profile.png" alt="profile" onClick={profileNavigation}
          className='cursor-pointer'/>
        </div>
      </div>
    </div>
  );
};

MenuNavigate.propTypes = {
  option: PropTypes.string.isRequired,
  alertPath : PropTypes.string.isRequired,
  profilePath : PropTypes.string.isRequired,
};

export default MenuNavigate;
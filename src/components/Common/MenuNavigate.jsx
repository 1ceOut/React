import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MenuNavigate = ({ option, alertPath, profilePath }) => {
    const navigate =useNavigate();
  
    const alertNavigation = () => {
        navigate(alertPath);
    }

    const profileNavigation = () => {
        navigate(profilePath);
    }

    return (
    <div className="relative self-stretch flex items-center justify-between w-[342px] h-14">
      <div className="absolute left-0">
        {'<'}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {option}
      </div>
      <div className="absolute right-0 flex flex-row">
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
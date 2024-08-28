import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const MenuNavigate = ({ userName, userProfile, writeDay }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="self-stretch flex items-center justify-between w-[342px] h-14 mt-[50px]">
      <div className="flex justify-center items-center">
        <div
          className="w-6 h-6 cursor-pointer flex justify-center items-center"
          onClick={goBack}
        >
          {"<"}
        </div>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img src={userProfile} alt="유저 사진" />
          </div>
          <div className="flex flex-col">
            <div>{userName}</div>
            <div>{writeDay}</div>
          </div>
        </div>
      </div>
      <div className="w-6 h-6 cursor-pointer">...</div>
    </div>
  );
};

MenuNavigate.propTypes = {
  userName: PropTypes.string.isRequired,
  userProfile: PropTypes.string.isRequired,
  writeDay: PropTypes.string.isRequired,
};

export default MenuNavigate;

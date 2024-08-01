import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NextButton = ({ isEnabled, nextPath }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isEnabled) {
      navigate(nextPath);
    }
  };

  return (
    <div
      className={`flex text-[#868686] rounded-[12px] self-stretch justify-center items-center w-[342px] h-14 mt-60 cursor-pointer ${
        isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
      }`}
      onClick={isEnabled ? handleSubmit : null}
    >
      다음
    </div>
  );
};

NextButton.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  nextPath: PropTypes.string.isRequired,
};

export default NextButton;
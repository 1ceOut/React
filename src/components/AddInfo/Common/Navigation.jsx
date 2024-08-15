import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ currentStep, nextPath }) => {
  const navigate = useNavigate();
  
  const nextPage = () => {
    navigate(nextPath);
  };

  return (
    <section className="self-stretch flex items-center justify-between w-[342px] h-14">
      <div className="text-[#767676] text-sm font-medium cursor-pointer" onClick={nextPage}>
        건너뛰기
      </div>
      <div className="flex">
        <div className="text-sm font-semibold">{currentStep}</div>
        <div className="text-[#767676] text-sm font-semibold">/3</div>
      </div>
    </section>
  );
};

Navigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextPath: PropTypes.string.isRequired,
};

export default Navigation;
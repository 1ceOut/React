import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DetailButton = ({ foodCategory, expireDate, option }) => {
  const navigate = useNavigate();

  const calculateRemainingDays = (expireDate) => {
    const today = new Date();
    const expirationDate = new Date(expireDate);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; 
  };

  const remainingDays = calculateRemainingDays(expireDate);
  
  const getTextColor = (remainingDays) => {
    if (remainingDays <= 0) {
      return 'text-red-500';
    } else if (remainingDays <= 10) {
      return 'text-yellow-500';
    } else if (remainingDays <= 20) {
      return 'text-orange-500';
    } else {
      return 'text-green-500';
    }
  };

  const getCategoryImage = (foodCategory) => {
    switch(foodCategory) {
      case 'meat':
        return '/assets/meet.png';
      case 'chicken':
        return '/assets/chicken.png';
      case 'cheese':
        return '/assets/cheese.png';
        case 'milkcow':
        return '/assets/milkcow.png';
        case 'groundmeat':
          return '/assets/groundmeat.png';
      default:
        return '/assets/meet.png';
    }
  };

  const handleNavigation = () => {
    navigate('/addinfo/habit');
  };

  return (
    <div className="self-stretch w-[342px] h-[60px] flex items-center justify-between cursor-pointer" onClick={handleNavigation}>
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-3 w-10 h-10 rounded-lg bg-[#F5F5F5]">
            <img src={getCategoryImage(foodCategory)} alt={foodCategory} className="w-[28px] h-[28px]"/>
        </div>
        <div className="flex flex-col">
          <div className={`text-[13px] ${getTextColor(remainingDays)}`}>{`${remainingDays>=0?"D":"D+"}${remainingDays}`}</div>
          <div className="w-[250px] text-[15px] text-[#333D4B] truncate">{option}</div>
        </div>
      </div>
      <div className="text-xl">{'>'}</div>
    </div>
  );
};

DetailButton.propTypes = {
  foodCategory: PropTypes.string.isRequired,
  expireDate: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
};

export default DetailButton;
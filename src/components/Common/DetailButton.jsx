import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCategoryImage } from '../../components/Refrigerator/FridgeManage/CategoryImage.jsx'; // 임포트

const DetailButton = ({
                        id,
                        expiryDate,
                        option,
                        count,
                        productType,
                        createdDate,
                        lcategory,
                        scategory
                      }) => {
  const navigate = useNavigate();

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expirationDate = new Date(expiryDate);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
// 유통기한에 따른 색상 결정 함수
    const getExpiryColor = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (daysLeft <= 1) {
            return 'text-red-500'; // 1일 이하일 경우 빨간색
        } else if (daysLeft <= 3) {
            return 'text-green-500'; // 3일 이하일 경우 연두색
        } else {
            return 'text-blue-500'; // 그 이상일 경우 파란색
        }
    };
  const remainingDays = calculateRemainingDays(expiryDate);

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

  const handleNavigation = () => {
    navigate('/Refrigerator/food/FoodDetail', {
      state: {
        id,
        expiryDate,
        option,
        count,
        productType,
        createdDate,
        lcategory,
        scategory
      }
    });
  };

  return (
      <div className="self-stretch w-[342px] h-[60px] flex items-center justify-between cursor-pointer" onClick={handleNavigation}>
        <div className="flex items-center">
          <div className="flex items-center justify-center mr-3 w-10 h-10 rounded-lg bg-[#F5F5F5]">
            <img src={getCategoryImage(lcategory)} alt={lcategory} className="w-[28px] h-[28px]"/>
          </div>
          <div className="flex flex-col">
            <div className={`text-[13px] ${getExpiryColor(expiryDate)}`}>
              {`${remainingDays >= 0 ? "D-" : "D+"}${Math.abs(remainingDays)}`}
            </div>
            <div className="w-[250px] text-[15px] text-[#333D4B] truncate">{option}</div>
          </div>
        </div>
        <div className="text-xl mr-8">{'>'}</div>
      </div>
  );
};

DetailButton.propTypes = {
  id: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  productType: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  lcategory: PropTypes.string.isRequired,
  scategory: PropTypes.string.isRequired,
};

export default DetailButton;

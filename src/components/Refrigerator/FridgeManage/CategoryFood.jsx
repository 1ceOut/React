import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CategoryFood = ({option}) => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/Refrigerator/food/FoodList');
      };
    return (
        <div className="self-stretch flex items-center justify-between w-[342px]">
             <div className="text-xl">
                {option}
             </div>
             <div
                className="text-sm text-[#767676]"
                style={{ borderBottom: '1px solid #767676', cursor: 'pointer' }}
                onClick={handleNavigation}
            >
                전체보기
            </div>
        </div>
    );
};

CategoryFood.propTypes = {
    option: PropTypes.string.isRequired
  };

export default CategoryFood;
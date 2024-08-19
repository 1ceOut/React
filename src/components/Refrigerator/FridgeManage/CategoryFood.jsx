import PropTypes from 'prop-types';

const CategoryFood = ({option}) => {
    return (
        <div className="self-stretch flex items-center justify-between w-[342px]">
             <div className="text-xl">
                {option}
             </div>
             <div className="text-sm text-[#767676]">
                전체보기
             </div>
        </div>
    );
};

CategoryFood.propTypes = {
    option: PropTypes.string.isRequired
  };

export default CategoryFood;
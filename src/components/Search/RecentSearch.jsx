import PropTypes from 'prop-types';
import useSearchStore from '../../store/useSearchStore.js';
import { useNavigate } from 'react-router-dom';

const RecentSearch = ({ id, count, createdDate, expiryDate, lcategory, option, productType, refrigeratorName, scategory, barcode }) => {
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const removeSearch = useSearchStore((state) => state.removeSearch);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Refrigerator/food/FoodDetail`, {
      state: { id, count, createdDate, expiryDate, lcategory, option, productType, refrigeratorName, scategory, barcode }
    });
  };

  return (
    <div
      className="w-full max-w-[342px] p-4 mt-6 bg-white shadow rounded-md cursor-pointer"
      onClick={handleClick}
    >
      {refrigeratorName && (
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium text-gray-700">냉장고 이름:</span> {refrigeratorName}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800 mb-2">
          <span className="font-medium text-gray-700">식품명:</span> {option}
        </div>
        {count !== undefined && (
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">수량:</span> {count}
          </div>
        )}
      </div>
    </div>
  );
};

RecentSearch.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number,
  createdDate: PropTypes.string,
  expiryDate: PropTypes.string,
  lcategory: PropTypes.string,
  option: PropTypes.string,
  productType: PropTypes.string,
  refrigeratorName: PropTypes.string,
  scategory: PropTypes.string,
  barcode: PropTypes.string
};

export default RecentSearch;

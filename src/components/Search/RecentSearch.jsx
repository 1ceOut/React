import PropTypes from 'prop-types';
import useSearchStore from '../../store/useSearchStore.js';

const RecentSearch = ({ productName, refrigeratorName, count }) => {
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const removeSearch = useSearchStore((state) => state.removeSearch);

  return (
    <div className="w-full max-w-[342px] p-4 mt-6 bg-white shadow rounded-md">
      {refrigeratorName && (
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium text-gray-700">냉장고 이름:</span> {refrigeratorName}
        </div>
      )}
      <div className='flex justify-between items-center'>
      <div className="text-lg font-semibold text-gray-800 mb-2">
        <span className="font-medium text-gray-700">식품명:</span> {productName}
      </div>
      {count !== undefined && (
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700 ">수량:</span> {count}
        </div>
      )}
      </div>
    </div>
  );
};

RecentSearch.propTypes = {
  productName: PropTypes.string.isRequired,
  refrigeratorName: PropTypes.string, // Optional prop
  count: PropTypes.number, // Optional prop
};

export default RecentSearch;

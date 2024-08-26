
import useSearchStore from '../../store/useSearchStore.js';

const RecentSearch = () => {
    const recentSearches = useSearchStore((state) => state.recentSearches);
    const removeSearch = useSearchStore((state) => state.removeSearch);

    return (
        <div className="self-stretch mt-[30px] w-[342px]">
            <div className="mb-4 text-[16px] text-[#767676] font-medium">
                최근 검색어
            </div>
            {recentSearches.map((search, index) => (
                <div key={index} className="flex justify-between items-center mb-[10px]">
                    <div className="text-[16px] font-semibold">
                        {search}
                    </div>
                    <img 
                        src="/assets/cancle2.png" 
                        alt="취소" 
                        onClick={() => removeSearch(search)} 
                        className="cursor-pointer"
                    />
                </div>
            ))}
        </div>
    );
};

export default RecentSearch;
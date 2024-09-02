import create from 'zustand';

const useSearchStore2 = create((set) => ({
    recentSearches: [], // 최근 검색어 목록 초기화
    addSearch: (search) => set((state) => ({
        recentSearches: [...state.recentSearches, search]
    })),
    removeSearch: (searchToRemove) => set((state) => ({
        recentSearches: state.recentSearches.filter(search => search !== searchToRemove)
    })),
}));

export default useSearchStore2;

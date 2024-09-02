import create from 'zustand';

const useSearchStore = create((set) => ({
    recentSearches: [],
    foodData: [], // 검색 결과를 저장할 상태
    addSearch: (searchTerm) => set((state) => ({
        recentSearches: [...state.recentSearches, searchTerm]
    })),
    removeSearch: (searchTerm) => set((state) => ({
        recentSearches: state.recentSearches.filter(term => term !== searchTerm)
    })),
    setFoodData: (data) => set(() => ({
        foodData: data
    })),
    getFoodData: () => set((state) => state.foodData) // 검색 결과를 가져오는 액션
}));

export default useSearchStore;

import { create } from 'zustand';

const useSearchStore = create((set) => ({
    recentSearches: [],
    addSearch: (search) => set((state) => {
        if (!state.recentSearches.includes(search)) {
            return { recentSearches: [search, ...state.recentSearches] };
        }
        return state;
    }),
    removeSearch: (search) => set((state) => ({
        recentSearches: state.recentSearches.filter(item => item !== search)
    })),
}));

export default useSearchStore;
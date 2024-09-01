import {create} from "zustand";
import {devtools} from "zustand/middleware";

const initState = {
    habit: "",
    favorite: "",
    height:0,
    weight:0,
}

const store = (set) => ({
    ...initState,
    setHabit: (habit) => set({habit:habit}),
    setFavorite: (favorite) => set({favorite:favorite}),
    setHeight: (height) => set({height}),
    setWeight: (weight) => set({weight}),
    initStore: () => set(initState)
});

// persist 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
const useAddinfoStore = create(
    devtools(store)
);

export default useAddinfoStore;
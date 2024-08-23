// stores/useFeedStore.js
import create from 'zustand';
import axios from 'axios';

const useFeedStore = create((set) => ({
    list: [],
    error: null,

    // 게시물 목록 가져오기
    fetchPostingList: async () => {
        try {
            const res = await axios.get("/posting/list");
            set({ list: res.data, error: null });
        } catch (err) {
            console.error("Error fetching posting list:", err);
            set({ error: "Error fetching posting list" });
        }
    },

    // 게시물 등록
    addPosting: async (data) => {
        try {
            await axios.post("/posting/insert", data);
            // 게시물 목록 업데이트
            set((state) => ({ ...state, error: null }));
            // 추가 후 목록 다시 불러오기
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            console.error("Error adding posting:", err);
            set({ error: "Error adding posting" });
        }
    },

    // 게시물 삭제
    deletePosting: async (postingId) => {
        try {
            await axios.delete(`/posting/delete?postingId=${postingId}`);
            set((state) => ({ ...state, error: null }));
            // 삭제 후 목록 다시 불러오기
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            console.error("Error deleting posting:", err);
            set({ error: "Error deleting posting" });
        }
    },

    // 게시물 수정
    updatePosting: async (postingId, data) => {
        try {
            await axios.put(`/posting/update/${postingId}`, data);
            set((state) => ({ ...state, error: null }));
            // 수정 후 목록 다시 불러오기
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            console.error("Error updating posting:", err);
            set({ error: "Error updating posting" });
        }
    },
}));

export default useFeedStore;

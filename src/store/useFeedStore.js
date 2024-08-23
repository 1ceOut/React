import create from 'zustand';
import axios from 'axios';

const useFeedStore = create((set) => ({
    list: [],
    error: null,

    fetchPostingList: async () => {
        try {
            const res = await axios.get("/api/posting/list");
            set({ list: res.data, error: null });
        } catch (err) {
                        set({ error: "Error fetching posting list" });
        }
    },

    addPosting: async (data) => {
        try {
            await axios.post("http://localhost:17017/api/posting/insert", data);
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            set({ error: "Error adding posting" });
        }
    },

    deletePosting: async (postingId) => {
        try {
            await axios.delete(`/api/posting/delete?postingId=${postingId}`);
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            set({ error: "Error deleting posting" });
        }
    },

    updatePosting: async (postingId, data) => {
        try {
            await axios.put(`/api/posting/update/${postingId}`, data);
            useFeedStore.getState().fetchPostingList();
        } catch (err) {
            set({ error: "Error updating posting" });
        }
    },
}));

export default useFeedStore;  

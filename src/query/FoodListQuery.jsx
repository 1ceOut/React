import axios from "axios";

const API_URL = import.meta.env.VITE_API_REFRI;


export const fetchSavedBarcodes = async (selectedFridge) => {
    try {
        // 쿼리 파라미터에 selectedFridge를 올바르게 포함시키는지 확인
        const response = await axios.get(`${API_URL}/api/food/list`, {
            params: {
                refrigeratorName: selectedFridge
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching saved barcodes', error);
    }
};




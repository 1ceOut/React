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
export const listFromLcategory = async (selectedFridge, category) => {
    try {
        const response = await axios.get(`${API_URL}/api/food/list/category`,{
            params : {
                refrigeratorName: selectedFridge,
                lcategory : category
            }
        });
        console.log(response.data);
        return response.data;
    }catch (e) {
        console.log("리스트 에러임",e);
    }

}

export const foodDelete = async (productName, id) => {
    console.log("ㅂㅂㅂㅂㅂㅂㅂ",productName);
    try {
        const response = await axios.delete(`${API_URL}/api/food/barcodes/${encodeURIComponent(productName)}/${id}`,{
            // withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('error', error);
    }
};

export const updateCountByname = async (productName, id, count) => {
    console.log('Sending request with:', productName, id, count);
    try {
        const response = await axios.post(`${API_URL}/api/food/barcodes/update/${encodeURIComponent(productName)}/${id}/${count}`);
        return response.data;
    } catch (error) {
        console.error('Request failed with error:', error.response ? error.response.data : error.message);
        throw error;
    }
};




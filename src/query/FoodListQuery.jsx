import axios from "axios";

const API_URL = import.meta.env.VITE_API_REFRI;


export const fetchSavedBarcodes = async (selectedFridge) => {
    try {
        // 쿼리 파라미터에 selectedFridge를 올바르게 포함시키는지 확인
        const response = await axios.get(`${API_URL}/api/food/list`, {

            params: {
                refrigeratorName: selectedFridge
            },
            withCredentials: true // 옵션으로 설정
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
            },
            withCredentials: true // 옵션으로 설정
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

export const addFridge = async (product) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/food/refri/insert`,
            product
        );
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("Error adding fridge:", error);
        throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
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

export const uploadFile = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/upload/barcode`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // 서버 응답 데이터 반환
    } catch (error) {
        console.error("File upload failed:", error.response ? error.response.data : error.message);
        throw error; // 오류를 호출한 쪽으로 전달
    }
};

export const SearchAllFood = async (userid, productName) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/keyword/all/search`, null, {
            params: {
                userid,
                productName,
            },
            withCredentials: true,
        });
        console.log('SearchAllFood response:', response.data);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching all food data', error);
        return [];
    }
};





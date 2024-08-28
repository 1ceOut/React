import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_REFRI;
const API_KEY = import.meta.env.VITE_API_FOODAPI_KEY;

// API 호출 함수
const fetchFridgeOptions = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/refri/user/refrilist`, { userId });
        console.log('Fetched data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching fridge options:', error);
        throw error;
    }
};

// React Query 훅
const useFridgeOptions = (userId) => {
    return useQuery({
        queryKey: ['fridgeOptions', userId],
        queryFn: () => fetchFridgeOptions(userId),
        enabled: !!userId, // userId가 있을 때만 호출
    });
};
export default useFridgeOptions;




export const saveBarcode = async (product, onSuccess) => {
    try {
        const response = await axios.post('http://localhost:9000/api/food/barcodes', product);
        if (response.data.exists) {
            alert('중복된 바코드가 이미 존재합니다.');
        } else {
            alert(`${product.productName}이 성공적으로 저장되었습니다.`);
            if (onSuccess) onSuccess();
        }
    } catch (error) {
        console.error('DB에 제품을 저장하는 중 오류 발생', error);
    }
};



// 이미지 URL을 사용하는 OCR 인식 요청 함수
export const recognizeTextWithUrl = async (imageUrl) => {
    const ocrRequest = {
        images: [
            {
                format: 'png',
                name: 'barcodereader',
                url: imageUrl // 전체 이미지 URL
            }
        ],
        requestId: 'string',
        version: 'V2',
        timestamp: Date.now(),
    };

    try {
        const response = await axios.post(`${API_URL}/api/food/ocr`, ocrRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error recognizing text:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const FOOD_SAFETY_API_URL = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5/`;

export const fetchFoodSafetyInfo = async (barcode) => {
    const apiUrl = `${FOOD_SAFETY_API_URL}BAR_CD=${barcode}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching food safety info:", error);
        throw error;
    }
};

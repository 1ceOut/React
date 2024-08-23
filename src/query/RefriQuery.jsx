// useFridgeOptions 훅을 정의한 파일 (RefriQuery.jsx)
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// API 호출 함수
const fetchFridgeOptions = async (userId) => {
    try {
        const response = await axios.post('http://localhost:9000/api/refri/user/refrilist', { userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching fridge options:', error);
        throw error;
    }
};

// react-query 훅
const useFridgeOptions = (userId) => {
    return useQuery({
        queryKey: ['fridgeOptions', userId],
        queryFn: () => fetchFridgeOptions(userId),
        enabled: !!userId, // userId가 있을 때만 호출
    });
};

export default useFridgeOptions;

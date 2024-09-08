import axios from "axios";

const server_ip = import.meta.env.VITE_SHOP_API;

const BestShoppingList = async () => {
    try {
        const response = await axios.get(`${server_ip}/api/shop/list`, {
            withCredentials: true,
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('쇼핑 리스트 불러오기 오류', error);
        throw error; // Rethrow the error for useQuery to handle
    }
};

const ShoppingHeader = async () => {
    try {
        const response = await axios.get(`${server_ip}/api/shop/header`, {
            withCredentials: true,
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('쇼핑몰 헤더 불러오기 오휴', error);
        throw error; // Rethrow the error for useQuery to handle
    }
}

export const fetchUserRecommendations = async (userId) => {
    const response = await fetch(`/api/recommendations/${userId}`);
    if (!response.ok) {
        throw new Error("추천 목록을 불러오는 중 오류가 발생했습니다.");
    }
    return response.json();  // 추천된 postingId 리스트를 반환
};

export {BestShoppingList,ShoppingHeader}
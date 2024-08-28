import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API URL 설정
const API_URL = import.meta.env.VITE_FOOD_IP || 'http://localhost:17017';

// 이미지 업로드
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('thumbnail', file);
    const response = await axios.post(`${API_URL}/posting/upload`, formData, {
        withCredentials: true,
    });
    return response.data.postingphoto; // 서버에서 반환하는 이미지 URL
};

// 게시물 추가
const addPosting = async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}/posting/insert`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("게시물 추가 실패:", error);
        throw error;
    }
};

// 게시물 삭제
const deletePosting = async (postingId) => {
    await axios.delete(`${API_URL}/posting/delete`, {
        params: { postingId },
        withCredentials: true,
    });
};

// 게시물 수정
const updatePosting = async (postingId, data) => {
    const response = await axios.put(`${API_URL}/posting/update/${postingId}`, data, {
        withCredentials: true,
    });
    return response.data;
};

// React Query 훅들
export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/posting/listWithUser`, {
                withCredentials: true,
            });
            return response.data;
        },
    });
};

export const useDetailPost = (postingId) => {
    return useQuery({
        queryKey: ['postDetail', postingId],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/posting/detail`, {
                params: { postingId },
                withCredentials: true,
            });
            return response.data;
        },
        enabled: !!postingId,
    });
};

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addPosting,
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePosting,
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePosting,
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });
};

export { uploadImage };

import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API 호출 함수들
const API_URL = import.meta.env.VITE_FOOD_IP;

const fetchPostingList = async () => {
    const response = await axios.get(`${API_URL}/posting/list`,{
        withCredentials: true,
    });
    return response.data;
};

const detailPostingList = async (_id) => {
    const response = await axios.get(`${API_URL}/posting/detail?postingId=${_id}`);
    return response.data;
}

const addPosting = async (data) => {
    const response = await axios.post(`${API_URL}/posting/insert`, data);
    return response.data; // 응답 데이터 반환
};

const deletePosting = async (_id) => {
    await axios.delete(`${API_URL}/posting/delete?postingId=${_id}`);
};

const updatePosting = async (_id, data) => {
    await axios.put(`${API_URL}/posting/update/${_id}`, data);
};

// React Query 훅들
export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPostingList,
    });
};

export const useDetailPost = () => {
    return useQuery({
        queryKey: ['postDetail'],
        queryFn: detailPostingList,
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

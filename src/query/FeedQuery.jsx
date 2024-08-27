import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API URL 설정 (환경 변수가 없을 경우 기본 URL로 대체)
const API_URL = import.meta.env.VITE_FOOD_IP || "http://localhost:17017";

// 포스팅과 유저 정보를 함께 가져오는 함수
const fetchPostWithUserDetails = async () => {
  const response = await axios.get(`${API_URL}/posting/listWithUser`, {
    withCredentials: true,
  });
  return response.data;
};

//포스팅에 있는 유저 정보 가져오는 함수
const fetchPostsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/posting/listByUser`, {
    withCredentials: true,
    params: { user_id: userId },
  });
  return response.data;
};

// 게시물 추가
const addPosting = async (data) => {
  const response = await axios.post(`${API_URL}/posting/insert`, data, {
    withCredentials: true,
  });
  return response.data;
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
  const response = await axios.put(
    `${API_URL}/posting/update/${postingId}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//포스팅에 있는 유저 정보 가져오기
export const usePostsByUser = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !!userId,
  });
};

// React Query 훅들
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPostWithUserDetails, // 새로운 API 호출
  });
};

export const useDetailPost = (postingId) => {
  return useQuery({
    queryKey: ["postDetail", postingId],
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
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePosting,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePosting,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

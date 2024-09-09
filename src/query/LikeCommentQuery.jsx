import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API URL 설정
const API_URL = import.meta.env.VITE_LIKECOMMENT_IP || "http://localhost:9090";

// Axios 기본 설정 업데이트
axios.defaults.withCredentials = true;

const fetchFavoritesCount = async (postingId) => {
  const response = await axios.get(`${API_URL}/favorite/count`, {
    withCredentials: true,
    params: { postingId },
  });
  return response.data;
};

export const useFavoritesCount = (postingId) => {
  return useQuery({
    queryKey: ["favoritesCount", postingId],
    queryFn: () => fetchFavoritesCount(postingId),
    enabled: !!postingId,
  });
};

const fetchCommentsCount = async (postingId) => {
  const response = await axios.get(`${API_URL}/comment/count`, {
    withCredentials: true,
    params: { postingId },
  });
  return response.data;
};

export const useCommentsCount = (postingId) => {
  return useQuery({
    queryKey: ["favoritesCount", postingId],
    queryFn: () => fetchCommentsCount(postingId),
    enabled: !!postingId,
  });
};

const toggleFavorite = async ({ postingId, userId }) => {
  try {
    await axios.post(`${API_URL}/favorite/toggle`, null, {
      withCredentials: true,
      params: { postingId, userId },
    });
  } catch (error) {
    console.error(
      "즐겨찾기 토글 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const checkFavorite = async ({ postingId, userId }) => {
  const response = await axios.get(`${API_URL}/favorite/check`, {
    withCredentials: true,
    params: { postingId, userId },
  });
  return response.data;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsWithUser"]);
    },
  });
};

export const useCheckFavorite = (postingId, userId) => {
  return useQuery({
    queryKey: ["checkFavorite", postingId, userId],
    queryFn: () => checkFavorite({ postingId, userId }),
    enabled: !!postingId && !!userId,
  });
};

const addComment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/comment/insert`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 추가 실패:", error);
    throw error;
  }
};

const getCommentById = async (commentId) => {
  const response = await axios.get(`${API_URL}/comment/${commentId}`, {
    withCredentials: true,
  });
  return response.data;
};

const updateComment = async ({ commentId, data }) => {
  const response = await axios.put(`${API_URL}/comment/update`, data, {
    withCredentials: true,
    params: { id: commentId },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${API_URL}/comment/delete`, {
      withCredentials: true,
      params: { id: commentId },
    });
  } catch (error) {
    console.error(
      "댓글 삭제 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getCommentsByPostingId = async (postingId) => {
  const response = await axios.get(`${API_URL}/comment/listByUser`, {
    withCredentials: true,
    params: { postingId },
  });
  return response.data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPostingId"]);
    },
  });
};

export const useGetCommentById = (commentId) => {
  return useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getCommentById(commentId),
    enabled: !!commentId,
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPostingId"]);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPostingId"]);
    },
  });
};

export const useCommentsByPostingId = (postingId) => {
  return useQuery({
    queryKey: ["commentsByPostingId", postingId],
    queryFn: () => getCommentsByPostingId(postingId),
    enabled: !!postingId,
  });
};

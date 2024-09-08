import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API URL 설정
const API_URL = import.meta.env.VITE_FOOD_IP || "http://localhost:17017";
const API_URL1 = import.meta.env.VITE_API_REFRI;
// Axios 기본 설정 업데이트
axios.defaults.withCredentials = true;

// 게시물과 사용자 정보 가져오기
const fetchPostWithUserDetails = async () => {
  const response = await axios.get(`${API_URL}/posting/listWithUser`, {
    withCredentials: true,
  });
  return response.data;
};

// 게시물 목록 가져오기
const fetchPostsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/posting/listByUser`, {
    withCredentials: true,
    params: { user_id: userId },
  });
  return response.data;
};

// 모든 사용자 정보 가져오기
const fetchAllUsers = async () => {
  const response = await axios.get(`${API_URL}/posting/users`, {
    withCredentials: true,
  });
  return response.data;
};

// 특정 게시물과 사용자 정보 가져오기
const fetchPostDetailWithUser = async (postingId) => {
  const response = await axios.get(`${API_URL}/posting/detailWithUser`, {
    withCredentials: true,
    params: { postingId },
  });
  return response.data;
};

// 이미지 업로드
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  const response = await axios.post(`${API_URL}/posting/upload`, formData, {
    withCredentials: true,
  });
  return response.data.postingphoto; // 서버에서 반환하는 이미지 URL
};

// 게시물 추가
const addPosting = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/posting/insert`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("게시물 추가 실패:", error);
    throw error;
  }
};

// 게시물 수정 함수
const updatePosting = async (postingId, data) => {
  try {
    console.log(typeof data)
    const response = await axios.put(
      `${API_URL}/posting/update/${postingId}`,  // postingId를 URL 경로에 포함
      data,  // data를 본문(body)로 전달
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,  // 요청 시 쿠키를 포함
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating posting:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시물 삭제
const deletePosting = async (postingId) => {
  try {
    await axios.delete(`${API_URL}/posting/delete`, {
      withCredentials: true,
      params: { postingId },
    });
  } catch (error) {
    console.error("게시물 삭제 실패:", error.response ? error.response.data : error.message);
    throw error; // 오류를 상위 컴포넌트에 전파하여 적절히 처리하도록 합니다.
  }
};

export const usercreatesub = async (postingUserId, userId) => {
  try {
    const response = await axios.post(`${API_URL1}/api/food/create/subUser`, null, {
      params: {
        userId1: userId,
        userId2: postingUserId,
      },
    });
    return response.data;
  } catch (e) {
    //예외처리
  }
};
export const userdelete = async (postingUserId, userId) => {
  try {
    const response = await axios.post(`${API_URL1}/api/food/delete/subUser`, null, {
      params: {
        userid1: userId,
        userid2: postingUserId,
      },
    });
    return response.data;
  } catch (e) {
    //예외처리
  }
};

//고졸 이슈로 팔로워 팔로잉이 서로 바뀌었습니다.
//죄송합니다.
export const subUserListFollow = async (userId) => {
  try {
    const response = await axios.get(`${API_URL1}/api/food/find/subUser`, {
      params: {
        userId: userId,
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const subUserListFollowing = async (userId) => {
  try {
    const response = await axios.get(`${API_URL1}/api/food/find/Usersub`, {
      params: {
        userId: userId,
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// React Query 훅들
export const usePostsWithUserDetails = () => {
  return useQuery({
    queryKey: ["postsWithUser"],
    queryFn: fetchPostWithUserDetails,
  });
};

export const usePostsByUser = (userId) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !!userId,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
  });
};

export const useDetailPost = (postingId) => {
  return useQuery({
    queryKey: ["postDetail", postingId],
    queryFn: () => fetchPostDetailWithUser(postingId),
    enabled: !!postingId,
  });
};

export const useAddPost = (userId, title) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPosting,
    onSuccess: async (data) => {  // addPosting 함수가 반환한 데이터를 받습니다.
      queryClient.invalidateQueries(["postsWithUser"]);
      console.log("mutation data", data);
      if (data) {
        console.log(`새로운 게시물이 생성되었습니다. ID: ${data}`);
        //console.log("data : ", data);
        //console.log("userId : ", userId);
        //console.log("title : ", title);
        //알림 전송 // 포스팅 작성
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_ALERT_IP}/writePosting`,
            {
              sender: userId,
              recipeposting: data,
              memo: title,
            },
            {
              headers: {
                "Content-Type": "application/json", // 반드시 명시해야 함
              },
            }
          );
          console.log(response);
        } catch (error) {
          console.error("알림 전송 중 오류 발생:", error);
        }
      }
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePosting,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsWithUser"]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePosting,
    onSuccess: () => {
      queryClient.invalidateQueries(["postsWithUser"]);
    },
  });
};

export { uploadImage, updatePosting };

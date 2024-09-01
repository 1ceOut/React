// store/feedStore.js
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 초기 상태 정의
const initialPostState = {
    postId: null,
    title: '',
    content: '',
    tags: '',
    thumbnail: null,
    steps: [],
};

// 상태를 정의하는 함수
const postStore = (set) => ({
    post: initialPostState,
    setPost: (post) => set({ post }),
    updatePostField: (field, value) => set((state) => ({
        post: {
            ...state.post,
            [field]: value,
        },
    })),
    resetPost: () => set({ post: initialPostState }),
});

// Zustand 스토어 생성
const useFeedStore = create(
    devtools(
        persist(postStore, {
            name: 'FeedStore', // 로컬 스토리지에 저장될 키
        })
    )
);

export default useFeedStore;

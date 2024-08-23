import React from "react";
import MenuNavigate from "../../components/Common/MenuNavigate";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from './../../components/Community/Feed/FeedTitle';
import { usePosts } from '../../query/FeedQuery'; // React Query 훅을 임포트
import FeedProfile from "../../components/Community/Feed/FeedProfile";

const FeedPage = () => {
    // React Query를 사용하여 게시물 데이터를 가져옴
    const { data: posts, isLoading, isError } = usePosts();

    // 데이터가 로딩 중일 때 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 데이터 로드 중 에러가 발생한 경우 처리
    if (isError) {
        return <div>Error loading posts</div>;
    }

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate />
            <Profile />
            {/* 게시물 리스트 렌더링 */}
            {posts.map((post) => (
                <div key={post.posting_id} className="mb-6">
                    {/* FeedProfile: 작성자 정보와 등록일자 표시 */}
                    <FeedProfile 
                        userName={post.user_id} 
                        writeday={post.writeday} 
                        userProfile="/assets/cha.png" // 예시 프로필 이미지, 실제 데이터로 변경 가능
                    />
                    
                    {/* FeedTitle: 게시물의 제목 및 썸네일 표시 */}
                    <FeedTitle 
                        _id={post.posting_id} 
                        title={post.title} 
                        imageUrl={post.thumbnail} 
                    />

                    {/* 게시물의 태그, 조회수, 좋아요 등 추가 정보 */}
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <div>Tags: {post.tags}</div>
                        <div>{post.views} views · {post.likes} likes</div>
                    </div>
                </div>
            ))}
            <FeedMenu />
        </main>
    );
};

export default FeedPage;

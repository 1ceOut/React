import MenuNavigate from "../../components/Common/MenuNavigate";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from './../../components/Community/Feed/FeedTitle';
import { usePosts } from '../../query/FeedQuery';
import FeedProfile from "../../components/Community/Feed/FeedProfile";
import FeedMenu from './../../components/Community/FeedDetail/FeedMenu';

const FeedPage = () => {
    // React Query를 사용하여 게시물과 유저 정보를 가져옴
    const { data: posts, isLoading, isError } = usePosts();

    // 데이터가 로딩 중일 때 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 데이터 로드 중 에러가 발생한 경우 처리
    if (isError) {
        return <div>Error loading posts</div>;
    }

    // posts가 배열인지 확인하고, 배열이 아닐 경우 빈 배열로 처리
    const safePosts = Array.isArray(posts) ? posts : [];

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate />
            <Profile />
            {/* 게시물 리스트 렌더링 */}
            {safePosts.length > 0 ? (
                safePosts.map(({ posting, userProfile, userName }) => (
                    <div key={posting.posting_id} className="mb-6">
                        {/* FeedProfile: 작성자 정보와 등록일자 표시 */}
                        <FeedProfile 
                            userName={userName} 
                            writeday={posting.writeday} 
                            userProfile={userProfile} 
                        />
                        
                        {/* FeedTitle: 게시물의 제목 및 썸네일 표시 */}
                        <FeedTitle 
                            _id={posting.posting_id} 
                            title={posting.title} 
                            imageUrl={posting.thumbnail} 
                        />

                        {/* 게시물의 태그, 조회수, 좋아요 등 추가 정보 */}
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                        </div>
                        <FeedMenu />
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
        </main>
    );
};

export default FeedPage;

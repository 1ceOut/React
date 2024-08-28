import { useNavigate } from "react-router-dom";
import { usePostsWithUserDetails } from "../../query/FeedQuery"; // 수정된 훅 이름

const Community = () => {
  const navigate = useNavigate();

  const communityNavigation = () => {
    navigate("/community/feed");
  };

  // usePostsWithUserDetails 훅을 사용하여 게시물 데이터를 가져옵니다.
  const { data: posts = [], isLoading, isError } = usePostsWithUserDetails();

  // 데이터 로딩 중이거나 오류 발생 시 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  // 안전한 게시물 데이터 설정
  const safePosts = Array.isArray(posts) ? posts : [];

  // 게시물 셔플 함수
  const shufflePosts = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // 무작위 게시물 선택
  const randomPosts = shufflePosts(safePosts).slice(0, 3);

  return (
    <section className="self-stretch">
      <div className="flex gap-5 justify-between whitespace-nowrap">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          커뮤니티
        </h2>
        <div
          className="text-sm tracking-tight text-neutral-500 underline cursor-pointer"
          onClick={communityNavigation}
        >
          전체보기
        </div>
      </div>
      <div className="mt-4">
        {randomPosts.length > 0 ? (
          randomPosts.map(({ posting }) => (
            <div key={posting.posting_id} className="mb-6 flex justify-between">
              <div>{posting.title}</div>
              <div className="font-normal text-[12px] text-[#767676]">
                {posting.writeday}
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </section>
  );
};

export default Community;

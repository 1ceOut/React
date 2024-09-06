import { useNavigate } from "react-router-dom";
import { usePostsWithUserDetails } from "../../query/FeedQuery";
import {keyframes} from "@emotion/react"; // 수정된 훅 이름

const Community = () => {
  const navigate = useNavigate();

  // communityDetail 함수 수정: postingId를 파라미터로 받음
  const communityDetail = (postingId) => {
    navigate(`/community/feeddetail/${postingId}`);
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
    return array.sort(() => Math.random() - 0.9);
  };

  // 무작위 게시물 선택
  const randomPosts = shufflePosts(safePosts).slice(0, 10);


  return (
    <section className="self-stretch">
      <div className="flex gap-5 justify-between whitespace-nowrap">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          오늘 뭐 먹지~?
        </h2>
        <div
          className="text-sm tracking-tight text-neutral-500 underline cursor-pointer"
          onClick={() => navigate("/community/feed")}
        >
          전체보기
        </div>
      </div>
      <div className="mt-4 flex space-x-2 flex w-auto h-max-[340px] mt-1 rounded-lg overflow-x-auto scrollbar-hide">
        {randomPosts.length > 0 ? (
          randomPosts.map(({ posting }) => {
            // Date 객체를 사용하여 날짜 포맷팅
            const date = new Date(posting.writeday);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            return (
                <div className="bg-[] auto-slide-left rounded-xl">
                <div
                    key={posting.postingId}
                    className="min-w-52 h-100"
                    onClick={() => communityDetail(posting.postingId)}
                >
                  <div className="flex flex-col items-center p-2.5">
                    <img src={posting.thumbnail} className="w-full h-40 rounded-xl"/>
                    <div className="line-clamp-2 pl-2 pr-2 pt-1">{posting.title}</div>
                    <div className="flex items-start w-full p-2 font-normal text-[12px] text-[#767676]">
                      {formattedDate}
                    </div>
                  </div>
                </div>
                </div>
            );
          })
        ) : (
            <div>No posts available</div>
        )}
      </div>
    </section>
  );
};

export default Community;

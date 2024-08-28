import { useNavigate } from "react-router-dom";
import { usePosts } from "../../query/FeedQuery";

const Community = () => {
  const navigate = useNavigate();

  const communityNavigation = () => {
    navigate("/community/feed");
  };

  const { data: posts } = usePosts();

  const safePosts = Array.isArray(posts) ? posts : [];

  const shufflePosts = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

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

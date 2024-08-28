import PropTypes from "prop-types";
import HorizontalLine from "./../../Common/HorizontalLine";
import { usePostsByUser } from "./../../../query/FeedQuery";

const FeedContent = ({ userId }) => {
  const { data: posts } = usePostsByUser(userId);
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <div>
      <div>
        <div className="flex justify-between items-center h-8">
          <div className="flex justify-center items-center w-1/2">스토리</div>
          <div className="flex justify-center items-center w-1/2">영상</div>
        </div>
        <div className="mt-[10px] mb-4">
          <HorizontalLine />
        </div>
      </div>
      <div className="self-stretch space-y-2">
        {safePosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {safePosts.map(({ posting }) => (
              <div key={posting.posting_id} className="mb-6">
                <img
                  src={posting.thumbnail}
                  alt="피드 사진"
                  className="w-[112px] h-[114px]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

FeedContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FeedContent;

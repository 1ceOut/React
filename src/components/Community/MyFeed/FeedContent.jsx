import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import HorizontalLine from "./../../Common/HorizontalLine";
import { usePostsByUser } from "./../../../query/FeedQuery";

const FeedContent = ({ userId, writeday }) => {
  // writeday를 props로 받습니다.
  const { data: posts } = usePostsByUser(userId);
  const safePosts = Array.isArray(posts) ? posts : [];

  // 최신순으로 게시물 정렬 (가장 최근 게시물이 먼저 나오도록)
  safePosts.sort(
    (a, b) => new Date(b.posting.writeday) - new Date(a.posting.writeday)
  );

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 게시물 페이지로 이동하기 위한 핸들러 함수
  const handlePostClick = (postingId) => {
    navigate(`/community/feeddetail/${postingId}`); // 클릭된 게시물의 ID로 이동
  };

  return (
    <div>
      <div className="mt-[10px] mb-4">
        <HorizontalLine />
      </div>

      {/* 게시물 섹션 */}
      <div className="self-stretch space-y-2">
        {safePosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {safePosts.map(({ posting }) => (
              <div
                key={posting.postingId}
                className="mb-6 cursor-pointer"
                onClick={() => handlePostClick(posting.postingId)} // 썸네일 클릭 시 게시물로 이동
              >
                <img
                  src={posting.thumbnail}
                  alt="피드 사진"
                  className="w-[112px] h-[114px]"
                />
                {/* writeday를 출력하는 예시 */}
                <div>{writeday}</div>
              </div>
            ))}
          </div>
        ) : null}{" "}
        {/* No posts available 텍스트 제거 */}
      </div>
    </div>
  );
};

FeedContent.propTypes = {
  userId: PropTypes.string.isRequired,
  writeday: PropTypes.string, // writeday의 PropType을 정의합니다.
};

export default FeedContent;

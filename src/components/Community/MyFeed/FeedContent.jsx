import PropTypes from "prop-types";
import { useState } from "react"; // 상태 관리를 위한 useState 추가
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import HorizontalLine from "./../../Common/HorizontalLine";
import { usePostsByUser } from "./../../../query/FeedQuery";

const FeedContent = ({ userId }) => {
  const { data: posts } = usePostsByUser(userId);
  const safePosts = Array.isArray(posts) ? posts : [];

  // 현재 선택된 섹션을 추적하기 위한 상태 (posts 또는 reels)
  const [selectedSection, setSelectedSection] = useState("posts");
  // 현재 활성화된 이미지를 추적하기 위한 상태
  const [activeImage, setActiveImage] = useState("posts");
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 섹션 변경을 위한 핸들러 함수
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setActiveImage(section); // 클릭된 섹션에 따라 활성화된 이미지 설정
  };

  // 게시물 페이지로 이동하기 위한 핸들러 함수
  const handlePostClick = (postingId) => {
    navigate(`/community/feeddetail/${postingId}`); // 클릭된 게시물의 ID로 이동
  };

  // 클릭 시 적용될 스타일
  const clickedStyle = {
    filter: "brightness(0.8) sepia(0.6) hue-rotate(200deg) saturate(2)", // 파스텔톤 색상 효과
  };

  return (
    <div>
      <div>
        {/* 이미지 버튼들 */}
        <div className="flex justify-between items-center h-8">
          {/* 게시물 섹션 선택 이미지 */}
          <div
            className="flex justify-center items-center w-1/2 cursor-pointer" // 클릭 가능한 커서 스타일 추가
            onClick={() => handleSectionChange("posts")} // 클릭 시 섹션 변경
          >
            <img
              src="../../assets/post5.png"
              style={{
                width: 27,
                ...(activeImage === "posts" ? clickedStyle : {}), // 활성화된 이미지에 스타일 적용
              }}
              alt="게시물"
            />
          </div>
          {/* 릴스 섹션 선택 이미지 */}
          <div
            className="flex justify-center items-center w-1/2 cursor-pointer" // 클릭 가능한 커서 스타일 추가
            onClick={() => handleSectionChange("reels")} // 클릭 시 섹션 변경
          >
            <img
              src="../../assets/lils5.png"
              style={{
                width: 27,
                ...(activeImage === "reels" ? clickedStyle : {}), // 활성화된 이미지에 스타일 적용
              }}
              alt="릴스"
            />
          </div>
        </div>
        <div className="mt-[10px] mb-4">
          <HorizontalLine />
        </div>
      </div>

      {/* 선택된 섹션에 따라 콘텐츠를 표시 */}
      <div className="self-stretch space-y-2">
        {selectedSection === "posts" ? (
          // 게시물 섹션
          safePosts.length > 0 ? (
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
                </div>
              ))}
            </div>
          ) : (
            <div>No posts available</div>
          )
        ) : (
          // 릴스 섹션 (릴스 콘텐츠가 있는 경우)
          <div className="grid grid-cols-3 gap-3">
            {safePosts.map(({ posting }) => (
              <div key={posting.postingId} className="mb-6">
                <video
                  src={posting.reelUrl} // 릴스 영상 URL (가정)
                  controls
                  className="w-[112px] h-[114px]"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

FeedContent.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FeedContent;

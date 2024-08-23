import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FeedTitle = ({ title, imageUrl, _id }) => {
    const navigate = useNavigate();

    const detailNavigation = () => {
        // 해당 게시물의 _id를 기반으로 상세 페이지로 이동
        navigate(`/community/feeddetail/${_id}`);
    };

    return (
        <div className="self-stretch cursor-pointer" onClick={detailNavigation}>
            <div>
                {/* 이미지와 제목을 표시 */}
                <img src={imageUrl} alt={title} className="w-[342px] h-auto" />
            </div>
            <div className="my-[14px] text-[15px] font-medium">
                {title}
            </div>
        </div>
    );
};

FeedTitle.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default FeedTitle;

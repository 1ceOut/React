import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FeedTitle = ({ title, imageUrl, postingId }) => {
    const navigate = useNavigate();

    const detailNavigation = () => {
        navigate(`/community/feeddetail/${postingId}`);
    };

    return (
        <div className="self-stretch cursor-pointer" onClick={detailNavigation}>
            <div>
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
    postingId: PropTypes.string.isRequired,
};

export default FeedTitle;

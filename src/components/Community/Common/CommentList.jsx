import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const CommentList = ({ comment, userProfile, userName }) => {
  return (
    <div className="mb-4">
      <div className="flex">
        <div>
          <img
            src={userProfile || "/assets/cha.png"}
            alt="유저 사진"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="ml-2">
          <div className="w-[302px] rounded-xl h-auto bg-[#F5F5F5] p-[14px]">
            <div className="flex space-x-4">
              <div>{userName}</div>
              <div className="flex justify-center items-center">
                <Rating size="small" readOnly value={comment.rate} />
              </div>
              <div>{comment.diff}</div>
            </div>
            <br />
            <div>{comment.comment}</div>
          </div>
          <div className="flex space-x-5 font-normal text-[12px] text-[#767676]">
            <div>1시간</div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentList.propTypes = {
  comment: PropTypes.shape({
    commentId: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    diff: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  userProfile: PropTypes.string,
  userName: PropTypes.string,
};

CommentList.defaultProps = {
  userProfile: "/assets/cha.png",
  userName: "Unknown User",
};

export default CommentList;

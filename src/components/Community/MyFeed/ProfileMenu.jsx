import PropTypes from "prop-types";
import { usePostsByUser } from "./../../../query/FeedQuery";

const ProfileMenu = ({ userProfile, userName, userId }) => {
  const { data: posts } = usePostsByUser(userId);
  const postCount = posts ? posts.length : 0;

  return (
    <div className="self-stretch flex justify-between items-center mt-6 mb-8">
      <div className="self-stretch flex items-center justify-center">
        <div className="mr-10 flex flex-col items-center justify-center space-y-2">
          <img
            src={userProfile}
            alt="프로필 사진"
            className="w-20 h-20 rounded-full"
          />
          <div>{userName}</div>
        </div>
        <div className="flex justify-evenly items-center w-52">
          <div className="flex flex-col justify-center items-center w-[114px]">
            <div className="text-black font-semibold text-base">
              {postCount}
            </div>
            <div className="text-[#767676] font-semibold text-base">게시물</div>
          </div>
          <div className="flex flex-col justify-center items-center w-[114px]">
            <div className="text-black font-semibold text-base">180</div>
            <div className="text-[#767676] font-semibold text-base">팔로워</div>
          </div>
          <div className="flex flex-col justify-center items-center w-[114px]">
            <div className="text-black font-semibold text-base">300</div>
            <div className="text-[#767676] font-semibold text-base">팔로잉</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ProfileMenu;

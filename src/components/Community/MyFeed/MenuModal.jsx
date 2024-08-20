
import { PropTypes } from 'prop-types';

const MenuModal = ({ isOpen, feedDelete, profileEdit}) => {

    if (!isOpen) return null;

    return (
        <div className="bg-white rounded-lg w-[86px] h-[84px] top-24 right-4 absolute
            border-[1px] border-[#F4F4F4] flex justify-center items-center shadow-md
        ">
          <div className="flex flex-col space-y-[12px]">
            <button
              onClick={feedDelete}
              className="font-semibold text-[13px] cursor-pointer"
            >
              게시글 삭제
            </button>
            <button
              onClick={profileEdit}
              className="font-semibold text-[13px] cursor-pointer"
            >
              프로필 편집
            </button>
          </div>
        </div>
    );
};

    MenuModal.propTypes= {
        isOpen : PropTypes.bool.isRequired,
        feedDelete : PropTypes.func.isRequired,
        profileEdit : PropTypes.func.isRequired,
    };

export default MenuModal;
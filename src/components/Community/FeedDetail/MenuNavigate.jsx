import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDeletePost } from "../../../query/FeedQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MenuNavigate = ({
  userName,
  userProfile,
  writeDay,
  postingId,
  isOwner,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deletePost } = useDeletePost();

  const modalRef = useRef(null); // 모달의 ref

  const goBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updatePosting = () => {
    navigate("/community/feedupdate", {
      state: { postingId }, // 필요한 데이터는 UpdateFeed에서 조회함
    });
  };

  const confirmAction = async () => {
    try {
      await deletePost(postingId);
      console.log("게시물 삭제 성공");
      navigate(-1);
    } catch (error) {
      console.error(
        "게시물 삭제 실패:",
        error.response ? error.response.data : error.message
      );
      // Optional: Display user-friendly error message
    } finally {
      closeModal();
    }
  };

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen]);

  return (
    <div className="self-stretch flex items-center justify-between w-[342px] h-14 mt-[50px]">
      <div className="flex justify-center items-center">
        <div
          className="w-6 h-6 cursor-pointer flex justify-center items-center"
          onClick={goBack}
        >
          <ArrowBackIcon />
        </div>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img
              src={userProfile}
              alt="유저 사진"
              className="w-8 h-8 ml-4 rounded-full"
            />
          </div>
          <div className="flex flex-col ml-2">
            <div>{userName}</div>
            <div>{writeDay}</div>
          </div>
        </div>
      </div>
      {isOwner && (
        <div className="w-6 h-6 cursor-pointer" onClick={openModal}>
          . . .
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg p-6 w-[342px]"
            ref={modalRef} // 모달에 ref를 설정
          >
            <div className="text-lg font-semibold mb-8 flex flex-col justify-center items-center">
              <img src="/assets/confirm.png" alt="삭제확인" className="mb-3" />
              수정/삭제
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={updatePosting}
                className="w-[146px] h-14 border-[1px] rounded-xl"
              >
                수정
              </button>
              <button
                onClick={confirmAction}
                className="w-[146px] h-14 border-[1px] rounded-xl"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MenuNavigate.propTypes = {
  userName: PropTypes.string.isRequired,
  userProfile: PropTypes.string.isRequired,
  writeDay: PropTypes.string.isRequired,
  postingId: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default MenuNavigate;

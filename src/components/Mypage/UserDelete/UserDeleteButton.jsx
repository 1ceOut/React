import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { PropTypes } from 'prop-types';
import {inviteUserDelete} from "../../../query/RefriQuery.jsx";
import {useNavigate} from "react-router-dom";

const UserDeleteButton = ({ isEnabled, checkedUserIds, refriId , nextPath }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = () => {
        if (isEnabled) {
            setIsModalOpen(true);
        }
    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 삭제 확인 핸들러
    const handleConfirmDelete = async () => {

        try {
            const response = await inviteUserDelete(checkedUserIds, refriId);
            console.log("삭제할 사용자 ID:", checkedUserIds);
            console.log(refriId);
        }
        catch (error) {
                console.log('삭제 요청 중 오류 발생:', error);
            }
        // 모달 닫기
        setIsModalOpen(false);
        alert(`${checkedUserIds} 사용자 삭제했습니다`);
        navigate('/mypage/profile');
    };

    return (
        <div>
            <div
                className={`flex text-[#868686] rounded-xl self-stretch absolute justify-center items-center w-[342px] h-14 cursor-pointer bottom-[54px] ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={handleDeleteClick}
            >
                삭제
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

UserDeleteButton.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    refriId:PropTypes.string.isRequired,
    checkedUserIds: PropTypes.arrayOf(PropTypes.number).isRequired, // ID가 숫자라고 가정
    nextPath: PropTypes.string.isRequired,
};

export default UserDeleteButton;

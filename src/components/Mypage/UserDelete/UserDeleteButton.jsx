// UserDeleteButton.jsx
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import PropTypes from 'prop-types';
import { inviteUserDelete } from "../../../query/RefriQuery.jsx";
import { useNavigate } from "react-router-dom";

const UserDeleteButton = ({ isEnabled, checkedUserIds, checkedUserNames, refriId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    console.log(isEnabled);

    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = () => {
        console.log("삭제 버튼 활성화 상태:", isEnabled);
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
            console.log("삭제할 사용자 이름:", checkedUserNames);
        } catch (error) {
            console.log('삭제 요청 중 오류 발생:', error);
        }
        setIsModalOpen(false);
        alert(`${checkedUserNames.join(', ')} 사용자 삭제했습니다`);
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
                userNames={checkedUserNames} // 사용자 이름을 전달
            />
        </div>
    );
};

UserDeleteButton.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    refriId: PropTypes.string.isRequired,
    checkedUserIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    checkedUserNames: PropTypes.arrayOf(PropTypes.string).isRequired, // 이름 prop 추가
};

export default UserDeleteButton;

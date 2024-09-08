import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import PropTypes from 'prop-types';
import { inviteUserDelete } from "../../../query/RefriQuery.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserDeleteButton = ({ isEnabled, checkedUsers }) => {
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
            // 냉장고별로 삭제 요청
            for (const [refriId, users] of Object.entries(checkedUsers)) {
                const userIds = users.map(user => user.id);
                const userNames = users.map(user => user.name);

                if (userIds.length > 0) {
                    await inviteUserDelete(userIds, refriId);
                    console.log(`삭제할 사용자 ID (냉장고 ${refriId}):`, userIds);
                    console.log(`삭제할 사용자 이름:`, userNames);
                    
                    // 사용자별로 삭제 알림 전송
                    for (const userId of userIds) {
                        //await sendDeleteNotification(userId, refriId, userNames.find(name => name === userId));
                        try {
                            await axios.post(`${import.meta.env.VITE_ALERT_IP}/deleteUserFromRefrigerator`, {
                                sender: encodeURIComponent(userId), // 삭제된 유저 이름
                                senderrefri: refriId, // 냉장고 ID
                                memo: encodeURIComponent(userId),
                            });
                        } catch (error) {
                            //console.error(`사용자 ${userId} 삭제 알림 전송 중 오류 발생:`, error);
                        }
                    }
                    alert(`${userNames.join(', ')} 사용자 삭제했습니다`);
                }
            }
        } catch (error) {
            console.log('삭제 요청 중 오류 발생:', error);
        }
        setIsModalOpen(false);
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
                userNames={Object.values(checkedUsers).flat().map(user => user.name)} // 모든 유저 이름 전달
            />
        </div>
    );
};

UserDeleteButton.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    checkedUsers: PropTypes.object.isRequired, // 냉장고별 유저 객체
};

export default UserDeleteButton;

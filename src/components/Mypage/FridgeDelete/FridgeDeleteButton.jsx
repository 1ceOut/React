import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import PropTypes from 'prop-types';

const FridgeDeleteButton = ({ option, isEnabled, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [optionName, setOptionName] = useState('');

    const handleDeleteClick = () => {
        if (isEnabled) {
            setIsModalOpen(true);
            setOptionName(option);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        if (onDelete) {
            onDelete(); // 삭제 작업을 수행하는 함수를 호출합니다.
        }
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
                option={optionName}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

FridgeDeleteButton.propTypes = {
    option: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired, // 삭제 작업을 수행하는 함수 추가
};

export default FridgeDeleteButton;

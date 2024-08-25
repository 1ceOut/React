import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { PropTypes } from 'prop-types';

const FridgeDeleteButton = ( {option, isEnabled} ) => {
    const [isModalOpen, setIsModalOpen] = useState('');
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
  option : PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
};

export default FridgeDeleteButton;
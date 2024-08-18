import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { PropTypes } from 'prop-types';

const FridgeDeleteButton = ( {isEnabled} ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
      if (isEnabled) {
        setIsModalOpen(true);
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
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onConfirm={handleConfirmDelete} 
        />
      </div>
    );
};

FridgeDeleteButton.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
};

export default FridgeDeleteButton;
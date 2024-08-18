import { PropTypes } from 'prop-types';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-[342px] h-[224px]">
          <div className='flex justify-center items-center mb-[14px]'>
            <img src="/assets/confirm.png" alt="확인 그림" />
          </div>
          <h2 className="flex justify-center items-center font-semibold mb-[31px]">일반 냉장고를 정말 삭제하시겠어요?</h2>
          <div className="flex justify-end space-x-[10px]">
            <button
              onClick={onClose}
              className="px-[44px] py-[18px] border-[1px] border-[#E1E1E1] rounded-xl w-[146px] h-[56px] font-semibold"
            >
              아니요
            </button>
            <button
              onClick={onConfirm}
              className="px-[66px] py-[18px] border-[1px] border-[#E1E1E1] rounded-xl w-[146px] h-[56px] font-semibold"
            >
              네
            </button>
          </div>
        </div>
      </div>
    );
  };

  ConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };
  
  export default ConfirmModal;
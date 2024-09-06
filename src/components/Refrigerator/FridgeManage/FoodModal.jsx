import { PropTypes } from 'prop-types';

const FoodModal = ({ option, isOpen, onClose, onConfirm, onImg }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[342px]">
                <div className="text-lg font-semibold mb-8 flex flex-col justify-center items-center">
                    <div className="bg-gray-100 w-[64px] h-[64px] p-2 rounded-full">
                    <img src={onImg} alt="삭제확인" className='mb-3'/>
                    </div>
                    <p className="p-2">
                    {option}를 정말 삭제하시겠어요?
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="w-[146px] h-14 border-[1px] rounded-xl"
                    >
                        아니요
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-[146px] h-14 border-[1px] rounded-xl"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

FoodModal.propTypes = {
    option : PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default FoodModal;
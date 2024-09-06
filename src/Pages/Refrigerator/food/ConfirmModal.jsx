import PropTypes from "prop-types";

const ConfirmModal = ({ isOpen, onClose, onConfirm, fridgeName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[342px] h-[224px]">
                <div className="flex justify-center items-center mb-[14px]">
                    <img src="/assets/check.png" style={{width:'55px'}} alt="확인 그림" />
                </div>
                <h2 className="flex justify-center items-center font-semibold mb-[31px]">
                    {fridgeName ? `${fridgeName}을(를) 등록하시겠습니까?` : "등록하시겠습니까?"}
                </h2>
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
    fridgeName: PropTypes.string.isRequired,
};

export default ConfirmModal;

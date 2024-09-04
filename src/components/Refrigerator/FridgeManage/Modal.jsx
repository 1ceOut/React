import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div
                className="bg-white rounded-lg p-4 z-50 w-[370px] absolute top-80 left-2.5"
                // 위치를 오른쪽 하단으로 설정
            >
                <button className="absolute top-2 right-2" onClick={onClose}>
                    닫기
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import axiosApi from "../../Pages/Talk/axiosApi.js";

const UsersModal = ({ onRefri, isOpen, onClose }) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // 모달이 열릴 때만 데이터를 가져오도록 useEffect 설정
        if (isOpen) {
            fetchUsersForFridge(onRefri);
        }
    }, [isOpen, onRefri]);

    // 유저 리스트 불러오기 함수
    const fetchUsersForFridge = async (onRefri) => {
        try {
            const response = await axios.get(`https://api.icebuckwheat.kro.kr/api/food/find/refriUser?refrigerator_id=${onRefri}`);
            const fetchedUsers = response.data.map(user => ({
                ...user,
                profileImageUrl: user.photo // 프로필 이미지 URL을 받아옴
            }));
            setUsers(fetchedUsers); // 상태에 유저 리스트 저장
        } catch (error) {
            console.error("Error fetching users for fridge:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[342px]">
                <div className="text-lg font-semibold mb-8 flex flex-col justify-center items-center">
                    <p className="p-2">
                       냉장고 구성원들
                    </p>
                    {/* 유저 리스트 렌더링 */}
                    <div className="space-y-4 w-full">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className="flex items-center space-x-4">
                                    {/* 프로필 이미지 */}
                                    <img
                                        src={user.profileImageUrl || '/default-profile.png'}
                                        alt="프로필"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    {/* 유저 이름 */}
                                    <span>{user.name}</span>
                                </div>
                            ))
                        ) : (
                            <p>유저를 불러오는 중...</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="w-full h-14 border-[1px] rounded-xl"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

UsersModal.propTypes = {
    onRefri: PropTypes.string.isRequired, // 냉장고 ID prop
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UsersModal;

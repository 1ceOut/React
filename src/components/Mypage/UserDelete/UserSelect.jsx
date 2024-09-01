import { useEffect, useState } from 'react';
import UserDeleteButton from './UserDeleteButton';
import { inviteUserList } from "../../../query/RefriQuery.jsx";

const UserSelect = ({ userId, refriId }) => {
    const [userData, setUserData] = useState([]);

    // 체크박스 상태 변경 핸들러
    const handleCheckboxChange = (index) => {
        setUserData(prevUserData =>
            prevUserData.map((user, i) =>
                i === index ? { ...user, isChecked: !user.isChecked } : user
            )
        );
    };

    useEffect(() => {
        const fetchInvitedUserData = async () => {
            console.log(refriId);
            if (refriId) {
                try {
                    // 사용자 데이터 가져오기
                    const data = await inviteUserList(userId, refriId);
                    // 각 사용자 객체에 isChecked 속성 초기화
                    setUserData(data ? data.map(user => ({ ...user, isChecked: false })) : []);
                    console.log(data);
                } catch (error) {
                    // 오류 발생 시 처리
                    console.error("초대된 사용자 데이터를 가져오는 데 실패했습니다", error);
                    setUserData([]);
                }
            }
        };

        fetchInvitedUserData();
    }, [refriId, userId]);

    // 체크된 사용자들의 ID 수집
    const checkedUserIds = userData
        .filter(user => user.isChecked)
        .map(user => user.id);

    // 하나 이상의 체크박스가 선택되었는지 확인
    const isAnyChecked = userData.some(user => user.isChecked);

    return (
        <div>
            <div className="self-stretch flex flex-col items-start w-[342px]">
                {userData.map((user, index) => (
                    <div key={index} className="flex items-center w-full mb-2">
                        <img
                            src={user.photo}
                            alt="사용자 사진"
                            className="w-[34px] h-[34px] mr-3"
                        />
                        <div>
                            <div className="font-normal text-[13px] text-[#767676]">
                                {user.name}
                            </div>
                            <div className="font-semibold text-[13px] text-[#333D4B]">
                                {user.email}
                            </div>
                        </div>
                        <div className="flex items-center ml-auto">
                            <input
                                type="checkbox"
                                checked={user.isChecked || false}
                                onChange={() => handleCheckboxChange(index)}
                                className="w-6 h-6 ml-2 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <UserDeleteButton
                isEnabled={isAnyChecked}
                checkedUserIds={checkedUserIds}
                refriId={refriId}
                nextPath="/addinfo/favorite"
            />
        </div>
    );
};

export default UserSelect;

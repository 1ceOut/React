import { useEffect, useState } from "react";
import UserDeleteButton from "./UserDeleteButton";
import { inviteUserList } from "../../../query/RefriQuery.jsx";

const UserSelect = ({ userId, refriId, onUserSelectChange }) => {
  const [userData, setUserData] = useState([]);

  const handleCheckboxChange = (index) => {
    setUserData((prevUserData) => {
      const updatedUserData = prevUserData.map((user, i) =>
          i === index ? { ...user, isChecked: !user.isChecked } : user
      );

      const checkedUsers = updatedUserData.filter((user) => user.isChecked);
      onUserSelectChange(refriId, checkedUsers); // 부모 컴포넌트에 체크 상태 전달

      return updatedUserData;
    });
  };

  useEffect(() => {
    const fetchInvitedUserData = async () => {
      if (refriId) {
        try {
          const data = await inviteUserList(userId, refriId);
          setUserData(
              data ? data.map((user) => ({ ...user, isChecked: false })) : []
          );
        } catch (error) {
          console.error("초대된 사용자 데이터를 가져오는 데 실패했습니다", error);
          setUserData([]);
        }
      }
    };

    fetchInvitedUserData();
  }, [refriId, userId]);

  return (
      <div>
        {userData.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={"/assets/confirm.png"} alt="confirm" className="mb-3" />
              <p className="text-gray-500 text-center">등록된 유저가 없습니다</p>
            </div>
        ) : (
            <div className="self-stretch flex flex-col items-start w-[332px]">
              {userData.map((user, index) => (
                  <div
                      key={user.id} // 고유 id 사용
                      className="flex items-center justify-between w-full mb-2"
                  >
                    <div className="flex">
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
                    </div>
                    <div className="flex items-center">
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
        )}
      </div>
  );
};

export default UserSelect;

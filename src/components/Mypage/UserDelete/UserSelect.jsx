import { useState } from 'react';
import UserDeleteButton from './UserDeleteButton';

const UserSelect = () => {
    const [isChecked, setIsChecked] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <div className="self-stretch flex items-center justify-between w-[342px] h-[38px]">
                <div className="flex justify-center items-center">
                    <div>
                        <img src="/assets/taeyeon.png" alt="테스트 사진" className="w-[34px] h-[34px] mr-3" />
                    </div>
                    <div>
                        <div className="font-normal text-[13px] text-[#767676]">이장우</div>
                        <div className="font-semibold text-[13px] text-[#333D4B]">00-0000-0000</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-6 h-6 ml-2 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                    />
                </div>
            </div>
            <UserDeleteButton isEnabled={!!isChecked} nextPath=" /addinfo/favorite" />
        </div>
    );
};

export default UserSelect;
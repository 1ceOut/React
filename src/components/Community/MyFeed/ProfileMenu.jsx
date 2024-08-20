import MenuModal from "./MenuModal";
import { useState } from 'react';


const ProfileMenu = () => {

    const [isModalOpen, setIsModalOpen] = useState('');

    const handleMenuClick = () => {
          setIsModalOpen(true);
      };

    return (
        <div className="self-stretch flex justify-between mt-6">
            <div className="self-stretc flex">
                <div className="mr-[14px] mb-8">
                    <img src="/assets/cha.png" alt="차은우" className="w-20 h-20"/>
                </div>
                <div>
                    <div className="font-semibold text-[24px]">
                        박주용
                    </div>
                    <div className="font-normal text-[14px] text-[#767676]">
                        blog.naver.com/dqridlove
                        <br />
                        010-1234-5678
                    </div>
                </div>
            </div>
            <div>
                <img src="/assets/cogwheel.png" alt="톱니바퀴" className="cursor-pointer" onClick={handleMenuClick}/>
                <MenuModal
                    isOpen={isModalOpen}
                />
            </div>
        </div>
    );
};

export default ProfileMenu;
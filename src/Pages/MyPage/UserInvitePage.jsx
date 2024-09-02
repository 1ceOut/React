import { useEffect, useState } from "react";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Header from "../../components/Mypage/UserInvite/Header";
import MyInviteCode from "../../components/Mypage/UserInvite/MyInviteCode";
import InvitedUser from './../../components/Mypage/UserInvite/InvitedUser';
import InviteIcon from './../../components/Mypage/UserInvite/InviteIcon';
import InviteModal from './../../components/Mypage/UserInvite/InviteModal';

const UserInvitePage = () => {
    const [animationClass, setAnimationClass] = useState('animate-slideInUp');
    const [refrigeratorId, setRefrigeratorId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <main className={`${animationClass} flex flex-col h-full w-full px-6 pt-5 pb-2 mx-auto`}>
            <MenuNavigate option="초대코드"/>
            <Header/>
            <MyInviteCode setRefrigeratorId={setRefrigeratorId}/>
            <div className="flex-1 overflow-y-auto pb-20">
                <InvitedUser refrigeratorId={refrigeratorId}/>
            </div>
            <InviteIcon onClick={openModal} />
            <InviteModal isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
};

export default UserInvitePage;

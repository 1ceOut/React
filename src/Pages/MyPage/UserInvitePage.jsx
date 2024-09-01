import { useEffect, useState } from "react";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Header from "../../components/Mypage/UserInvite/Header";
import MyInviteCode from "../../components/Mypage/UserInvite/MyInviteCode";
import InvitedUser from './../../components/Mypage/UserInvite/InvitedUser';
import InviteButton from './../../components/Mypage/UserInvite/InviteButton';

const UserInvitePage = () => {
    const [animationClass, setAnimationClass] = useState('animate-slideInUp');
    const [refrigeratorId, setRefrigeratorId] = useState(null);

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-16 mx-auto w-full max-w-[390px] h-screen`}>
            <MenuNavigate option="초대코드"/>
            <Header/>
            <MyInviteCode setRefrigeratorId={setRefrigeratorId}/>
            <div className="flex-1 w-full overflow-y-auto">
                <InvitedUser refrigeratorId={refrigeratorId}/>
            </div>
            <InviteButton />
        </main>
    );
};

export default UserInvitePage;

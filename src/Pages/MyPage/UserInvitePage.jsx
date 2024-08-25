import MenuNavigate from "../../components/Common/MenuNavigate";
import Header from "../../components/Mypage/UserInvite/Header";
import MyInviteCode from "../../components/Mypage/UserInvite/MyInviteCode";
import InvitedUser from './../../components/Mypage/UserInvite/InvitedUser';
import InviteButton from './../../components/Mypage/UserInvite/InviteButton';


const UserInvitePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option="초대코드"/>
            <Header/>
            <MyInviteCode/>
            <InvitedUser/>
            <InviteButton/>
        </main>
    );
};

export default UserInvitePage;
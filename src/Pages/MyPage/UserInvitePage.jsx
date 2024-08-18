import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import Header from "../../components/Mypage/UserInvite/Header";
import MyInviteCode from "../../components/Mypage/UserInvite/MyInviteCode";
import InvitedUser from './../../components/Mypage/UserInvite/InvitedUser';


const UserInvitePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option="초대코드"/>
            <Header/>
            <MyInviteCode/>
            <HorizontalLine/>
            <InvitedUser/>
        </main>
    );
};

export default UserInvitePage;
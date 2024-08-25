
import MenuNavigate from './../../components/Common/MenuNavigate';
import ProfileInfo from './../../components/Mypage/Profile/ProfileInfo';
import NavigateButton from './../../components/Mypage/Profile/NavigateButton';
import Alert from '../../components/Mypage/Profile/Alert';
import LogoutButton from './../../components/Mypage/Profile/LogoutButton';


const ProfilePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
             <MenuNavigate option={"내 정보"} alertPath="/addinfo/habit"/>
             <ProfileInfo/>
             <Alert/>
             <NavigateButton/>
             <LogoutButton/>
        </main>
    );
}; 

export default ProfilePage;
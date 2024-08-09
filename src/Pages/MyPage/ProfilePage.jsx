
import ProfileInfo from '../../components/Profile/ProfileInfo';
import MenuNavigate from './../../components/Common/MenuNavigate';
import NavigateButton from './../../components/Profile/NavigateButton';

const ProfilePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
             <MenuNavigate option={"내 정보"} alertPath="/addinfo/habit"/>
             <ProfileInfo/>
             <ProfileInfo/>
             <div className='w-[342px] h-px bg-gray-300 mt-[10px] mb-5'></div>
             <NavigateButton/>
        </main>
    );
}; 

export default ProfilePage;
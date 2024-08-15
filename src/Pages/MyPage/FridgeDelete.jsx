
import MenuNavigate from './../../components/Common/MenuNavigate';
import Header from './../../components/Mypage/FridgeDelete/Header';
import FridgeSelect from './../../components/Mypage/FridgeDelete/FridgeSelect';

const FridgeDelete = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen" >
            <MenuNavigate option={"내 정보"} alertPath="/addinfo/habit"/>
            <Header/>
            <FridgeSelect/>
        </main>
    );
};

export default FridgeDelete;
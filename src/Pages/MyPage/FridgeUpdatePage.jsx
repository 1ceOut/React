
import UpdateForm from '../../components/Mypage/FridgeUpdate/UpdateForm';
import MenuNavigate from './../../components/Common/MenuNavigate';
import Header from './../../components/Mypage/FridgeUpdate/Header';

const FridgeUpdatePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"냉장고 수정"} alertPath="/addinfo/habit"/>
            <Header/>
            <UpdateForm/>
        </main>
    );
};

export default FridgeUpdatePage;
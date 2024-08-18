import MenuNavigate from "../../components/Common/MenuNavigate";
import Header from "../../components/Mypage/UserDelete/Header";


const UserDeletePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option="구성원 삭제"/>
            <Header/>
        </main>
    );
};

export default UserDeletePage;
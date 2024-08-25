
import Header from '../../components/AddInfo/Allergic/Header';
import InputForm from './../../components/AddInfo/Allergic/InputForm';
import Navigation from './../../components/AddInfo/Common/Navigation';

const AllergicPage = () => {
    return (
        // 공통 기본 틀
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            {/* 건너뛰기 메뉴 */}
            <Navigation currentStep={3} nextPath="/login/signupcomplete" />
            {/* 질문 내용 */}
            <Header/>
            {/* 답변 입력 */}
            <InputForm/>
        </main>
    );
};

export default AllergicPage;
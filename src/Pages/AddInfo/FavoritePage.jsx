import Navigation from "../../components/AddInfo/Common/Navigation";
import Header from './../../components/AddInfo/Favorite/Header';
import InputForm from './../../components/AddInfo/Favorite/InputForm';


const FavoritePage = () => {
    return ( 
        // 공통 기본 틀
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            {/* 건너뛰기 메뉴 */}
            <Navigation currentStep={2} nextPath="/addinfo/allergic"/>
            {/* 질문 내용 */}
            <Header/>
            {/* 답변 입력 */}
            <InputForm/>
        </main>
    );
};

export default FavoritePage;
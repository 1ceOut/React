import Header from '../../components/AddInfo/Habit/Header';
import HabitSelect from '../../components/AddInfo/Habit/HabitSelect';
import Navigation from '../../components/AddInfo/Common/Navigation';

const HabitPage = () => {
    return (
        // 공통 기본 틀
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            {/* 건너뛰기 메뉴 */}
            <Navigation currentStep={1} nextPath="/addinfo/favorite"/>
            {/* 질문 내용 */}
            <Header/>
            {/* 답변 입력 */}
            <HabitSelect/>
        </main>
    );
};

export default HabitPage;
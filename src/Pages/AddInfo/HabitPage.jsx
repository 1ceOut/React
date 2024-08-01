import Header from '../../components/AddInfo/Habit/Header';
import HabitSelect from '../../components/AddInfo/Habit/HabitSelect';
import Navigation from '../../components/AddInfo/Common/Navigation';

const HabitPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <Navigation currentStep={1} nextPath="/addinfo/favorite"/>
            <Header/>
            <HabitSelect/>
        </main>
    );
};

export default HabitPage;
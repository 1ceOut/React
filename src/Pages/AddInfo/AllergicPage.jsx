
import Header from '../../components/AddInfo/Allergic/Header';
import Next from './../../components/AddInfo/Common/Next';
import InputForm from './../../components/AddInfo/Allergic/InputForm';
import Navigation from '../../components/AddInfo/Allergic/Navigation';

const AllergicPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <Navigation/>
            <Header/>
            <InputForm/>
            <Next/>
        </main>
    );
};

export default AllergicPage;
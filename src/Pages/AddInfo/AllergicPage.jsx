
import Header from '../../components/AddInfo/Allergic/Header';
import InputForm from './../../components/AddInfo/Allergic/InputForm';
import Navigation from '../../components/AddInfo/Allergic/Navigation';

const AllergicPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <Navigation/>
            <Header/>
            <InputForm/>
        </main>
    );
};

export default AllergicPage;
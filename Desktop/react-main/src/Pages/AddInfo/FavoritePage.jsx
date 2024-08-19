import Navigation from "../../components/AddInfo/Common/Navigation";
import Header from './../../components/AddInfo/Favorite/Header';
import InputForm from './../../components/AddInfo/Favorite/InputForm';


const FavoritePage = () => {
    return ( 
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <Navigation currentStep={2} nextPath="/addinfo/allergic"/>
            <Header/>
            <InputForm/>
        </main>
    );
};

export default FavoritePage;
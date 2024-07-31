import Navigation from "../../components/AddInfo/Favorite/Navigation";
import Header from './../../components/AddInfo/Favorite/Header';
import InputForm from './../../components/AddInfo/Favorite/InputForm';


const FavoritePage = () => {
    return ( 
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <Navigation/>
            <Header/>
            <InputForm/>
        </main>
    );
};

export default FavoritePage;
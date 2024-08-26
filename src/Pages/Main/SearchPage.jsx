import { useState, useEffect } from 'react';
import RecentSearch from "../../components/Search/RecentSearch";
import SearchForm from "../../components/Search/SearchForm";
import BarNavigate from './../../components/Common/BarNavigate';


const SearchPage = () => {

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative`}>
            <SearchForm/>
            <RecentSearch/>
            <BarNavigate
                shoppingsrc="/assets/shopping.png"
                homesrc="/assets/home.png"
                searchsrc="/assets/searchselect.png"
            />
        </main>
    );
};

export default SearchPage;
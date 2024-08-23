import RecentSearch from "../../components/Search/RecentSearch";
import SearchForm from "../../components/Search/SearchForm";
import BarNavigate from './../../components/Common/BarNavigate';


const SearchPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
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
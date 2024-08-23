import RecentSearch from "../../components/Search/RecentSearch";
import SearchForm from "../../components/Search/SearchForm";


const SearchPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <SearchForm/>
            <RecentSearch/>
        </main>
    );
};

export default SearchPage;
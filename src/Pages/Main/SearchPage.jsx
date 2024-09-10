import { useState, useEffect } from "react";
import SearchForm from "../../components/Search/SearchForm";
import BarNavigate from "./../../components/Common/BarNavigate";

const SearchPage = () => {
  const [animationClass, setAnimationClass] = useState("animate-slideInUp");
  const [isCentered, setIsCentered] = useState(true);

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  const handleSearch = () => {
    setIsCentered(false);
  };

  return (
    <main
      className={`${animationClass} flex flex-col ${
        isCentered ? "justify-center items-center" : ""
      } px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative bg-[#EBF9FF]`}
    >
      <SearchForm onSearch={handleSearch} />
      <BarNavigate
        shoppingsrc="/assets/shopping.png"
        homesrc="/assets/home.png"
        searchsrc="/assets/searchselect.png"
      />
    </main>
  );
};

export default SearchPage;

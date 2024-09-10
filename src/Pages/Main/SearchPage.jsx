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

  const currentPage = "search";

  return (
    <main
      className={`${animationClass} flex flex-col ${
        isCentered ? "justify-center items-center" : ""
      } pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-auto relative bg-[#EBF9FF]`}
    >
      <SearchForm onSearch={handleSearch} />
      <BarNavigate isActive={currentPage} />
    </main>
  );
};

export default SearchPage;

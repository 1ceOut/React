import { useState } from "react";
import { fetchRecipesByIngredient } from "../../../query/FoodListQuery.jsx";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const RecipeSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await fetchRecipesByIngredient(searchQuery);
      if (results.length === 0) {
        setError("해당 재료에 해당하는 레시피 정보가 없습니다.");
      }
      setRecipes(results);
    } catch (err) {
      setError("레시피를 가져오는 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // <br> 태그를 줄바꿈(\n)으로 변환하는 함수
  const formatTextWithLineBreaks = (text) => {
    return text.replace(/<br\s*\/?>/gi, "\n");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div
        className="fixed top-[30px] bottom-[100px] left-1/2 transform -translate-x-1/2 w-full max-w-lg p-4 bg-white shadow-lg rounded-lg overflow-y-auto z-50"
        style={{ maxHeight: "calc(100vh - 130px)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">추천 레시피</h2>
          <div
            className="cursor-pointer w-6 h-6 flex justify-center items-center"
            onClick={onClose}
          >
            <IoClose size="w-5 h-5" />
          </div>
        </div>
        <div className="rounded border w-full flex justify-center items-center h-12 p-4">
          <IoSearch onClick={handleSearch} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색"
            className="w-full outline-none ml-2"
          />
        </div>

        {loading && <p className="text-gray-500 mt-4">로딩 중...</p>}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-4">
          {recipes.length > 0
            ? recipes.map((recipe) => (
                <div key={recipe.RCP_SEQ} className="mb-4">
                  <h3 className="text-lg font-semibold">{recipe.RCP_NM}</h3>
                  <img
                    src={recipe.ATT_FILE_NO_MAIN}
                    alt={recipe.RCP_NM}
                    className="w-full h-auto mt-2 rounded"
                  />
                  <p className="mt-2 whitespace-pre-line">
                    {formatTextWithLineBreaks(recipe.RCP_PARTS_DTLS)}
                  </p>
                  <p className="mt-2 text-gray-600 whitespace-pre-line">
                    {formatTextWithLineBreaks(recipe.RCP_NA_TIP)}
                  </p>
                  <div className="mt-2">
                    <h4 className="font-semibold">조리법</h4>
                    {recipe.MANUAL01 && <p>{recipe.MANUAL01}</p>}
                    {recipe.MANUAL02 && <p>{recipe.MANUAL02}</p>}
                    {recipe.MANUAL03 && <p>{recipe.MANUAL03}</p>}
                    {/* 추가적인 조리법은 필요에 따라 여기에 추가 */}
                  </div>
                  {recipe.MANUAL_IMG01 && (
                    <img
                      src={recipe.MANUAL_IMG01}
                      alt="조리법 이미지 1"
                      className="w-full h-auto mt-2 rounded"
                    />
                  )}
                  {recipe.MANUAL_IMG02 && (
                    <img
                      src={recipe.MANUAL_IMG02}
                      alt="조리법 이미지 2"
                      className="w-full h-auto mt-2 rounded"
                    />
                  )}
                  {recipe.MANUAL_IMG03 && (
                    <img
                      src={recipe.MANUAL_IMG03}
                      alt="조리법 이미지 3"
                      className="w-full h-auto mt-2 rounded"
                    />
                  )}
                </div>
              ))
            : !loading && (
                <p className="text-gray-500 mt-4">
                  레시피 재료를 검색 해주세요.
                </p>
              )}
        </div>
      </div>
    </>
  );
};

export default RecipeSearchModal;

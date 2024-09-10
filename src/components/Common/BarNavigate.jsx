import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FaBagShopping } from "react-icons/fa6";

const BarNavigate = ({ isActive }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-evenly items-center border-x-0 w-[390px] border-t-2 rounded-t-2xl bg-white fixed bottom-0 h-20">
      <div className="flex flex-col justify-center items-center w-1/3">
        <FaBagShopping
          className={`cursor-pointer w-7 h-7 ${
            isActive === "shop" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleNavigation("/Shop/home")}
        />
      </div>
      <div className="flex flex-col justify-center items-center w-1/3">
        <GoHomeFill
          className={`cursor-pointer w-7 h-7 ${
            isActive === "home" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleNavigation("/")}
        />
      </div>
      <div className="flex flex-col justify-center items-center w-1/3">
        <FaSearch
          className={`cursor-pointer w-7 h-7 ${
            isActive === "search" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleNavigation("/search/search")}
        />
      </div>
    </div>
  );
};

BarNavigate.propTypes = {
  isActive: PropTypes.string.isRequired,
};

export default BarNavigate;

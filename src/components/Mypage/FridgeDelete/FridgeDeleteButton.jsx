
import { useNavigate } from 'react-router-dom';

const FridgeDeleteButton = (isEnabled, nextPath) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
      if (isEnabled) {
        navigate(nextPath);
      }
    };
  
    return (
      <div
        className={`flex text-[#868686] rounded-xl self-stretch absolute justify-center items-center w-[342px] h-14 cursor-pointer bottom-[54px] ${
          isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
        }`}
        onClick={isEnabled ? handleSubmit : null}
      >
        다음
      </div>
    );
};

export default FridgeDeleteButton;
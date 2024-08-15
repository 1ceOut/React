
import { useNavigate } from 'react-router-dom';

const CompleteButton = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
      navigate("/");
  };

    return (
            <div
              className={`flex text-white rounded-xl self-stretch absolute justify-center items-center w-[342px] h-14 cursor-pointer bottom-[54px] bg-blue-500`}
              onClick={handleSubmit}
            >
              완료
            </div>
    );
};

export default CompleteButton;
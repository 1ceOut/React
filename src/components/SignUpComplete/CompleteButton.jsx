
import { useNavigate } from 'react-router-dom';
import {addinfo} from "../../query/LoginQuery.jsx";
import useAddInfo from "../../store/useAddInfo.js";
import useUserStore from "../../store/useUserStore.js";

const CompleteButton = () => {
  const navigate = useNavigate();
    const {habit, favorite,weight,height} = useAddInfo();
    const {userId,AddinfoSuccessStatus} = useUserStore();

  const handleSubmit = () => {
      addinfo({userId,habit, favorite,weight,height});
      AddinfoSuccessStatus();
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
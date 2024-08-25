import {Logout_Action} from "../../../query/LoginQuery.jsx";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../../store/useUserStore.js";

const LogoutButton = () => {
    const navigate = useNavigate();
    const {LogoutStatus} = useUserStore();
    const ClearUser = useUserStore.persist.clearStorage;

    const LogoutAction = () => {
        Logout_Action().then((response) => {
            if (response.status === 200){
                LogoutStatus();
                ClearUser();
                navigate("/login")
            }
        });
    }
    return (
        <div className="w-[342px] h-[56px] bottom-[54px] absolute bg-red-600 rounded-xl text-white flex justify-center items-center hover:red-800 cursor-pointer" onClick={LogoutAction}>
            로그아웃
        </div>
    );
};

export default LogoutButton;
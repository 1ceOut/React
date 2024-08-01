import NavigateButton from "../../components/Common/NavigateButton";
import DetailButton from './../../components/Common/DetailButton';


const FridgeManagePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <NavigateButton option={"음식 추가하기"}/>
            <DetailButton foodCategory={"meat"} expireDate={"2024.08.11"} option={"[브룩클린688] 호주산 토시살 구이용 냉장고기"}/>
        </main>
    );
};

export default FridgeManagePage; 
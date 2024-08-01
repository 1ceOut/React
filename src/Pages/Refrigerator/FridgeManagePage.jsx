import DetailButton from './../../components/Common/DetailButton';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';


const FridgeManagePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit" profilePath="/addinfo/habit"/>
            <FridgeSelect/>
            <CreateButton option={"음식 추가하기"} nextPath={"/addinfo/habit "}/>
            <DetailButton foodCategory={"meat"} expireDate={"2024.08.11"} option={"[브룩클린688] 호주산 토시살 구이용 냉장고기"}/>
            <SearchForm/>
        </main>
    );
};

export default FridgeManagePage; 
import DetailButton from './../../components/Common/DetailButton';
import CreateButton from './../../components/Common/CreateButton';
import MenuNavigate from './../../components/Common/MenuNavigate';
import SearchForm from '../../components/Refrigerator/Common/SearchForm';
import FridgeSelect from '../../components/Refrigerator/FridgeManage/FridgeSelect';
import CategoryFood from './../../components/Refrigerator/FridgeManage/CategoryFood';


const FridgeManagePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit"/>
            <FridgeSelect/>
            <div className="self-stretch pt-[10px]">
                <CreateButton option={"음식 추가하기"} nextPath={"/addinfo/habit "}/>
            </div>
            <div className="self-stretch pt-8">
                <SearchForm/>
            </div> 
            <div className="self-stretch pt-5">
                <CategoryFood/>
            </div>
            <DetailButton foodCategory={"meat"} expireDate={"2024.08.24"} option={"[브룩클린688] 호주산 토시살 구이용 냉장고기"}/>
        </main>
    );
};

export default FridgeManagePage;
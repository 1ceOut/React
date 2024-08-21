import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";
import DetailMainContent from "../../components/Shopping/DetailMainContent";

const ShoppingDetail=()=>{
    return(
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"식재료 추천"} alertPath="/addinfo/habit" />
            <DetailMainContent/>
            <BarNavigate 
                shoppingsrc="/assets/shoppingselect.png"
                homesrc="/assets/home.png"
                searchsrc="/assets/search.png"
            />
        </main>
    )
}
export default ShoppingDetail;
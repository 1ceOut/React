import MenuNavigate from "../../components/Common/MenuNavigate";

const ShoppingDetail=()=>{
    return(
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
        <MenuNavigate option={"식재료 추천"} alertPath="/addinfo/habit" />

        </main>
    )
}
export default ShoppingDetail;
import MenuNavigate from "../../components/Common/MenuNavigate";

const ShoppingHome=()=>{
    return(
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
        <MenuNavigate option={"쇼핑"} alertPath="/addinfo/habit" />

        </main>
    )
}
export default ShoppingHome;
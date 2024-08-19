import MenuNavigate from "../../../components/Common/MenuNavigate";

const FoodDetail=()=>{
    return(
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"상품 상세"} alertPath="/addinfo/habit" />
        <div style={{width:342, height:60, top:126,left:24}}>
        <div className="flex items-center justify-center mr-3 w-[60px] h-[60px] mt-[20px] rounded-lg bg-[#F5F5F5]">
           <img style={{width:40,height:40}} src="/assets/milkcow.png" alt=""/>
        </div>
        <div>
            <div style={{width:114,height:17,top:140,left:96}}>
                <p style={{fontWeight:400,fontSize:14}}>유제품.동물성.식물성</p>
            </div>
        </div>
        </div>
        </main>
    )
}
export default FoodDetail;
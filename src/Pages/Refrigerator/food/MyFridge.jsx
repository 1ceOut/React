import MenuNavigate from "../../../components/Common/MenuNavigate";
import FridgeSelect from "../../../components/Refrigerator/FridgeManage/FridgeSelect";

const MyFridge=()=>{
    return(
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"나의 냉장고"} alertPath="/addinfo/habit" />
            <div style={{width:342,height:111,fontWeight:600,fontSize:28,marginTop:24}}>
                아직 등록된 냉장고가<br/>
                없어요
                <div style={{width:342,height:21,fontWeight:500,fontSize:15,color:'#767676',marginTop:14}}>
                냉장고를 등록해 음식을 편리하게 관리해보세요.
                </div>
            </div>
            <img style={{width:240,height:240,marginTop:60}} src="/assets/refridge.png"/>
            <div style={{
                width: 342, 
                height: 56, 
                borderRadius: 12, 
                border: "1px solid #E1E1E1", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                marginTop:32
            }}>
                <p style={{ fontWeight: 500, fontSize: 16 }}>냉장고 등록하기</p>
            </div>
        </main>
    )
}
export default MyFridge;
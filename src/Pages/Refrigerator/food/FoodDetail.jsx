import MenuNavigate from "../../../components/Common/MenuNavigate";

const FoodDetail = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"상품 상세"} alertPath="/addinfo/habit" />
            <div style={{
                position: 'relative',
                width: '342px',
                height: '60px',
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <img src="/assets/milkcow.png" alt="" style={{
                        width: '40px',
                        height: '40px',
                        marginRight: '10px'
                    }} />
                    <div>
                        <div style={{
                            width:114,
                            height:17,
                            top:140,
                            left:96,
                            fontSize:14,
                            fontWeight:400,
                            color:'#767676'
                        }}>유제품.동물성.우유</div>
                        <div style={{
                            fontSize:18,
                            marginTop:8
                        }}>서울우유 플레인 요거트 순수..</div>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    fontSize: '14px',
                    cursor: 'pointer'
                }}>
                    쓰레기통
                </div>
            </div>
        </main>
    );
};

export default FoodDetail;

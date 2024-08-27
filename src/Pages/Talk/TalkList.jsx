import { useNavigate } from 'react-router-dom';
import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";


const Talk = () => {
    const navigate = useNavigate();

    // 클릭 이벤트 핸들러
    const handleClick = () => {
        navigate("/Talk/TalkDetail");  // 이동할 페이지 경로
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"채팅방"} alertPath="/addinfo/habit" />

            <div 
                style={{ marginTop: 20, width: 342, height: 55, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
                <div style={{ width: 342, height: 44, display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: 24, height: 24 }}>
                        <img style={{ width: 23, height: 23 }} src="/assets/alert_icon.png" alt="Alert Icon" />
                    </div>
                    <p style={{ flexGrow: 1, fontWeight: 500, fontSize: 15, margin: '0 16px' }}>
                        고기 유통기한이 2일 남았어요
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', width: 24, height: 24 }}>
                        <img style={{ width: 23, height: 23 }} src="/assets/right.png" alt="Right Arrow" />
                    </div>
                </div>
                <HorizontalLine />
            </div>

            {/* 일반 냉장고 채팅 */}
            <div 
                style={{ marginTop: 32, width: 342, height: 40, display: 'flex', alignItems: 'center', padding: '0 4px', cursor: 'pointer' }} 
                onClick={() => handleClick()}
            >
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/assets/people.png" alt="People" style={{ width: '100%', height: '100%' }} />
                </div>

                <div style={{ flex: 1, marginLeft: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '50%' }}>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>일반 냉장고</p>
                            <p style={{ display: 'flex', marginLeft: 8, fontWeight: 600, fontSize: 13, color: '#767676', justifyContent: "center", alignItems: "center" }}>4</p>
                        </div>
                        <p style={{ fontWeight: 400, fontSize: 13, color: '#767676', textAlign: 'right' }}>오전 10:11</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '50%' }}>
                        <p style={{ width: 290, height: 16, margin: 0, fontWeight: 400, fontSize: 12.7, color: '#767676', flex: 1 }}>
                            냉장고에 고기 유통기한 2일 남았데요 오늘 저녁은 고기먹..
                        </p>
                    </div>
                </div>
            </div>

            {/* 김치 냉장고 채팅 아이템 */}
            <div 
                style={{ marginTop: 24, width: 342, height: 40, display: 'flex', alignItems: 'center', padding: '0 4px', cursor: 'pointer' }} 
                onClick={() => handleClick()}
            >
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/assets/people.png" alt="People" style={{ width: '100%', height: '100%' }} />
                </div>

                <div style={{ flex: 1, marginLeft: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '50%' }}>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>김치 냉장고</p>
                        </div>
                        <p style={{ fontWeight: 400, fontSize: 13, color: '#767676', textAlign: 'right' }}>오전 11:00</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '50%' }}>
                        <p style={{ width: 290, height: 16, margin: 0, fontWeight: 400, fontSize: 12.7, color: '#767676', flex: 1 }}>
                            오늘 저녁에 뭐 먹어요?
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Talk;

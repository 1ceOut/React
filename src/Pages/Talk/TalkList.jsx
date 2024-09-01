import { useNavigate } from 'react-router-dom';
import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import useUserStore from "../../store/useUserStore.js";
import useFridgeOptions from "../../query/RefriQuery.jsx";

const Talk = () => {
    const navigate = useNavigate();
    const {userId}=useUserStore();

    // 클릭 이벤트 핸들러
    const handleClick = (refrigeratorName, refrigeratorId) => {
        console.log("refrigeratorId+"+JSON.stringify(refrigeratorId));
        navigate(`/Talk/TalkDetail?name=${refrigeratorName}&id=${refrigeratorId}`);
    };

    const { data, error, isLoading } = useFridgeOptions(userId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // 냉장고 정보 사용
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"채팅방"} alertPath="/addinfo/habit"/>
            <div style={{width: 342, height: 44, display: 'flex', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', width: 24, height: 24}}>
                    <img style={{width: 23, height: 23}} src="/assets/alert_icon.png" alt="Alert Icon"/>
                </div>
                <p style={{flexGrow: 1, fontWeight: 500, fontSize: 15, margin: '0 16px'}}>
                    {data?.length > 0 ? `${data[0].name}의 유통기한이 2일 남았어요` : '유통기한 정보가 없습니다'}
                </p>
                <div style={{display: 'flex', alignItems: 'center', width: 24, height: 24}}>
                    <img style={{width: 23, height: 23}} src="/assets/right.png" alt="Right Arrow"/>
                </div>
            </div>
            <HorizontalLine/>
            <div>
                {data?.map(refri => (
                        <div key={refri.refrigerator_id}
                            style={{
                                marginTop: 32,
                                width: 342,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 4px',
                                cursor: 'pointer'
                            }} onClick={() => handleClick(refri.refrigeratorName, refri.refrigerator_id)}>
                            <div style={{
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                                <img src="/assets/people.png" alt="People" style={{width: '100%', height: '100%'}}/>
                            </div>

                            <div style={{
                                flex: 1,
                                marginLeft: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%'
                            }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: '50%'
                                    }}>
                                    <div style={{display: 'flex'}}>
                                        <p style={{fontWeight: 600, fontSize: 15}}>{refri.refrigeratorName}</p>
                                        <p style={{
                                            display: 'flex',
                                            marginLeft: 8,
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: '#767676',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>4</p>
                                    </div>
                                    <p style={{fontWeight: 400, fontSize: 13, color: '#767676', textAlign: 'right'}}>오전
                                        10:11</p>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', height: '50%'}}>
                                    <p style={{
                                        width: 290,
                                        height: 16,
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: 12.7,
                                        color: '#767676',
                                        flex: 1
                                    }}>
                                        이 부분을 채팅의 마지막 채팅내용을 넣고싶어
                                    </p>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </main>
    );
};

export default Talk;
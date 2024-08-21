import HorizontalLine from "../../Common/HorizontalLine";


const Alert = () => {
    return (
        <div>
            <div className="w-[342px] h-[44px] mt-8">
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <img src="/assets/alert_icon.png" alt="알림" className="mr-3"/>
                        고기 유통기한이 2일남았어요
                    </div>
                    <div>
                        <img src="/assets/right_arrow.png" alt="오른쪽 방향" />
                    </div>
                </div>
            </div>
            <div className="mt-[10px] mb-[20px]">
                <HorizontalLine/>
            </div>
        </div>
    );
};

export default Alert;
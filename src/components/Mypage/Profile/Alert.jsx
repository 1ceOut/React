import HorizontalLine from "../../Common/HorizontalLine";
import useUserStore from "../../../store/useUserStore"; // useUserStore 불러오기
import { useEffect } from "react";

const Alert = () => {
    const { foodExpirationNotifications } = useUserStore(); // 유통기한 알림 가져오기

    return (
        <div>
            {foodExpirationNotifications.length > 0 ? (
                foodExpirationNotifications.map((notification, index) => (
                    <div key={index}>
                        <div className="w-[342px] h-[44px] mt-8">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                                    D-{notification.message} {/* 알림 메시지 출력 */}
                                </div>
                                <div>
                                    <img src="/assets/right_arrow.png" alt="오른쪽 방향" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] mb-[20px]">
                            <HorizontalLine />
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-[342px] h-[44px] mt-8">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                            유통기한 임박 알림이 없습니다
                        </div>
                    </div>
                    <div className="mt-[10px] mb-[20px]">
                        <HorizontalLine />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alert;

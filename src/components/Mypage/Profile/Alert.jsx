import HorizontalLine from "../../Common/HorizontalLine";
import useUserStore from "../../../store/useUserStore"; // useUserStore 불러오기
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Alert = () => {
  const { foodExpirationNotifications } = useUserStore(); // 유통기한 알림 가져오기
  const [expiredOrImminentCount, setExpiredOrImminentCount] = useState(0); // 임박하거나 지난 식재료 개수
  const navigate = useNavigate();

  // 유통기한이 임박했거나 지난 식재료 개수 계산
  useEffect(() => {
    const countExpiredOrImminent = () => {
      const count = foodExpirationNotifications.reduce((acc, notification) => {
        if (
          notification.alerttype === "유통기한 임박" ||
          notification.alerttype === "유통기한 경과"
        ) {
          // 유통기한 임박 또는 경과 상태일 경우 카운트 증가
          return acc + 1;
        }
        return acc;
      }, 0);

      setExpiredOrImminentCount(count); // 카운트 설정
    };

    if (foodExpirationNotifications.length > 0) {
      countExpiredOrImminent();
    }
  }, [foodExpirationNotifications]);

  const handleClick = () => {
    navigate("/alert/alert");
  };

  return (
    <div>
      {expiredOrImminentCount > 0 ? (
        <div>
          <div className="w-[342px] h-[44px] mt-8">
            <div className="flex justify-between items-center">
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={handleClick}
              >
                <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                {/* X개의 유통기한이 임박하거나 지난 식재료 출력 */}
                {`${expiredOrImminentCount}개의 유통기한이 임박하거나 지난 식재료가 있습니다`}
              </div>
            </div>
          </div>
          <div className="mt-[10px] mb-[20px]">
            <HorizontalLine />
          </div>
        </div>
      ) : (
        <div className="w-[342px] h-[44px] mt-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
              <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
              유통기한 임박 또는 경과한 알림이 없습니다
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

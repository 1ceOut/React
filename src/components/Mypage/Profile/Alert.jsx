import HorizontalLine from "../../Common/HorizontalLine";
import useUserStore from "../../../store/useUserStore"; // useUserStore 불러오기
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 불러오기

const Alert = () => {
  const { foodExpirationNotifications } = useUserStore(); // 유통기한 알림 가져오기
  const [expiredOrImminentCount, setExpiredOrImminentCount] = useState(0); // 임박하거나 지난 식재료 개수
  const navigate = useNavigate(); // useNavigate 훅

  // Helper function to format date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 오늘 날짜 계산
  const today = formatDate(new Date());

  // 유통기한이 임박했거나 지난 오늘의 식재료 개수 계산
  useEffect(() => {
    const countExpiredOrImminentToday = () => {
      const count = foodExpirationNotifications.reduce((acc, notification) => {
        // notification.date가 오늘인지 확인
        const notificationDate = formatDate(notification.alertday); // 알림의 날짜

        if (
          (notification.alerttype === "유통기한 임박" ||
            notification.alerttype === "유통기한 경과") &&
          notificationDate === today // 오늘 알림만 카운트
        ) {
          return acc + 1; // 오늘의 알림이 유통기한 임박 또는 경과일 때 카운트 증가
        }
        return acc;
      }, 0);

      setExpiredOrImminentCount(count); // 카운트 설정
    };

    if (foodExpirationNotifications.length > 0) {
      countExpiredOrImminentToday();
    }
  }, [foodExpirationNotifications, today]);

  // 클릭 시 /alert/alert 경로로 이동하는 함수
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
                onClick={handleClick} // 클릭 이벤트
              >
                <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                {/* X개의 유통기한이 임박하거나 지난 오늘의 식재료 출력 */}
                {`${expiredOrImminentCount}개의 유통기한이 임박하거나 지난 식재료가 오늘 있습니다`}
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
              오늘 유통기한 임박 또는 경과한 알림이 없습니다
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

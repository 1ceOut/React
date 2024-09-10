import HorizontalLine from "../../Common/HorizontalLine";
import useUserStore from "../../../store/useUserStore"; // useUserStore 불러오기
import { useEffect, useState } from "react";
import axios from "axios";

const Alert = () => {
    const { foodExpirationNotifications } = useUserStore(); // 유통기한 알림 가져오기
    const [foodInfoMap, setFoodInfoMap] = useState({}); // 음식 정보를 저장할 상태

    // 음식 UUID를 기반으로 음식 정보를 API로부터 가져옴
    useEffect(() => {
        const fetchFoodInfos = async () => {
            const promises = foodExpirationNotifications.map(async (notification) => {
                if (notification.alerttype === '유통기한 임박') {
                    try {
                        const response = await axios.get(
                            `https://api.icebuckwheat.kro.kr/api/food/find/FoodName`,
                            {
                                params: {
                                    food_id: notification.sender, // 음식 UUID로 요청
                                },
                            }
                        );
                        const foodData = response.data[0]; 
                        return { sender: notification.sender, 
                            foodInfo: {
                                productName: foodData.productName, // productName 가져오기
                                lcategory: foodData.lcategory // lcategory 가져오기
                            } }; // API 응답에서 첫 번째 데이터 사용
                    } catch (error) {
                        console.error(`Failed to fetch food info for food_id: ${notification.sender}`, error);
                        return { sender: notification.sender, foodInfo: null };
                    }
                }
                return null;
            });
            const foodInfoArray = await Promise.all(promises);
            const newFoodInfoMap = foodInfoArray.reduce((map, item) => {
                if (item) {
                    map[item.sender] = item.foodInfo; // 음식 정보를 sender UUID와 매핑
                }
                return map;
            }, {});
            setFoodInfoMap(newFoodInfoMap); // 상태 업데이트
        };

        if (foodExpirationNotifications.some(notification => notification.alerttype === '유통기한 임박')) {
            fetchFoodInfos();
        }
    }, [foodExpirationNotifications]);

    return (
        <div>
            {foodExpirationNotifications.length > 0 ? (
                foodExpirationNotifications.map((notification, index) => (
                    <div key={index}>
                        <div className="w-[342px] h-[44px] mt-8">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                                    <img src="/assets/alert_icon.png" alt="알림" className="mr-3" />
                                    D-{notification.memo} {/* 알림 메시지 출력 */}
                                    &nbsp;
                                    {/* 받아온 음식 정보 출력 */}
                                    {foodInfoMap[notification.sender]?.productName || "상품 정보 없음"}
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

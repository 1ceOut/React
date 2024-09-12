import React, { useEffect, useState } from "react";
import { useDetailPost } from "../../../query/FeedQuery";
import useUserStore from "../../../store/useUserStore.js"; // useUserStore import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // 날짜 형식화를 위해 사용
import { getCategoryImage } from "../../Refrigerator/FridgeManage/CategoryImage.jsx"; // 카테고리 이미지 불러오기
import { SearchAllFood } from "../../../query/FoodListQuery.jsx";
import { IoClose } from "react-icons/io5";

const Body = () => {
  const {
    notifications = [],
    setNotifications,
    setHasUnread,
    userId,
    userName,
  } = useUserStore();
  const navigate = useNavigate();
  const [userInfoMap, setUserInfoMap] = useState({}); // 사용자 정보를 저장할 상태
  const [refrigeratorNameMap, setRefrigeratorNameMap] = useState({}); // 냉장고 이름을 저장할 상태
  const [foodInfoMap, setFoodInfoMap] = useState({});
  const [response, setResponse] = useState([]);

  // 알림의 sender 값을 기반으로 사용자 정보를 API로부터 가져옴
  useEffect(() => {
    const fetchUserInfos = async () => {
      const promises = notifications.map(async (notification) => {
        try {
          if (notification.alerttype === "유통기한 임박") {
            // 유통기한 임박일 경우 사용자 정보 API 호출을 건너뜀
            return { sender: notification.sender, userInfo: null };
          } else {
            const decodedSender = decodeURIComponent(notification.sender);
            const response = await axios.get(
              `https://api.icebuckwheat.kro.kr/api/login/getuser`,
              {
                params: {
                  user_id: decodedSender,
                },
              }
            );
            return { sender: notification.sender, userInfo: response.data };
          }
        } catch (error) {
          console.error(
            `Failed to fetch data for sender: ${notification.sender}`,
            error
          );
          return { sender: notification.sender, userInfo: null };
        }
      });

      const userInfoArray = await Promise.all(promises);
      const newUserInfoMap = userInfoArray.reduce(
        (map, { sender, userInfo }) => {
          map[sender] = userInfo;
          return map;
        },
        {}
      );

      setUserInfoMap(newUserInfoMap);
    };

    if (notifications.length > 0) {
      fetchUserInfos();
    }
  }, [notifications]);

  //알림의 senderrefri 값을 기반으로 냉장고 이름을 API로부터 가져옴
  useEffect(() => {
    const fetchRefrigeratorNames = async () => {
      const promises = notifications.map(async (notification) => {
        if (!notification.senderrefri) {
          //console.error(`Notification ${notification.alert_id} does not have senderrefri`);
          return { senderrefri: null, refriName: null };
        }
        try {
          //console.log("notification.senderrefri : ", notification.senderrefri);
          const response = await axios.get(
            `https://api.icebuckwheat.kro.kr/api/food/find/refriName`,
            {
              params: {
                refrigerator_id: notification.senderrefri, // notification.senderrefri 값으로 냉장고 이름 요청
              },
            }
          );
          return {
            senderrefri: notification.senderrefri,
            refriName: response.data,
          };
        } catch (error) {
          console.error(
            `Failed to fetch refrigerator name for senderrefri: ${notification.senderrefri}`,
            error
          );
          return { senderrefri: notification.senderrefri, refriName: null };
        }
      });
      const refrigeratorNameArray = await Promise.all(promises);
      const newRefrigeratorNameMap = refrigeratorNameArray.reduce(
        (map, { senderrefri, refriName }) => {
          map[senderrefri] = refriName; // 냉장고 ID를 키로 하고 이름을 값으로 저장
          return map;
        },
        {}
      );
      setRefrigeratorNameMap(newRefrigeratorNameMap); // 상태 업데이트
    };
    if (notifications.length > 0) {
      fetchRefrigeratorNames();
    }
  }, [notifications]);

  // 음식 UUID를 기반으로 음식 정보를 API로부터 가져옴
  useEffect(() => {
    const fetchFoodInfos = async () => {
      const promises = notifications.map(async (notification) => {
        if (notification.alerttype === "유통기한 임박") {
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
            return {
              sender: notification.sender,
              foodInfo: {
                productName: foodData.productName, // productName 가져오기
                lcategory: foodData.lcategory, // lcategory 가져오기
              },
            }; // API 응답에서 첫 번째 데이터 사용
          } catch (error) {
            console.error(
              `Failed to fetch food info for food_id: ${notification.sender}`,
              error
            );
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
    if (
      notifications.some(
        (notification) => notification.alerttype === "유통기한 임박"
      )
    ) {
      fetchFoodInfos();
    }
  }, [notifications]);

  const updateHasUnread = (updatedNotifications) => {
    const hasUnread = updatedNotifications.some(
      (notification) => !notification.alertcheck
    );
    setHasUnread(hasUnread);
  };

  const handleMarkAsRead = async (
    alert_id,
    recipeposting,
    alerttype,
    sender,
    userName
  ) => {
    const notification = notifications.find((n) => n.alert_id === alert_id);

    // 이미 읽음 처리된 알림이면 읽기 처리하지 않음
    if (notification && notification.alertcheck) {
      if (
        alerttype === "포스팅 작성" ||
        alerttype === "좋아요" ||
        alerttype === "댓글 작성"
      ) {
        // 포스팅 상세 페이지로 이동
        navigate(`/community/feeddetail/${recipeposting}`);
      } else if (alerttype === "구독") {
        // 구독 관련 페이지로 이동
        navigate(`/community/myfeed/${sender}`);
      } else if (
        alerttype === "냉장고 생성" ||
        alerttype === "냉장고 수정" ||
        alerttype === "냉장고 등록"
      ) {
        console.log(alerttype);
        // 냉장고 관리 페이지로 이동
        navigate("/fridge/fridgemanage");
      } else if (alerttype === "방송 시작") {
        // 방송 룸으로 이동
        navigate(`/liveroom/${encodeURIComponent(sender)}/${userName}`);
      } else if (alerttype === "유통기한 임박") {
        const foodInfo = foodInfoMap[sender]; // 음식 정보 매핑
        const productName = foodInfo.productName;
        const response = await SearchAllFood(userId, productName);
        setResponse(response);
        //console.log("response : ", response);
        const foodDetail = response[0];
        //console.log("foodDetail : ", foodDetail);
        navigate(`/Refrigerator/food/FoodDetail`, {
          state: {
            id: foodDetail.id,
            count: foodDetail.count,
            createdDate: foodDetail.createdDate,
            expiryDate: foodDetail.expiryDate,
            lcategory: foodDetail.lcategory,
            productType: foodDetail.productType,
            refrigeratorName: foodDetail.refrigeratorName,
            scategory: foodDetail.scategory,
            barcode: foodDetail.barcode,
          },
        });
      }
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ALERT_IP}/markAsRead/${alert_id}`
      );
      if (response.status === 200) {
        const updatedNotifications = notifications.map((notification) =>
          notification.alert_id === alert_id
            ? { ...notification, alertcheck: true }
            : notification
        );
        setNotifications(updatedNotifications);
        updateHasUnread(updatedNotifications);

        if (
          alerttype === "포스팅 작성" ||
          alerttype === "좋아요" ||
          alerttype === "댓글 작성"
        ) {
          // 포스팅 상세 페이지로 이동
          navigate(`/community/feeddetail/${recipeposting}`);
        } else if (alerttype === "구독") {
          // 구독 관련 페이지로 이동
          navigate(`/community/myfeed/${sender}`);
        } else if (
          alerttype === "냉장고 생성" ||
          alerttype === "냉장고 수정" ||
          alerttype === "냉장고 등록"
        ) {
          // 냉장고 관리 페이지로 이동
          navigate(`/fridge/fridgemanage/`);
        } else if (alerttype === "방송 시작") {
          // 방송 룸으로 이동
          navigate(`/liveroom/${encodeURIComponent(sender)}/${userName}`);
        } else if (alerttype === "유통기한 임박") {
          const foodInfo = foodInfoMap[sender]; // 음식 정보 매핑
          const productName = foodInfo.productName;
          const response = await SearchAllFood(userId, productName);
          setResponse(response);
          //console.log("response : ", response);
          const foodDetail = response[0];
          //console.log("foodDetail : ", foodDetail);
          navigate(`/Refrigerator/food/FoodDetail`, {
            state: {
              id: foodDetail.id,
              count: foodDetail.count,
              createdDate: foodDetail.createdDate,
              expiryDate: foodDetail.expiryDate,
              lcategory: foodDetail.lcategory,
              productType: foodDetail.productType,
              refrigeratorName: foodDetail.refrigeratorName,
              scategory: foodDetail.scategory,
              barcode: foodDetail.barcode,
            },
          });
        }
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDeleteNotification = async (alert_id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_ALERT_IP}/delete/${alert_id}`
      );
      if (response.status === 200) {
        const updatedNotifications = notifications.filter(
          (notification) => notification.alert_id !== alert_id
        );
        setNotifications(updatedNotifications);
        updateHasUnread(updatedNotifications);
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // 날짜별 알림 모두 삭제하는 함수
  const handleDeleteAllNotificationsForDate = async (date) => {
    const notificationsForDate = groupedNotifications[date];
    const deletePromises = notificationsForDate.map((notification) =>
      axios.delete(
        `${import.meta.env.VITE_ALERT_IP}/delete/${notification.alert_id}`
      )
    );
    try {
      await Promise.all(deletePromises);
      const updatedNotifications = notifications.filter(
        (notification) =>
          format(new Date(notification.alertday), "yyyy.MM.dd") !== date
      );
      setNotifications(updatedNotifications);
      updateHasUnread(updatedNotifications);
    } catch (error) {
      console.error("Failed to delete notifications for the date:", error);
    }
  };

  //알림 전부 지워지면 자동 이동
  useEffect(() => {
    if (notifications.length === 0) {
      navigate("/alert/noalert");
    }
  }, [notifications, navigate]);

  const renderNotificationItem = (notification) => {
    let statusText = "";
    let titleText = "";
    const userInfo = userInfoMap[notification.sender]; // 사용자 정보 매핑
    //const userName = userInfo ? userInfo.name : notification.sender; // 사용자 이름 또는 sender ID
    const senderName = 
    let imgSrc = ""; // 사용자 이미지 또는 기본 이미지
    const refriName = refrigeratorNameMap[notification.senderrefri]; // 냉장고 이름 매핑
    const foodInfo = foodInfoMap[notification.sender]; // 음식 정보 매핑

    switch (notification.alerttype) {
      case "냉장고 생성":
        imgSrc = "/assets/refridge.png";
        statusText = "냉장고를 생성했어요!";
        titleText = `${userName}님이 "${notification.memo}"냉장고를 생성했어요.`;
        break;
      case "냉장고 수정":
        imgSrc = "/assets/refridge.png";
        statusText = "냉장고 이름이 수정됐어요!";
        titleText = `${userName}님이 "${notification.memo}"냉장고 이름을 ${refriName}로 수정했어요.`;
        break;
      case "냉장고 등록":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "냉장고에 참가했어요!";
        titleText = `${userName}님이 "${refriName}"냉장고에 참가했어요.`;
        break;
      case "냉장고 삭제":
        imgSrc = "/assets/refridge.png";
        statusText = "냉장고가 삭제됐어요!";
        titleText = `${userName}님이 "${notification.memo}"냉장고를 삭제했어요.`;
        break;
      case "구성원 삭제":
        if (userId === notification.sender) {
          // 현재 사용자 자신이 삭제된 경우
          imgSrc = "/assets/refridge.png";
          statusText = "냉장고에서 내보내졌어요.";
          titleText = `"${refriName}" 냉장고에서 내보내졌습니다.`;
        } else {
          // 다른 사용자가 삭제된 경우
          imgSrc = userInfo ? userInfo.photo : "default-profile.png";
          statusText = "구성원을 내보냈어요!";
          titleText = `${userName}님을 "${refriName}" 냉장고에서 내보냈어요.`;
        }
        break;
      case "채팅":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "채팅을 올라왔어요!";
        titleText = `${userName}님이 채팅을 남겼어요.`;
        break;
      case "채팅 공지":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "채팅방 공지!";
        titleText = `${userName}님이 ${refriName}냉장고에 공지를 남겼어요.`;
        break;
      case "유통기한 임박":
        if (foodInfo) {
          // foodInfo가 있는 경우만 처리
          imgSrc = getCategoryImage(foodInfo.lcategory);
          // notification.memo가 음수일 경우 "유통기한이 지났어요"로 출력
          if (parseInt(notification.memo, 10) < 0) {
            statusText = "유통기한이 지났어요";
            titleText = `${foodInfo.productName}의 소비기한이 지났어요.`;
          } else {
            statusText = `D-${notification.memo}`;
            titleText = `${foodInfo.productName}의 소비기한이 임박했어요.`;
          }
        } else {
          // foodInfo가 없을 때 기본값 설정
          imgSrc = getCategoryImage("default");
          statusText = "유통기한 정보 없음";
          titleText = "알 수 없는 상품의 소비기한이 임박했어요.";
        }
        break;
      case "포스팅 작성":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "레시피 등록!";
        titleText = `${userName}님이 "${notification.memo}" 레시피를 작성했어요.`;
        break;
      case "좋아요":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "좋아요를 받았어요!";
        titleText = `${userName}님이 좋아요를 눌렀어요.`;
        break;
      case "댓글 작성":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "새 댓글이 달렸어요!";
        titleText = `${userName}님이 댓글을 남겼어요.`;
        break;
      case "구독":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "새로운 구독자!";
        titleText = `${userName}님이 구독했어요.`;
        break;
      case "방송 시작":
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "방송이 시작됐어요!";
        titleText = `${userName}님이 방송을 시작했어요.`;
        break;
      default:
        imgSrc = userInfo ? userInfo.photo : "default-profile.png";
        statusText = "새로운 알림이 있습니다!";
        titleText = `${userName}님이 알림을 보냈습니다.`;
        break;
    }

    return (
      <div key={notification.alert_id} className="mb-6">
        <div className="flex items-center bg-white p-4 rounded-lg mb-2 shadow-sm">
          <div className="w-10 h-10 flex items-center justify-center text-2xl mr-4">
            <img
              src={imgSrc}
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-full object-contain"
            />
            {/* 프로필사진 */}
          </div>
          <div
            className={`flex-1 ${
              notification.alertcheck ? "text-gray-500" : "text-black"
            }`}
            onClick={() =>
              handleMarkAsRead(
                notification.alert_id,
                notification.recipeposting,
                notification.alerttype,
                notification.sender,
                userName
              )
            }
            style={{ cursor: "pointer" }}
          >
            <div className="text-xs mb-1">{statusText}</div>
            <div className="text-sm">{titleText}</div>
          </div>
          <div
            className="text-gray-500 cursor-pointer w-6 h-6 flex justify-center items-center"
            onClick={() => handleDeleteNotification(notification.alert_id)}
          >
            <IoClose className="w-5 h-5" />
          </div>
        </div>
      </div>
    );
  };

  // 알림 데이터를 날짜별로 그룹화
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = format(new Date(notification.alertday), "yyyy.MM.dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  // 날짜별로 그룹을 최신순으로 정렬
  const sortedDates = Object.keys(groupedNotifications).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="w-[390px] p-6 bg-gray-50">
      {sortedDates.map((date) => (
        <div key={date} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-bold">{date}</div>
            <button
              className="text-red-500 text-sm"
              onClick={() => handleDeleteAllNotificationsForDate(date)}
            >
              알림 전체 지우기
            </button>
          </div>
          {/* {groupedNotifications[date]
                        .slice()  // 원본 배열을 변경하지 않기 위해 복사
                        .sort((a, b) => new Date(b.alertday) - new Date(a.alertday)) // 날짜 내에서 최신순으로 정렬
                        .map(renderNotificationItem)} */}
          {groupedNotifications[date]
            .slice() // 원본 배열을 변경하지 않기 위해 복사
            .sort((a, b) => b.alert_id - a.alert_id) // alert_id 기준으로 최신순 정렬
            .map(renderNotificationItem)}
        </div>
      ))}
    </div>
  );
};

export default Body;
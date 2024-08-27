import React from "react";

const notifications = [
    {
        date: "2024.07.29",
        items: [
            {img: "/assets/cheese.png", status: "유통기한이 지났어요..", title: "서울우유 체다치즈", expired: true},
            {img: "/assets/groundmeat.png", status: "D-6", title: "국내산 다짐 쇠고기 600g", expired: false},
        ],
    },
    {
        date: "2024.07.28",
        items: [{img: "/assets/meet.png", status: "D-6", title: "[브룩클린688] 호주산 토시살 구이용 냉장", expired: false}],
    },
    {
        date: "2024.07.27",
        items: [
            {img: "/assets/groundmeat.png", status: "유통기한이 지났어요..", title: "[브룩클린688] 호주산 토시살 구이용 냉장", expired: true},
            {img: "/assets/cheese.png", status: "유통기한이 지났어요..", title: "서울우유 체다치즈", expired: true},
            {img: "", status: "유통기한이 지났어요..", title: "국내산 다짐 쇠고기 600g", expired: true},
        ],
    },
];

const Body = () => {
    return (
        <div className="w-[390px] p-6 bg-gray-50">
            {notifications.map((group) => (
                <div key={group.date} className="mb-6 ">
                    <div className="text-sm font-bold mb-2 ">{group.date}</div>
                    {group.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-white p-4 rounded-lg mb-2 shadow-sm"
                        >
                            <div className="w-10 h-10 flex items-center justify-center text-2xl mr-4">
                                {item.img ? (
                                    <img src={item.img} alt={item.title} className="w-50 h-50 object-contain"/>
                                ) : (
                                        "❗️"
                                    )
                                }
                            </div>
                            <div className="flex-1">
                                <div className={`text-xs mb-1 ${item.expired ? "text-red-500" : "text-blue-500"}`}>
                                    {item.status}
                                </div>
                                <div className="text-sm">{item.title}</div>
                            </div>
                            <div className="text-gray-400 text-lg">›</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Body;
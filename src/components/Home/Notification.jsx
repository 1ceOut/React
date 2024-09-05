
/*
    useUserStore에 로그인한 유저가 받은 알림이 notifications 리스트에 들어있음.
*/

const Notification = () => {
    return (
        <div
            className="flex gap-5 justify-between px-5 py-5 mt-9 w-full text-base font-medium tracking-tight text-gray-600 bg-white rounded-xl max-w-[380px]">
            <div className="flex gap-3">
                <img loading="lazy"
                     src="/assets/alert_icon.png"
                     alt="Notification icon" className="shrink-0 w-6 rounded-none aspect-square"/>
                <div className="flex-auto my-auto">고기 유통기한이 3일 남았어요</div>
            </div>
            <img loading="lazy"
                 src="/assets/right_arrow.png"
                 alt="Arrow icon" className="shrink-0 w-6 rounded-none aspect-square"/>
        </div>
    );
};

export default Notification
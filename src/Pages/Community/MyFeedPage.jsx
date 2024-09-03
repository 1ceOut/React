import React from "react";
import { useParams } from "react-router-dom"; // useParams를 import 합니다.
import MenuNavigate from "./../../components/Common/MenuNavigate";
import ProfileMenu from "./../../components/Community/MyFeed/ProfileMenu";
import FeedContent from "./../../components/Community/MyFeed/FeedContent";
import { useAllUsers } from "../../query/FeedQuery";

const MyFeedPage = () => {
    const { userId: paramUserId } = useParams(); // URL 파라미터에서 userId를 가져옵니다.
    const { data: users, isLoading, isError } = useAllUsers();

    // 로딩 중일 때 또는 에러 발생 시 처리
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading users</div>;
    }

    // users가 정의되어 있고 배열인지 확인
    if (!users || !Array.isArray(users)) {
        return <div>User data is not available</div>;
    }

    // URL 파라미터에 해당하는 유저 찾기
    const user = users.find(user => user.userId === paramUserId);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={`${user.name}님 게시판`} />
            <ProfileMenu
                userProfile={user.photo}
                userName={user.name}
                userId={user.userId}
            />
            <FeedContent userId={user.userId} />
        </main>
    );
};

export default MyFeedPage;

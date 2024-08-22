import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import FeedContent from "../../components/Community/Feed/FeedTitle";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from './../../components/Community/Feed/FeedTitle';
import { useState, useEffect } from "react";

import FeedProfile from "../../components/Community/Feed/FeedProfile";

const FeedPage = () => {
    // 처음 시작 시 목록 가져오기 - 한번만 호출
    useEffect(() => {
       
    }, []);
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate />
            <Profile />
            <FeedProfile/>
            <FeedTitle />
            <FeedMenu />
        </main>
    );
};

export default FeedPage;

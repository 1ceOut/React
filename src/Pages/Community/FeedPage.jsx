import HorizontalLine from "../../components/Common/HorizontalLine";
import MenuNavigate from "../../components/Common/MenuNavigate";
import FeedContent from "../../components/Community/Feed/FeedTitle";
import FeedMenu from "../../components/Community/Feed/FeedMenu";
import Profile from "../../components/Community/Feed/Profile";
import FeedTitle from './../../components/Community/Feed/FeedTitle';
import { useState, useEffect } from "react";
import axios from "axios";

const FeedPage = () => {
    const [list, setList] = useState([]);

    const postingList = () => {
        axios.get("/posting/list")
        .then(res => {
            setList(res.data);
        })
        .catch(err => console.error("Error fetching posting list:", err));
    };

    // 처음 시작 시 목록 가져오기 - 한번만 호출
    useEffect(() => {
        postingList();
    }, []);

    // 게시물 등록
    const addPosting = (data) => {
        axios.post("/posting/insert", data)
        .then(res => {
            // 목록 출력
            postingList();
        })
        .catch(err => console.error("Error adding posting:", err));
    };

    // 게시물 삭제
    const deletePosting = (postingId) => {
        axios.delete("/posting/delete?postingId=" + postingId)
        .then(res => {
            // 목록 출력
            postingList();
        })
        .catch(err => console.error("Error deleting posting:", err));
    };

    // 게시물 수정
    const updatePosting = (postingId, data) => {  //postingId를 인수로 전달
        axios.put("/posting/update/" + postingId, data)
        .then(res => {
            // 목록 출력
            postingList();
        })
        .catch(err => console.error("Error updating posting:", err));
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate />
            <Profile />
            <HorizontalLine />
            <FeedTitle />
            <FeedContent />
            <FeedMenu />
        </main>
    );
};

export default FeedPage;

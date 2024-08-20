import { useNavigate } from "react-router-dom";


const FeedTitle = () => {

    const navigate = useNavigate('');

    const detailNavigation = () => {
        navigate("/community/feeddetail")
    }

    return (
        <div className="self-stretch cursor-pointer" onClick={detailNavigation}>
                <div>
                    <img src="/assets/kimchi.png" alt="김치찌개" className="w-[342px] h-auto"/>
                </div>
                <div className="my-[14px] text-[15px] font-medium">
                    자취생이 추천하는 초간단 김치찌개 레시피 공유한다
                </div>
        </div>
    );
};

export default FeedTitle;
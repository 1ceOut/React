import useUserStore from "../../../store/useUserStore.js";
import Items from "../Items.jsx";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";


const HomeMainContent = ({options,data=[]}) => {
    const {userName} = useUserStore();
    const navigate = useNavigate();

    return (
        <article className="flex flex-col items-start text-lg font-semibold tracking-tight leading-snug">
            <div className="flex justify-between items-center w-[342px] mt-8 ml-6">
                {
                    options==="user"? (<p className="font-semibold text-lg">{userName}님의 식재료 추천</p>):(options==="reviews"?(
                        <p className="font-semibold text-lg">리뷰 많은 식재료 추천</p>): (
                        options==="best"? (<p className="font-semibold text-lg">현재 베스트 식재료 추천</p>): (
                            <p className="font-semibold text-lg">할인율 높은 식재료 추천</p>
                        )))
                }
                <p className="font-medium text-sm text-gray-500 border-b border-gray-500 cursor-pointer" onClick={()=>navigate("/shop/detail")}>전체보기</p>
            </div>

            <div className="flex w-[365px] h-max-[340px] pl-4 bg-indigo-50 mx-3 mt-1 rounded-lg shadow-xl overflow-x-auto scrollbar-hide">
                {
                    data.length===0? (
                        <div className="flex flex-col items-center ml-3">
                            <img style={{ width: 220, height: 220 }} className="ml-12" src='/assets/basket.png' alt='No data' />
                            <p className="ml-12">추천 데이터가 없습니다.</p>
                        </div>
                    ) : (
                        data.map((item, index) => {
                            return (
                                <Items item={item} id={index} key={index}/>
                            )
                        })
                    )
                }
            </div>
        </article>
    );
};

HomeMainContent.propTypes = {
    options: PropTypes.string,
    data : PropTypes.array
};

export default HomeMainContent;
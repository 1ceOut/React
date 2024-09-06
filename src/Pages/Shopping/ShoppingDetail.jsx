import { useState, useEffect } from 'react';
import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";
import DetailMainContent from "../../components/Shopping/DetailMainContent";

const ShoppingDetail=()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return(
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-5 mx-auto w-full max-w-[390px] max-h-[844px]`}>
            <MenuNavigate option={"식재료 추천"} alertPath="/addinfo/habit" />
            <DetailMainContent setIsModalVisible={setIsModalVisible} />
            <div className={`w-full ${isModalVisible ? 'opacity-0' : ''}`}>
                <BarNavigate 
                    shoppingsrc="/assets/shoppingselect.png"
                    homesrc="/assets/home.png"
                    searchsrc="/assets/search.png"
                />
            </div>
        </main>
    )
}
export default ShoppingDetail;
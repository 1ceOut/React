
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    
    const nextPage = () => {
            navigate('/addinfo/favorite')
    };


    return (
        <section className="self-stretch flex items-center justify-between w-[342px] h-14">
            <div className="text-[#767676] text-sm font-medium cursor-pointer" onClick={nextPage}>
                건너뛰기
            </div>
            <div className="flex">
                <div className="text-sm font-semibold">1</div>
                <div className="text-[#767676] text-sm font-semibold">/4</div>
            </div>
        </section>
    );
};

export default Navigation;
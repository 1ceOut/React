import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const BarNavigate = ({ shoppingsrc, homesrc, searchsrc }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex justify-evenly items-center border-x-0 w-[390px] border-t-2 rounded-2xl bg-white fixed bottom-0 h-20">
            <div className="flex flex-col justify-center items-center w-1/3">
                <img src={shoppingsrc} alt="쇼핑" className='cursor-pointer' onClick={() => handleNavigation('/Shop/home')} />
                쇼핑
            </div>
            <div className="flex flex-col justify-center items-center w-1/3">
                <img src={homesrc} alt="홈" className='cursor-pointer' onClick={() => handleNavigation('/')} />
                홈
            </div>
            <div className="flex flex-col justify-center items-center w-1/3">
                <img src={searchsrc} alt="검색" className='cursor-pointer' onClick={() => handleNavigation('/search/search')} />
                검색
            </div>
        </div>
    );
};

BarNavigate.propTypes = {
    shoppingsrc: PropTypes.string.isRequired,
    homesrc: PropTypes.string.isRequired,
    searchsrc: PropTypes.string.isRequired
};

export default BarNavigate;
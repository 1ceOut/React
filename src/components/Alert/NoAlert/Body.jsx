import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const Body = () => {
    const { notifications } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (notifications.length > 0) {
            navigate('/alert/alert'); // 알림이 생기면 alert 페이지로 이동
        }
    }, [notifications, navigate]);

    return (
        <section className='self-stretch pb-[60px] flex flex-col justify-center items-center mt-44'>
            <img src="/assets/bell.png"/>
            <h1 className='text-lg font-semibold tracking-tighter leading-10 text-gray-900 mt-8'>
                아직 알람이 온게 없어요!
            </h1>
            <p className='mt-3.5 text-sm font-medium tracking-tight text-neutral-500'>
                알람이 오면 꼭 알려드릴게요.
            </p>
        </section>
    );
};

export default Body;

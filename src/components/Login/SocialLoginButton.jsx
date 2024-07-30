import React from 'react';

const SocialLoginButton  = () => {
    const socialButtons = [
        {src : "/assets/naver-svg.png"},
        {src : "/assets/kakao-svg.png"},
        {src : "/assets/google-svg.png"}
          ];

    return (
        <div className='flex gap-5 justify-between mt-8'>
            {
                socialButtons.map((button,idx) => (
                    <button key={idx} className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                    <img loading="lazy" src={button.src} alt={button.alt} className="shrink-0 aspect-square w-[50px]" />
                    </button>
                ))
            }
        </div>
    );
};

export default SocialLoginButton;
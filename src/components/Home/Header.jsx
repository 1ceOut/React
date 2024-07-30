import React from 'react';

const Header = () => {
    return (
        <header className="flex flex-col self-stretch px-10 w-full">
            <div className="flex gap-4 items-start self-end mt-8">
                <img loading="lazy"
                     src="/assets/alert.png"
                     alt="Icon 1" className="shrink-0 w-6 rounded-none aspect-square"/>
                <img loading="lazy"
                     src="/assets/profile.png"
                     alt="Icon 2" className="shrink-0 w-6 aspect-[1.04]"/>
            </div>
        </header>
    );
};

export default Header;

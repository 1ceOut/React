import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <img
                src="/assets/norefri.jpeg"
                alt="Company"
                className="w-14 h-auto rounded-t-lg mb-4"
            />
            <p className="text-base mb-2">
                <span className="font-semibold">팀명 :</span> 1ceOut
            </p>
            <p className="text-base mb-2">
                <span className="font-semibold">설립 연도:</span> 2024
            </p>
            <p className="text-base mb-2">
                <span className="font-semibold">소개 :</span> 냉모밀은 사용자들이 냉장고를 보다 스마트하게 활용할 수 있도록 모바일에서 사용할 수 있는 혁신적인 웹 사이트입니다.
            </p>
            <p className="text-base mb-4">
                <span className="font-semibold">연락처:</span>
                <br /> 대표 : 010-4144-7113
                <br /> github: <a href="https://github.com/1ceOut" className="text-blue-500 hover:underline">https://github.com/1ceOut</a>
                <br /> 주소: 서울특별시 강남구 강남대로94길 20, 7층(역삼동)
            </p>
            <footer className="text-center text-gray-500 text-sm mt-6">
                © {new Date().getFullYear()} 1ceOut. All rights reserved.
            </footer>
        </div>
    );
};

export default AboutUs;

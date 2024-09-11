import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <img
                src="/assets/norefri.jpeg"
                alt="Company"
                className="w-24 h-auto rounded-t-lg mb-4 mx-auto"
            />
            <h1 className="text-2xl font-semibold text-center mb-4">About Us</h1>
            <p className="text-base mb-2">
                <span className="font-semibold">팀명 :</span> 1ceOut
            </p>
            <p className="text-base mb-2">
                <span className="font-semibold">설립 연도:</span> 2024
            </p>
            <p className="text-base mb-4">
                <span className="font-semibold">소개 :</span> 냉모밀은 사용자들이 냉장고를 보다 스마트하게 활용할 수 있도록 모바일에서 사용할 수 있는 혁신적인 웹 사이트입니다.
            </p>
            <p className="text-base mb-4">
                <span className="font-semibold">연혁:</span>
                <br /> 24년 7월 5일 - 주제 선정
                <br /> 24년 7월 26일 - 개발 환경 배포
                <br /> 24년 8월 15일 - 기능별 개발 구축
            </p>
            <p className="text-base mb-4">
                <span className="font-semibold">연락처:</span>
                <br /> 대표 : <a href="tel:010-4144-7113" className="text-blue-500 hover:underline">010-4144-7113</a>
                <br /> GitHub: <a href="https://github.com/1ceOut" className="text-blue-500 hover:underline">https://github.com/1ceOut</a>
                <br /> 주소: 서울특별시 강남구 강남대로94길 20, 7층(역삼동)
            </p>
            <div className="border-t border-gray-300 pt-4 mt-4">
                <h2 className="text-xl font-semibold mb-2 text-center">채용 공고</h2>
                <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
                    <p className="text-base mb-2">
                        <span className="font-semibold text-blue-600">직무:</span> 웹 개발자
                    </p>
                    <p className="text-base mb-2">
                        <span className="font-semibold text-blue-600">근무 형태:</span> 정규직
                    </p>
                    <p className="text-base text-gray-700">
                        <span className="font-semibold text-blue-600">우리의 팀원들을 만나보세요:</span>
                        <br/>
                        <ul className="list-disc list-inside ml-4 mt-2">
                            <li className="mb-2">
                                <a href="https://github.com/8282qwe"
                                   className="text-blue-500 hover:underline">이장우</a> - <span className="text-gray-500">(MSA 구축 / 소셜 로그인)</span>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/HanKyungPark"
                                   className="text-blue-500 hover:underline">박한경</a> - <span className="text-gray-500">(커뮤니티 CRUD)</span>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/JUYONG0133"
                                   className="text-blue-500 hover:underline">박주용</a> - <span className="text-gray-500">(냉장고 CRUD)</span>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/kongbh730"
                                   className="text-blue-500 hover:underline">공병현</a> - <span className="text-gray-500">(알람 기능)</span>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/LeeGaHyun12"
                                   className="text-blue-500 hover:underline">이가현</a> - <span className="text-gray-500">(배포 / 채팅 기능)</span>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/PASTELBOX"
                                   className="text-blue-500 hover:underline">민경진</a> - <span className="text-gray-500">(리액트 개발환경 / 커뮤니티 기능)</span>
                            </li>
                        </ul>

                    </p>
                </div>
            </div>
            <footer className="text-center text-gray-500 text-sm mt-6">
                © {new Date().getFullYear()} 1ceOut. All rights reserved.
            </footer>
        </div>
    );
};

export default AboutUs;

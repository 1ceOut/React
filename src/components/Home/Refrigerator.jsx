

const Refrigerator = () => {
    const items = [
        { img: "/assets/cheese.png", name: "서울우유 체다치즈" },
        { img: "/assets/chicken.png", name: "[올마레] 춘천 국물 닭갈비 떡볶이" },
        { img: "/assets/meet.png", name: "[브룩클린688] 호주산 토시살 구이용 냉장 ..." }
    ];

    return (
        <section className="self-stretch mb-8">
            <div className="flex gap-5 justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">나의 냉장고</h2>
                <div className="text-sm tracking-tight text-neutral-500 underline">전체보기</div>
            </div>
            {items.map((item, index) => (
                <div key={index} className="flex gap-3 mt-7 text-base font-medium tracking-tight text-gray-700">
                    <img loading="lazy" src={item.img} alt={item.name} className="shrink-0 rounded-lg aspect-square w-[34px]" />
                    <div className="flex-auto my-auto">{item.name}</div>
                </div>
            ))}
        </section>
    );
};

export default Refrigerator;

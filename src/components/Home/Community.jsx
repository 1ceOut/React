

const Community = () => {
    const posts = [
        { title: "김치찌개 레시피 공유 하니까 보시러 오...", date: "2024.07.27" },
        { title: "이연복이 셰프가 가르처준 오징어 짬뽕...", date: "2024.07.27" },
        { title: "대학생 자취 꿀 레시피 공유한다", date: "2024.07.27" }
    ];

    return (
        <section className="self-stretch">
            <div className="flex gap-5 justify-between whitespace-nowrap">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">커뮤니티</h2>
                <div className="text-sm tracking-tight text-neutral-500 underline">전체보기</div>
            </div>
            {posts.map((post, index) => (
                <div key={index} className="flex gap-5 mt-9">
                    <div className="grow text-base font-medium tracking-tight text-gray-700">{post.title}</div>
                    <div className="text-xs tracking-tight text-right text-neutral-500">{post.date}</div>
                </div>
            ))}
        </section>
    );
};

export default Community;

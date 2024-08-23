import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";

const ShoppingHome = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"쇼핑"} alertPath="/addinfo/habit" />

            <div style={{ width: 390, height: 162, marginTop: 20 }}>
                <img src="/assets/shoppinghome.png" alt="Shopping Home" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '32px' }}>
                <p style={{ fontWeight: 600, fontSize: 18 }}>이장우님의 식재료 추천</p>
                <p style={{ fontWeight: 500, fontSize: 14, color: '#767676', borderBottom: '1px solid #767676', cursor: 'pointer' }}>전체보기</p>
            </div>
            <div style={{ width: 390, height: 227, display: 'flex' }}>
    <div style={{ marginLeft: 24, marginTop: 16, marginRight: 9 }}>
        <img src="/assets/apple.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            새콤달콤 제철과일 사과<br />
            3kg(박스)
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>19,900원</p>
    </div>

    <div style={{ marginTop: 16, marginRight: 9 }}>
        <img src="/assets/yuk.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            [소반옥] 듬뿍 육개장 칼칼<br />
            2인분
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>7,840원</p>
    </div>

    <div style={{ marginTop: 16 }}>
        <img src="/assets/milk.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            연세우유 전용목 우유<br />
            1.8L
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>4,900원</p>
    </div>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '40px' }}>
                <p style={{ fontWeight: 600, fontSize: 18 }}>자주 사는 상품</p>
                <p style={{ fontWeight: 500, fontSize: 14, color: '#767676', borderBottom: '1px solid #767676', cursor: 'pointer' }}>전체보기</p>
            </div>
            <div style={{ width: 390, height: 227, display: 'flex' }}>
    <div style={{ marginLeft: 24, marginTop: 16, marginRight: 9 }}>
        <img src="/assets/apple.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            새콤달콤 제철과일 사과<br />
            3kg(박스)
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>19,900원</p>
    </div>

    <div style={{ marginTop: 16, marginRight: 9 }}>
        <img src="/assets/yuk.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            [소반옥] 듬뿍 육개장 칼칼<br />
            2인분
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>7,840원</p>
    </div>

    <div style={{ marginTop: 16 }}>
        <img src="/assets/milk.png" />
        <p style={{ width: 153, height: 42, fontWeight: 400, fontSize: 15, color: '#333D4B' }}>
            연세우유 전용목 우유<br />
            1.8L
        </p>
        <p style={{ width: 62, height: 21, fontSize: 15, fontWeight: 600 }}>4,900원</p>
    </div>
</div>
            <BarNavigate 
                shoppingsrc="/assets/shoppingselect.png"
                homesrc="/assets/home.png"
                searchsrc="/assets/search.png"
            />



        </main>
    );
};

export default ShoppingHome;

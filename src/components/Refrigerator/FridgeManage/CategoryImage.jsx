export const getCategoryImage = (lcategory) => {
    switch (lcategory) {
        case '고기':
        case '육류':
        case '다진고기':
        case '갈은고기':
        case '돼지고기':
            return '/assets/meet.png';
        case '닭고기':
            return '/assets/chicken.png';
        case '치즈':
            return '/assets/cheese.png';
        case '우유':
        case '우유류':
        case '두류':
            return '/assets/milkcow.png';
        case '빵류':
        case '과자류':
        case '아이스크림류':
            return '/assets/bread.png';
        case '튀김류':
        case '구이류':
        case '찜류':
        case '조림류':
        case '볶음류':
        case '찌개 및 전골류':
            return '/assets/meet.png';
        case '국 및 탕류':
        case '면 및 만두류':
        case '밥류':
            return '/assets/bob.png';
        case '채소류':
        case '과일류':
        case '버섯류':
        case '해조류':
            return '/assets/vegfru.png';
        case '기타':
        case '유지류':
            return '/assets/others.png';
        case '조미료류':
            return '/assets/seasoning.png';
        case '차류':
            return '/assets/tea.png';
        case '당류':
            return '/assets/sugar.png';
        case '난류':
            return '/assets/egg.png';
        case '김치류':
            return '/assets/1kimchi.png';
        case '장아찌 및 절임류':
            return '/assets/pickles.png';
        case '젓갈류':
            return '/assets/jeotgal.png';
        case '포류':
            return '/assets/jerky.png';
        case '어패류 및 기타 수산물':
            return '/assets/seafood.png';
        case '견과 및 종실류':
            return '/assets/nuts.png';
        case '감자 및 전분류':
            return '/assets/potato.png';
        default:
            return '/assets/foood.png';
    }
};

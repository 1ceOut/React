import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DetailButton = ({
                        id,
                        expiryDate,
                        option,
                        count,
                        productType,
                        createdDate,
                        lcategory,
                        scategory
                      }) => {
  const navigate = useNavigate();

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expirationDate = new Date(expiryDate);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingDays(expiryDate);

  const getTextColor = (remainingDays) => {
    if (remainingDays <= 0) {
      return 'text-red-500';
    } else if (remainingDays <= 10) {
      return 'text-yellow-500';
    } else if (remainingDays <= 20) {
      return 'text-orange-500';
    } else {
      return 'text-green-500';
    }
  };

  const getCategoryImage = (lcategory) => {
    console.log(lcategory);
    switch(lcategory) {
        // 육류 관련 카테고리
      case '고기':
      case '육류':
      case '다진고기':
      case '갈은고기':
      case '돼지고기':
        return '/assets/meet.png';
        // 치킨
      case '닭고기':
        return '/assets/chicken.png';
        // 치즈
      case '치즈':
        return '/assets/cheese.png';
        // 우유 관련 카테고리
      case '우유':
      case '우유류':
      case '두류':
        return '/assets/milkcow.png';

        // 빵, 과자, 디저트 관련 카테고리
      case '빵류':
      case '과자류':
      case '아이스크림류':
        return '/assets/bread.png';

        // 조리 방법별 카테고리
      case '튀김류':
      case '구이류':
      case '찜류':
      case '조림류':
      case '볶음류':
      case '찌개 및 전골류':
        return '/assets/meet.png';

        // 국, 면, 밥 관련 카테고리
      case '국 및 탕류':
      case '면 및 만두류':
      case '밥류':
        return '/assets/bob.png'; // 예시 이미지

        // 채소, 과일, 버섯, 해조류
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
        return '/assets/foood.png'; // 기본 이미지 경로
    }
  };


  const handleNavigation = () => {
    navigate('/Refrigerator/food/FoodDetail', {
      state: {
        id,
        expiryDate,
        option,
        count,
        productType,
        createdDate,
        lcategory,
        scategory
      }
    });
  };


  return (
      <div className="self-stretch w-[342px] h-[60px] flex items-center justify-between cursor-pointer" onClick={handleNavigation}>
        <div className="flex items-center">
          <div className="flex items-center justify-center mr-3 w-10 h-10 rounded-lg bg-[#F5F5F5]">
            <img src={getCategoryImage(lcategory)} alt={lcategory} className="w-[28px] h-[28px]"/>
          </div>
          <div className="flex flex-col">
            <div className={`text-[13px] ${getTextColor(remainingDays)}`}>
              {`${remainingDays >= 0 ? "D-" : "D+"}${Math.abs(remainingDays)}`}
            </div>
            <div className="w-[250px] text-[15px] text-[#333D4B] truncate">{option}</div>
          </div>
        </div>
        <div className="text-xl">{'>'}</div>
      </div>
  );
};

DetailButton.propTypes = {
  id:PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  productType: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  lcategory: PropTypes.string.isRequired,
  scategory: PropTypes.string.isRequired,
};

export default DetailButton;

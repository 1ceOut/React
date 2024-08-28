import axios from 'axios';


const API_URL = import.meta.env.VITE_API_REFRI;

// Elasticsearch에서 영양 정보를 가져오는 함수 정의
export const fetchNutritionInfo = async (productName, scategory, productType) => {
    try {
        // productType 값 정규화
        const normalizedProductType = productType ? productType.trim().toLowerCase() : '';

        let endpoint;
        let requestBody;

        // productType에 따라 적절한 엔드포인트 및 요청 본문 설정
        if (normalizedProductType === '가공식품') {
            endpoint = `${API_URL}/api/food/recipe/detail`; // 수정된 부분
            requestBody = {
                recipe_name: productName,
                scategory: scategory
            };
        } else if (normalizedProductType === '원자재성 식품') {
            endpoint = `${API_URL}/api/food/food/detail`; // 수정된 부분
            requestBody = {
                mcategory: productName,
                scategory: scategory
            };
        } else {
            throw new Error(`알 수 없는 제품 유형: ${productType}`); // 문제의 유형을 로그로 확인
        }

        // API 요청 보내기
        const response = await axios.post(endpoint, requestBody);
        const data = response.data;

        // 첫 번째 항목만 추출
        const hits = data.hits.hits;
        if (hits.length > 0) {
            return hits[0]._source;
        } else {
            return null;
        }
    } catch (error) {
        console.error('영양 정보 가져오기 오류', error);
        return null;
    }
};

import {uploadFile} from "../query/FoodListQuery.jsx";

// Base64 데이터 URL을 Blob으로 변환하는 함수
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// 이미지 파일을 NCP 서버에 업로드하는 함수
export const uploadImageToNCP = async (imageDataUrl) => {
    const blob = dataURItoBlob(imageDataUrl);
    const formData = new FormData();
    formData.append('file', blob, 'image.png');

    try {
        const responseData = await uploadFile(formData); // `uploadFile` 호출

        // 이미지 업로드 후 응답에서 URL을 추출합니다
        console.log("Upload Response Data:", responseData);

        // 응답 데이터가 JSON 객체인지 단순 문자열인지 확인 후 처리
        let imageUrl;
        if (typeof responseData === 'string') {
            imageUrl = responseData; // 문자열 형태일 경우
        } else if (responseData.url) {
            imageUrl = responseData.url; // JSON 객체 형태일 경우
        } else {
            throw new Error("Unexpected response format");
        }

        return imageUrl;
    } catch (error) {
        throw error; // 오류를 호출한 쪽으로 전달
    }
};

import axios from 'axios';

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
        // 서버의 이미지 업로드 엔드포인트를 올바르게 설정하세요
        const response = await axios.post('http://localhost:9000/api/food/upload/barcode', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 이미지 업로드 후 응답에서 URL을 추출합니다
        console.log("Upload Response Data:", response.data);

        // 응답 데이터가 JSON 객체인지 단순 문자열인지 확인 후 처리
        let imageUrl;
        if (typeof response.data === 'string') {
            imageUrl = response.data; // 문자열 형태일 경우
        } else if (response.data.url) {
            imageUrl = response.data.url; // JSON 객체 형태일 경우
        } else {
            throw new Error("Unexpected response format");
        }

        return imageUrl;
    } catch (error) {
        console.error("File upload failed:", error.response ? error.response.data : error.message);
        throw error;
    }
};


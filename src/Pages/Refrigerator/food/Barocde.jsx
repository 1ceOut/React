import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Webcam from "react-webcam";

const Barcode = () => {
    const location = useLocation();
    const { refrigeratorName } = location.state || {};
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [ocrResult, setOcrResult] = useState('');
    const [inferTexts, setInferTexts] = useState([]);
    const [concatenatedText, setConcatenatedText] = useState('');
    const [foodSafetyInfo, setFoodSafetyInfo] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState({
        productName: '',
        expiryDate: '',
        companyName: '',
        address: '',
        productType: '',
    });

    // 모달 표시 상태 관리
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
            }
        };
        initCamera();
    }, []);

    useEffect(() => {
        if (concatenatedText) {
            fetchFoodSafetyInfo(concatenatedText);
        }
    }, [concatenatedText]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (video && context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/png');
            setCapturedImage(imageDataUrl);
            return imageDataUrl;
        }
        return null;
    };

    const getBase64ImageBytes = (imageSrc) => {
        // Data URL에서 실제 Base64 문자열 추출
        const base64String = imageSrc.split(',')[1];

        // Base64 문자열을 바이트 배열로 변환
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // 바이트 배열을 Uint8Array로 변환
        const byteArray = new Uint8Array(byteNumbers);

        return byteArray;
    };

    const dataURLtoFile = (dataurl, filename) => {
        // Data URL에서 MIME 타입과 Base64 데이터 추출
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        // Base64 데이터를 Uint8Array로 변환
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        // Blob 생성 후 File 객체로 변환
        return new File([u8arr], filename, { type: mime });
    };

    const recognizeText = async (images) => {
        const image = captureImage();
        if (!image) return;
        const apiUrl = 'https://yebuqn32b7.apigw.ntruss.com/custom/v1/33749/eabf62390c999978f5ed9a22ad4477fe994740622efffce38ff633a44d27665c/general';
        const secretKey = 'ZWxFV2ZGTHJoRERwdkJKeUhoU0FBYXRBc1JYa3BtWVI=';

        const formData = new FormData();
        formData.append('message', JSON.stringify({
            images: [{ format: 'jpeg', name: 'image' ,url:null}],
            requestId: 'string',
            version: 'V2',
            timestamp: Date.now(),
        }));
        formData.append('file', images);

        try {
            const response = await axios.post(
                apiUrl,
                formData,
                {
                    headers: {
                        'X-OCR-SECRET': secretKey,
                    }
                }
            ).then((response)=>{
                console.log(response);
            });
            if (response.data.images.length === 0 || response.data.images[0].fields.length === 0) {
                alert('텍스트를 인식하지 못했습니다. 다시 시도해 주세요.');
                return;
            }
            setOcrResult(response.data);
            extractInferTexts(response.data);
        } catch (error) {
            console.error("Error recognizing text: ", error);
        }
    };

    const extractInferTexts = (ocrData) => {
        const texts = [];

        ocrData.images.forEach((image) => {
            let concatenatedText = '';

            image.fields.forEach((field) => {
                const filteredText = field.inferText.replace(/\D/g, '');
                concatenatedText += filteredText;
            });

            if (concatenatedText.length === 12 || concatenatedText.length === 13) {
                texts.push(concatenatedText);
            }
        });

        setInferTexts(texts);

        const finalConcatenatedText = texts.join(' ');
        setConcatenatedText(finalConcatenatedText);

        // foodSafetyInfo가 설정되기 전에 모달을 열 수 있도록 하기 위해 setTimeout을 사용
        setTimeout(() => {
            setModalIsOpen(true);
        }, 500);  // 0.5초 정도의 지연 시간
    };

    const fetchFoodSafetyInfo = async (barcode) => {
        const apiKey = '3369ab4c48b84f35a46c';
        const apiUrl = `https://openapi.foodsafetykorea.go.kr/api/${apiKey}/C005/json/1/5/BAR_CD=${barcode}`;

        try {
            const response = await axios.get(apiUrl);
            setFoodSafetyInfo(response.data);
            if (response.data.C005.total_count !== '0') {
                const product = response.data.C005.row[0];
                setAdditionalInfo({
                    productName: product.PRDLST_NM,
                    expiryDate: product.POG_DAYCNT,
                    companyName: product.BSSH_NM,
                    address: product.SITE_ADDR,
                    productType: product.PRDLST_DCNM,
                    permissionDate: product.PRMS_DT,
                });
            }
        } catch (error) {
            console.error("Error fetching food safety info: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdditionalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };


    // 모달 닫기
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 추가 입력창으로 이동
    const goToAddInput = () => {
        navigate('/Refrigerator/food/AddInput2', {
            state: {
                barcode : additionalInfo.barcode,
                productName: additionalInfo.productName,
                expiryDate: additionalInfo.expiryDate
            }
        });
        closeModal();
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"음식 바코드"} alertPath="/addinfo/habit"/>
            <div style={{width: 342, height: 76, marginTop: 24}}>
                <p style={{fontWeight: 600, fontSize: 28}}>
                    상품 바코드를 찍어주세요<br/>
                    {refrigeratorName && <h2>{refrigeratorName} 냉장고</h2>}
                </p>
            </div>
            <video ref={videoRef} autoPlay playsInline style={{width: '100%', height: 'auto'}}/>
            <canvas ref={canvasRef} style={{display: 'none'}}/>

            <div style={{
                width: 342,
                height: 56,
                borderRadius: 12,
                border: '1px solid #E1E1E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 32,
                cursor: "pointer"
            }}>
                <Webcam
                    audio={false}
                    height={720}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                >
                    {({ getScreenshot }) => (
                        <button
                            onClick={() => {
                                const imageSrc = getScreenshot();
                                const imageFile = dataURLtoFile(imageSrc, 'captured_image.jpg');
                                console.log('Image file:', imageFile);
                                // 이제 imageFile을 서버로 전송하거나 다른 처리를 할 수 있습니다.
                                recognizeText(imageFile);
                            }}
                        >
                            Capture photo
                        </button>
                    )}
                </Webcam>
                {/*<button onClick={recognizeText}>바코드 인식</button>*/}
            </div>
            <div>
                {capturedImage && (
                    <div style={{marginRight: '20px'}}>
                        <h3>찍은 사진 임</h3>
                        <img src={capturedImage} alt="Captured"/>
                    </div>
                )}
                {ocrResult && (
                    <div>
                        <h3>OCR Result:</h3>
                        <textarea
                            value={JSON.stringify(ocrResult, null, 2)}
                            readOnly
                            style={{width: '400px', height: '300px'}}
                        />
                    </div>
                )}
                {concatenatedText && (
                    <div>
                        <h3>인식된 바코드 결과는 ? :</h3>
                        <p>{concatenatedText}</p>
                    </div>
                )}
                {foodSafetyInfo && foodSafetyInfo.C005 && (
                    <div>
                        {foodSafetyInfo.C005.total_count === '0' ? (
                            <div>
                                <h3>해당 바코드에 등록된 상품 정보가 없음</h3>
                                <h3>해당 식품을 직접 입력하실?</h3>
                                <Link to="/userinput">
                                    <button>상품등록</button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <h3>추가 정보 입력:</h3>
                                <form>
                                    <label>
                                        제품명:
                                        <input
                                            type="text"
                                            name="productName"
                                            value={additionalInfo.productName}
                                            onChange={handleInputChange}
                                        />
                                    </label><br/>
                                    <p><strong>유통기한:</strong> {additionalInfo.expiryDate}</p><br/>
                                    <p>유통기한은 년월일로 기입해주세요</p>
                                    <label>
                                        유통기한:
                                        <input
                                            type="date"
                                            name="expiryDate"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label><br/><br/>

                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 모달 구현 */}
            <Dialog
                open={modalIsOpen}
                onClose={closeModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>바코드 정보</DialogTitle>
                <DialogContent>
                    <TextField
                        label="인식된 바코드"
                        fullWidth
                        margin="normal"
                        value={concatenatedText}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="제품명"
                        fullWidth
                        margin="normal"
                        value={additionalInfo.productName}
                        InputProps={{ readOnly: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        다시 찍기
                    </Button>
                    <Button onClick={goToAddInput} color="primary">
                        추가 입력창으로 넘어가기
                    </Button>
                </DialogActions>
            </Dialog>
        </main>
    );
};

export default Barcode;

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { uploadImageToNCP } from "../../../logic/bucket.js";
import {
  recognizeTextWithUrl,
  fetchFoodSafetyInfo,
} from "../../../query/RefriQuery";

const Barcode = () => {
  const location = useLocation();
  const { refrigeratorName } = location.state || {};
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState("");
  const [inferTexts, setInferTexts] = useState([]);
  const [concatenatedText, setConcatenatedText] = useState("");
  const [foodSafetyInfo, setFoodSafetyInfo] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({
    productName: "",
    expiryDate: "",
    companyName: "",
    address: "",
    productType: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
      fetchFoodSafetyInfo(concatenatedText).then((response) => {
        setFoodSafetyInfo(response);
        if (response.C005.total_count !== "0") {
          const product = response.C005.row[0];
          setAdditionalInfo({
            productName: product.PRDLST_NM,
            expiryDate: product.POG_DAYCNT,
            companyName: product.BSSH_NM,
            address: product.SITE_ADDR,
            productType: product.PRDLST_DCNM,
            permissionDate: product.PRMS_DT,
          });
        }
      });
    }
  }, [concatenatedText]);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 이미지 전처리: 그레이스케일 및 대비 증가
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const contrast = avg * 1.5; // 대비 증가
        data[i] = contrast; // red
        data[i + 1] = contrast; // green
        data[i + 2] = contrast; // blue
      }
      context.putImageData(imageData, 0, 0);

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      return imageDataUrl;
    }
    return null;
  };

  const recognizeText = async () => {
    const image = captureImage();
    if (!image) return;
    try {
      // 이미지 업로드
      const imageUrl = await uploadImageToNCP(image);
      console.log("Image URL:", imageUrl);

      // 전체 URL 생성
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const fullImageUrl = `${baseUrl}${imageUrl}`;
      console.log("Full image URL for OCR:", fullImageUrl);

      // OCR 인식 요청
      const ocrResponse = await recognizeTextWithUrl(fullImageUrl);
      if (
          !ocrResponse ||
          ocrResponse.images.length === 0 ||
          ocrResponse.images[0].fields.length === 0
      ) {
        alert("텍스트를 인식하지 못했습니다. 다시 시도해 주세요.");
        return;
      }

      setOcrResult(ocrResponse);
      extractInferTexts(ocrResponse);
    } catch (error) {
      console.error("Error recognizing text:", error);
    }
  };

  const extractInferTexts = (ocrData) => {
    const texts = [];
    const validBarcodes = [];

    ocrData.images.forEach((image) => {
      let concatenatedText = "";

      image.fields.forEach((field) => {
        const filteredText = field.inferText.replace(/\D/g, "");
        concatenatedText += filteredText;
      });

      // 유효한 바코드 검증: 12 또는 13자리의 바코드만 포함
      if (concatenatedText.length === 12 || concatenatedText.length === 13) {
        texts.push(concatenatedText);
      }
    });

    // 중복 및 유사도 비교를 통해 최적의 바코드 선택
    if (texts.length > 0) {
      const uniqueTexts = [...new Set(texts)];
      uniqueTexts.forEach((text) => {
        const occurrences = texts.filter((t) => t === text).length;
        if (occurrences > 1) {
          validBarcodes.push(text);
        }
      });
    }

    const finalConcatenatedText = validBarcodes.join(" ") || texts.join(" ");
    setInferTexts(validBarcodes.length > 0 ? validBarcodes : texts);
    setConcatenatedText(finalConcatenatedText);

    setTimeout(() => {
      setModalIsOpen(true);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToAddInput = () => {
    navigate("/Refrigerator/food/AddInput2", {
      state: {
        barcode: additionalInfo.barcode,
        productName: additionalInfo.productName,
        expiryDate: additionalInfo.expiryDate,
        refrigeratorName: refrigeratorName,
      },
    });
    closeModal();
  };

  return (
      <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
        <MenuNavigate
            option={`${refrigeratorName} 냉장고`}
            alertPath="/addinfo/habit"
        />
        <div className="w-[342px] h-[76px] mt-6">
          <p className="font-semibold text-2xl">
            상품 바코드를 찍어주세요
            <br />
          </p>
        </div>
        <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        <canvas ref={canvasRef} className="hidden" />

        <div className="w-[342px] h-[56px] rounded-xl border border-[#E1E1E1] flex items-center justify-center mt-8 cursor-pointer">
          <button
              onClick={recognizeText}
              className="w-full h-full bg-blue-500 text-white rounded-xl"
          >
            바코드 인식
          </button>
        </div>


        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth>
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

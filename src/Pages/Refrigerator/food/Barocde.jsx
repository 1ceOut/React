import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("카메라 접근 오류: ", error);
      }
    };

    initCamera();

    // 컴포넌트 언마운트 시 카메라 끄기
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleNavigation = (path) => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    navigate(path);
  };

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
    setLoading(true);
    const image = captureImage();
    if (!image) {
      setLoading(false);
      return;
    }
    try {
      const imageUrl = await uploadImageToNCP(image);
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const fullImageUrl = `${baseUrl}${imageUrl}`;

      const ocrResponse = await recognizeTextWithUrl(fullImageUrl);
      if (
          !ocrResponse ||
          ocrResponse.images.length === 0 ||
          ocrResponse.images[0].fields.length === 0
      ) {
        alert("텍스트를 인식하지 못했습니다. 다시 시도해 주세요.");
        setLoading(false);
        window.location.reload();
        return;
      }

      setOcrResult(ocrResponse);
      extractInferTexts(ocrResponse);
    } catch (error) {
      console.error("텍스트 인식 오류:", error);
    } finally {
      setLoading(false);
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

      if (concatenatedText.length === 12 || concatenatedText.length === 13) {
        texts.push(concatenatedText);
      }
    });

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

  const handleRetake = () => {
    window.location.reload();
  };

  const goToAddInput = () => {
    handleNavigation("/Refrigerator/food/AddInput2");
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

        {loading ? (
            <div className="flex items-center justify-center w-full h-auto mt-8">
              <CircularProgress />
            </div>
        ) : (
            <>
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
            </>
        )}

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
            <Button onClick={handleRetake} color="primary">
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

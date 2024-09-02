// import bannerdata from "../../../testdata/banner.json";
import PropTypes from "prop-types"
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeTopContent = ({headerData=[]}) => {
    const [currentIndex, setCurrentIndex] = useState(0); // 초기값 설정

    const renderSlides = headerData.map((image, idx) => (
        <div key={idx} onClick={() => window.open(image.url, "_blank")} style={{height:"162px", width:"auto",overflow:"hidden", position:"relative"}}>
            <img src={image.image} alt={`Slide ${idx}`} style={{top:"50%",left:"50%",transform:"translate(-25%,5%)",minWidth:"200%",height:"auto"}}/>
        </div>
    ));

    function handleChange(index) {
        setCurrentIndex(index);
    }

    return (
        <div className="flex relative flex-col items-start w-full tracking-tight leading-snug aspect-[2.407]">
            <Carousel
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                selectedItem={currentIndex} // 현재 인덱스 사용
                onChange={handleChange}
            >
                {renderSlides}
            </Carousel>
        </div>
    );
};

HomeTopContent.propTypes = {
    headerData: PropTypes.array
};

export default HomeTopContent;

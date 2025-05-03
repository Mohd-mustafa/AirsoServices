import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./imageSlider.css";

import Hajj from "../../assests/kabaimage.jpg";
import Madina from "../../assests/madina.jpg";
import Safa from "../../assests/safa-marwa-feature.jpg";
import ZamZam from "../../assests/zam zam.jpg";

const images = [Hajj, Madina, Safa, ZamZam];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      {/* Swiper for Images Only */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="swiper-container"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slider">
              <img src={image} alt={`Slide ${index}`} className="slider-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Text Menu (Separate from Images) */}
           </div>
  );
};

export default ImageSlider;

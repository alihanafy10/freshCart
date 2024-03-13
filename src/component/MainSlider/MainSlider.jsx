import React from 'react'
import Slider from "react-slick";
import imge1 from '../../assets/images/slider-image-3.jpeg'
import imge3 from '../../assets/images/slider-image-1.jpeg'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1500,
    infinite:true
  };
  return (
    <Slider {...settings}>
      <div >
      <img src={imge1} alt="slider-image" className="w-100"/>
      </div>
      <div>
      <img src={imge3} alt="slider-image" className="w-100"/>
      </div>
    </Slider>
  );
}

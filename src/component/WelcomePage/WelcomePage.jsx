

import React, { useState, useEffect } from "react";
import imge1 from "../../assets/images/slider-image-1.jpeg";
import imge2 from "../../assets/images/slider-image-2.jpeg";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import Slider from "react-slick";
import DataPagination from "../react-paginate/DataPagination";
import Footer from "../footer/Footer";
import { MySecondLoader } from "../contentLoaderProduct/ContentLoader";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyVerticallyCenteredModal from "../goSignIn/GoSignIn";


export default function WelcomePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [modalShow, setModalShow] = useState(false);
  let x=useNavigate()
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

    function getCategory() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let { data } =useQuery('getCategory',getCategory)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    autoplaySpeed:3000,
    infinite:true
  };

  return (
    <>
      <div className="container posss my-3 " style={{ paddingTop: "74.49px" }}>
        <div className="row">
          <div className="col-8 p-0">
            <MainSlider />
          </div>
          <div className="col-4 p-0">
            <img src={imge1} alt="grocery-banner" className="w-100" />
            <img
              src={imge2}
              alt="grocery-banner"
              className="w-100"
              style={{ height: "49.2%" }}
            />
          </div>
        </div>

        <h3 className="mt-5 mb-3">Shop Popular Categories</h3>
        <div>
          <Slider {...settings}>
            {data
              ? [
                  data?.data?.data?.slice(0, 6),
                  data?.data?.data?.slice(6, 12),
                ].map((slideData, slideIndex) => (
                  <div key={slideIndex} className="row d-flex  m-auto g-4">
                    {slideData.map((item) => (
                      <div
                        key={item._id}
                        className="col-2 p-0"
                        style={{ cursor: "pointer" }}
                      >
                        <Link
                          onClick={() => {
                            if (localStorage.getItem("token")) {
                              if (isOnline) {
                                x(`/categories/${item._id}`);
                              } else {
                                toast.error("you are offline");
                              }
                            } else {
                              setModalShow(1);
                            }
                          }}
                        >
                          <img
                            src={item.image}
                            alt="category"
                            className="w-100 mb-2 img-respons"
                            style={{ borderRadius: "8px" }}
                          />
                          <p className="ps-2 pe-2 m-1 p-response">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                ))
              : Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="row d-flex  m-auto">
                      {[...Array(6)].map((_, innerIndex) => (
                        <div key={innerIndex} className="col-2 p-0">
                          {<MySecondLoader />}
                        </div>
                      ))}
                    </div>
                  ))}
          </Slider>
        </div>
        <DataPagination />
      </div>
      <Footer />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

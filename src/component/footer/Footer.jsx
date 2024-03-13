import React from 'react'
import img1 from '../../assets/images/Amazon_Pay-Logo.wine.svg'
import img2 from '../../assets/images/675747.webp'
import img3 from '../../assets/images/MasterCard-Logo-1990.png'
import img4 from '../../assets/images/pa4344888-paypal-logo-40-free-paypal-amp-please-donate-images.png'
import img5 from '../../assets/images/Download_on_the_App_Store_Badge.svg.png'
import img6 from '../../assets/images/google-play-badge-logo.svg'
import SocialIcons from '../socialIcons/SocialIcons'
export default function Footer() {
  return (
    <div className="mt-5 p-5" style={{ backgroundColor: "#eee" }}>
      <h4>Get the FreshCart app</h4>
      <p style={{ color: "gray" }}>
        We will send you a link, open it on your phone to download the app
      </p>
      <div className="d-flex">
        <input type="email" placeholder="Email" className="form-control me-3" />
        <button className="btn bg-main text-white" style={{ width: " 170px" }}>
          Share App Link
        </button>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex align-items-center">
          <p className="m-0">Payment Partners</p>
          <ul
            className="d-flex m-0 p-0 ms-2 align-items-center flex-wrap"
            style={{ listStyle: "none" }}
          >
            <li>
              <img src={img1} alt="amazone" style={{ width: "80px" }} />
            </li>
            <li>
              <img
                src={img2}
                alt="american express"
                style={{ width: "45px" }}
              />
            </li>
            <li>
              <img src={img3} alt="master card" style={{ width: "45px" }} />
            </li>
            <li>
              <img src={img4} alt="paypal" style={{ width: "60px" }} />
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center ">
          <p className="m-0">Get deliveries with FreshCart</p>
          <div className="d-flex align-items-center ms-2 flex-wrap ">
            <img
              src={img5}
              alt="app store"
              style={{ width: "90px", height: "24px" }}
              className="me-2"
            />
            <img src={img6} alt="google play" style={{ width: "80px" }} />
          </div>
        </div>
      </div>
      <SocialIcons sizeng={1.8 } area={'text-center'} />
      <p className="text-center mt-3 mb-0">
        <span style={{ fontWeight: "bold" }}>Created by</span> Ali Hanafy Ahmed
        &copy; 2024
      </p>
    </div>
  );
}

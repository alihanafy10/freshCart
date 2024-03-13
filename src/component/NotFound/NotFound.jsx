import React from 'react'
import error from "../../assets/images/error.svg"
import Footer from '../footer/Footer';
export default function NotFound() {
  return (
    <>
      <div className="text-center my-5" style={{ paddingTop: "74.49px" }}>
        <img src={error} alt="error" />
      </div>
      <div
        style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </>
  );
}

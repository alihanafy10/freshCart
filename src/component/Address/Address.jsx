import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../footer/Footer";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

export default function Address() {
let{id}=useParams()
  let {pay}=useContext(storeContext)
  let [err, setErr] = useState("");
  let gothome = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
 async function payPay(values) {
  setLoaderbtn(1)
    let {data}= await pay(id,values)
    if(data.status === "success"){
      setLoaderbtn(0)
      window.location.href=data.session.url
    }else{
      toast.error('error')
      setLoaderbtn(0)
    }
    console.log(data)
  }

  function validationSchema() {
    const errors = Yup.object({
      details: Yup.string().max(100).required(),
        phone: Yup.string()
        .matches(
          /^01[0125][0-9]{8}$/,
          "Enter a valid phone number"
        )
        .required(),
        city: Yup.string()
        .matches(
          /^\s*[a-zA-Z]{1}[0-9a-zA-Z][0-9a-zA-Z '-.=#/]*$/,
          "Enter A valid City"
        )
        .required(),
    });
    return errors;
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:""
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      payPay(values);
    },
  });

  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Address Now :</h2>
          <form onSubmit={address.handleSubmit}>
            <label htmlFor="details">details:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="text"
              name="details"
              className="form-control mb-3"
              id="details"
            />
            {address.errors.details && address.touched.details ? (
              <div className="alert alert-danger" role="alert">
                {address.errors.details}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="phone">phone:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="text"
              name="phone"
              className="form-control mb-3"
              id="phone"
            />
            {address.errors.phone && address.touched.phone ? (
              <div className="alert alert-danger" role="alert">
                {address.errors.phone}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="city">city:</label>
            <input
              onBlur={address.handleBlur}
              onChange={address.handleChange}
              type="text"
              name="city"
              className="form-control mb-3"
              id="city"
            />
            {address.errors.city && address.touched.city ? (
              <div className="alert alert-danger" role="alert">
                {address.errors.city}
              </div>
            ) : (
              ""
            )}

            {err ? (
              <div className="alert alert-danger" role="alert">
                {err}
              </div>
            ) : (
              ""
            )}

            <div className="text-end">
              <button
                disabled={!(address.dirty && address.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{ position: "absolute", bottom: "0", left: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </>
  );
}

import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../footer/Footer";


export default function ForgetPass() {
  let [err, setErr] = useState("");
  let gotVCode = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoaderbtn(false);
        if (res.data.statusMsg === "success") {
          gotVCode("/VerifyResetCode");
        }
      })
      .catch((err) => {
        setLoaderbtn(false);
        setErr(err?.response?.data?.message);
      });
  }

  function validationSchema() {
    const errors = Yup.object({
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required(),
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    <>
      <div style={{ paddingTop: "180.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Forget Password :</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="Email">Email:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="email"
              name="email"
              className="form-control mb-3"
              id="Email"
            />
            {registr.errors.email && registr.touched.email ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.email}
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
                disabled={!(registr.dirty && registr.isValid)}
                type="submit"
                className="btn bg-main text-white"
              >
                {loaderbtn ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

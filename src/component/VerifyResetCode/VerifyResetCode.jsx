import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../footer/Footer";

export default function ForgetPass() {
  const [err, setErr] = useState("");
  const gotnewpass = useNavigate();
  const [loaderbtn, setLoaderbtn] = useState(false);

  const sign_in = (values) => {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoaderbtn(false);
        if (res.status === 200) {
          gotnewpass("/ResetPassword");
        } else {
          setErr(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoaderbtn(false);
        setErr(err?.response?.data?.message);
      });
  };

  const validationSchema = () => {
    return Yup.object({
      resetCode: Yup.string().min(2).max(9).required(),
    });
  };

  const registr = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(values);
    },
  });

  return (
    <>
      <div style={{ paddingTop: "180.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Verify Reset Code :</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="resetCode">Reset Code :</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="text"
              name="resetCode"
              className="form-control mb-3"
              id="resetCode"
            />
            {registr.errors.resetCode && registr.touched.resetCode ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.resetCode}
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

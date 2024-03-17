import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../footer/Footer";


export default function Signin() {
  let [err, setErr] = useState("");
  let gothome = useNavigate();
  let [loaderbtn, setLoaderbtn] = useState(false);
  function sign_in(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoaderbtn(false);
        localStorage.setItem("token", res.data.token);
        if (res.data.message === "success") {
          console.log(values)

          localStorage.setItem("email",JSON.parse(values).email)
          gothome("/home");
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
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Minimum eight characters, at least one letter, one number and one special character"
        )
        .required(),
    });
    return errors;
  }

  let registr = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoaderbtn(true);
      sign_in(JSON.stringify(values));
    },
  });

  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Register Now :</h2>
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
            <label htmlFor="Pass">Password:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="password"
              className="form-control mb-3"
              id="Pass"
            />
            {registr.errors.password && registr.touched.password ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.password}
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
            <Link to="/forgetPass" className="forgetPass">
              Forgot Password ?
            </Link>
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

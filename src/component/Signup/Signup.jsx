import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import Footer from '../footer/Footer';

export default function Signup() {
  let [err, setErr] = useState('')
  let gotSignin=useNavigate()
  function sign_up(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.message === 'success') {
          gotSignin('/signin')
        }
      })
      .catch((err) => {
        setErr(err?.response?.data?.message);
      });
}

  function validationSchema() {
    const errors = Yup.object({
      name: Yup.string().min(3).max(20).required(),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        )
        .required(),
      password: Yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character"
      ).required(),
      rePassword:Yup.string().oneOf([Yup.ref('password')]).required()
    });
    return errors;
}

  let registr = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
sign_up(JSON.stringify(values))
    },
  });


  return (
    <>
      <div style={{ paddingTop: "74.49px" }}>
        <div className="w-75 m-auto my-5">
          <h2>Register Now :</h2>
          <form onSubmit={registr.handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="text"
              name="name"
              id="Name"
              className="form-control mb-3"
            />
            {registr.errors.name && registr.touched.name ? (
              <div className="alert alert-danger " role="alert">
                {registr.errors.name}
              </div>
            ) : (
              ""
            )}
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
            <label htmlFor="rPass">RePassword:</label>
            <input
              onBlur={registr.handleBlur}
              onChange={registr.handleChange}
              type="password"
              name="rePassword"
              className="form-control mb-3"
              id="rPass"
            />
            {registr.errors.rePassword && registr.touched.rePassword ? (
              <div className="alert alert-danger" role="alert">
                {registr.errors.rePassword}
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

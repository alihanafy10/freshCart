import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import bground from '../assets/images/light-patten.svg'
import SocialIcons from '../component/socialIcons/SocialIcons';
import Footer from '../component/footer/Footer';
export default function AuthenticationLayout() {
  return (
    <>
      <img
        src={bground}
        alt="backGround"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-1",
          top: "0",
          left: "0",
          right: "0",
          objectFit: "cover",
        }}
      />
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 "
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="mt-2">
                <SocialIcons sizeng={1.3} area={""} />
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Signin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <div
        style={{
          position: "relative",
          bottom: "-17vh",
          left: "0",
          width: "100%",
        }}
      >
        <Footer />
      </div>
    </>
  );
}

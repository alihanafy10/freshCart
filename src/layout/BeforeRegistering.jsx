import React, { useState } from 'react'
import logo from "../assets/images/freshcart-logo.svg";
import { Link, NavLink, Outlet } from 'react-router-dom';
import MyVerticallyCenteredModal from '../component/goSignIn/GoSignIn';
import bground from '../assets/images/light-patten.svg'
import SocialIcons from '../component/socialIcons/SocialIcons';
export default function BeforeRegistering() {
  const [modalShow, setModalShow] = useState(false);
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
        className="navbar navbar-expand-lg navbar-light bg-light py-3"
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
              <li className="mt-1">
                <SocialIcons sizeng={1.3} area={""} />
              </li>
              <li className="li-nav">
                <NavLink
                  onClick={() => setModalShow(true)}
                  className="a-nav btn position-relative me-3 border-0"
                >
                  <i className="fa-solid fa-cart-shopping" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    4<span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Outlet />
    </>
  );
}

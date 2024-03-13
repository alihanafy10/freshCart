import React, {  useEffect, useState } from 'react'
import Footer from '../footer/Footer';
import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';


export default function Profile() {
  
  const[data,setData]=useState(null)
  useEffect(() => {
    const decode=jwtDecode(localStorage.getItem('token'));
    setData(decode)
  },[])
  return (
    <>
      <div className="container my-5" style={{ paddingTop: "74.49px" ,Bottom:'100px'}}>
        <div className="shadow p-5">
          <div className="d-flex mb-5">
            <i className="fa-solid fa-circle-user mt-2 fs-3 me-3"></i>
            <div>
              <h2>Your Info</h2>
              <ul style={{ listStyle: "none" }}>
                <li>
                  Name: <span className="fw-bold">{data?.name}</span>
                </li>
                <li>
                  Email: <span className="fw-bold">{localStorage.getItem('email')}</span>
                </li>
                <li>
                  Your role: <span className="fw-bold">{data?.role}</span>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-5">
            <NavLink
              to="/UpdateData"
              className="linkItem d-flex align-items-center"
            >
              <i className="fa-solid fa-pen-to-square mt-2 fs-3 me-3"></i>
              <h4 className="m-0">Update Your Data</h4>
            </NavLink>
          </div>
          <div className="mb-5">
            <NavLink
              to="/UpdatePass"
              className="linkItem d-flex align-items-center"
            >
              <i className="fa-solid fa-wrench mt-2 fs-3 me-3"></i>
              <h4 className="m-0">Update Your PassWord</h4>
            </NavLink>
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
}

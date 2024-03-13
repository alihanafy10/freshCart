import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import Footer from '../footer/Footer'
import AccordItem from './AccordItem'
import Accordion from "react-bootstrap/Accordion";

export default function Allorders() {
  let {id}=jwtDecode(localStorage.getItem('token'))
  function getAllOredries() {
  return axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`).then((data)=>data).catch((err)=>err)
  }
  let {data,isLoading}=useQuery('getAllOrder',getAllOredries)
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      <div
        className="container my-4 "
        style={{ paddingTop: "195.49px", paddingBottom: "150px" }}
      >
        {data?.data?.length ? (
          <Accordion defaultActiveKey="0" >
            {data?.data?.map((item, idx) => {
              return <AccordItem key={item?._id} item={item} idx={idx + 1} />;
            })}
          </Accordion>
        ) : (
          <div className="my-4 text-center fs-2">There are no orders!</div>
        )}
      </div>
      {data?.data?.length ? (
        <Footer />
      ) : (
        <div
          style={{
              position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          <Footer />
        </div>
      )}
    </>
  );
}

import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import Footer from '../footer/Footer'
import Brand from '../Brand/Brand'

export default function Brands() {
  function getBrand(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data ,isLoading}=useQuery('getbrand',getBrand)
  console.log(data)
  if(isLoading){
    return <Loader/>
  }
  return <>
  <div className="container my-5" style={{paddingTop:'74.49px'}}>
    <div className='row g-3'>
        {
          data?.data?.data?.map((item)=>{
            return(
             <Brand key={item._id} item={item}/>
            )
          })
        }
      
    </div>
  </div>
  <Footer/>
  </>
}

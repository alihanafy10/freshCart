import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import PaginatedItems from './ReactPaginate'
import { storeContext } from '../../context/storeContext'
import { useQuery } from 'react-query'

export default function DataPagination() {
  let {setLoading}=useContext(storeContext)

  function getProduct(){
    setLoading(0)
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
let { data } =useQuery('getProduct',getProduct)
  
  return (
    <>
      <PaginatedItems data={data?.data}/>
    </>
  )
 
}

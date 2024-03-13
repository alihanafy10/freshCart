import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import Categorie from '../Categorie/Categorie'
import Footer from '../footer/Footer'

export default function Categories() {
  function getCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')

  }

  let { data,isLoading } =useQuery('getCategory',getCategory)
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
    <div className='container my-5' style={{paddingTop:'74.49px'}}>
      <div className='colomns ' >
        {data?.data?.data.map((item)=><Categorie key={item._id} item={item}/>)}
      </div>
    </div>
    {(data.status==200)?<Footer/>:<div style={{position:'absolute',bottom:'0',left:'0',width:'100%'}}><Footer/></div>}
    </>
  )
}

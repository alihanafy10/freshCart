import axios from "axios";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import Footer from "../footer/Footer";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";

export default function Products() {
  let { getWishlist } = useContext(storeContext);
  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data,isLoading } =useQuery('getProduct',getProduct)
  let { data:dataWish ,refetch} = useQuery("getWish",getWishlist);
  let Arr = dataWish?.data?.data?.map((item) => item._id);
  // console.log(Arr);
  
  if (isLoading) {
    return <Loader />;
  }
   return (
     <>
       <div className="container my-3" style={{paddingTop:'74.49px'}}>
         <div className="row ">
           {data?.data?.data?.map((item) => {
             return (
               <Product
                 item={item}
                 key={item._id}
                 arrIdWish={Arr}
                 refetch={refetch}
               />
             );
           })}
         </div>
       </div>
       <Footer/>
     </>
   );
  
}


/*
قبل ال react Query
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";

export default function Products() {
  let [prouducts, setProuducts] = useState();
  async function getData() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProuducts(data.data);
  }
  useEffect(() => {
    getData();
  }, []);
  if (prouducts) {
   return (
     <>
       <div className="container my-3">
         <div className="row ">
           {prouducts.map((item) => {
             return <Product item={item} key={item._id} />;
           })}
         </div>
       </div>
     </>
   );
  }
  else {
    return (
      <Loader/>
    );
  }
}

*/
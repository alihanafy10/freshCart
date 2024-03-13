import React, { useContext } from 'react'
import { storeContext } from '../../context/storeContext';
import { toast } from 'react-toastify';

export default function CartSon({item,refetch}) {

  let {updatetCart,deletCart,setCounter} = useContext(storeContext);

  async function deletCartt(id){
    
   let dataOfDelet=await deletCart(id)
   if(dataOfDelet?.data?.status=="success"){

     toast.success("Removed")
     setCounter(dataOfDelet?.data?.numOfCartItems)
     refetch()
   }else{
    toast.error("Deletion error")
   }
  }
  async function updatetCartt(id,count){
   let dataOfupdate=await updatetCart(id,count)
   if(dataOfupdate?.data?.status=="success"){
    
     toast.success("The update succeeded")
     setCounter(dataOfupdate?.data?.numOfCartItems)
     refetch()
   }else{
    toast.error("Error updating")
   }
  }

  return (
    <div  className="row p-2 my-3 g-3">
              <div className="col-md-1">
                <img src={item.product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <p className="mb-2">{item.product.title}</p>
                  <p className="text-main mb-2">Price : {item.price} EGP</p>
                  <button
                  onClick={() => deletCartt(item.product._id)} className="btn bg-main text-white">
                    
                        <i className="fa-solid fa-trash-can pe-2"></i>
                        Remove
                      
                    
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button onClick={()=>updatetCartt(item.product._id,item.count+1)} className="btn fs-2 border-main py-0">+</button>
                  <span className="px-2">{item.count}</span>
                  <button disabled={item.count<=1} onClick={()=>updatetCartt(item.product._id,item.count-1)} className="btn fs-2 border-main py-0">-</button>
                </div>
              </div>
            </div>
  )
}

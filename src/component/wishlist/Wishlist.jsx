import React, { useContext } from 'react'
import Footer from '../footer/Footer';
import { storeContext } from '../../context/storeContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import WishlistSon from '../WishlistSon/WishlistSon';

export default function Wishlist() {
  let { wishlistCounter, getWishlist, setWishlistCounter } =
    useContext(storeContext);
  let { data, isLoading ,refetch} = useQuery("getWish", getWishlist);
  let Arr = data?.data?.data?.map((item) => item._id);
  setWishlistCounter(data?.data?.data?.length) 
  if(isLoading) return<Loader/>;
  return (
    <>
      <div className="container my-5" style={{ paddingTop: "74.49px",paddingBottom:'40px' }}>
        {wishlistCounter ? (
          <div className="row">
            {data?.data?.data?.map((item) => {
              return (
                <WishlistSon
                  key={item._id}
                  item={item}
                  arrIdWish={Arr}
                  refetch={refetch}
                />
              );
            })}
          </div>
        ) : (
          <h2
            className="text-center my-5"
            style={{ paddingTop: "185.49px", paddingBottom: "200px" }}
          >
            wishlist is empty.
          </h2>
        )}
      </div>
      <Footer />
    </>
  );
}

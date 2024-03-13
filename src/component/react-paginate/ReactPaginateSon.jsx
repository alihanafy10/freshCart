import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storeContext } from '../../context/storeContext';
import MyVerticallyCenteredModal from '../goSignIn/GoSignIn';
import BigLoader from '../BigLoader/BigLoader';

export default function ReactPaginateSon({ item, arrIdWish, refetch }) {
  let x = useNavigate();
  
  const [modalShow, setModalShow] = useState(false);
  let [load, setLoad] = useState(1);
  let {
    setCounter,
    addToCart,
    setWishlistCounter,
    DeleteWishlist,
    addToWishlist,
    block,
    setBlock,
  } = useContext(storeContext);
const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  async function addproductToCart(productId) {
    setLoad(0);
    try {
      let { data } = await addToCart(productId);
      if (data.status === "success") {
        toast.success("Product added successfully");
        setCounter(data.numOfCartItems);
        setLoad(1);
      }
    } catch (error) {
    } finally {
      setLoad(1);
    }
  }

  function chikonclik(item) {
    if (localStorage.getItem("token")) {
      if (isOnline) {
        x(`/product-delales/${item}`);
      } else {
        toast.error("Error you are offline");
      }
    } else {
      setModalShow(true);
    }
  }

  function chikonBtn(item) {
    if (isOnline) {
      if (localStorage.getItem("token")) {
        setLoad(0);
        addproductToCart(item).finally(() => {
          setLoad(1);
        });
      } else {
        setModalShow(true);
      }
    } else {
      toast.error("Error you are offline");
    }
  }

  function chekLoading() {
    if (localStorage.getItem("token")) {
      if (load) {
        return (
          <>
            Add
            <i className="fa-solid fa-cart-shopping ps-2" />
          </>
        );
      } else {
        return <>Loading...</>;
      }
    } else {
      return (
        <>
          Add
          <i className="fa-solid fa-cart-shopping ps-2" />
        </>
      );
    }
  }
  async function addToWash(productId) {
  setBlock('block')
  let { data } = await addToWishlist(productId);
    if (data?.status == "success") {
      toast.success("Product added successfully");
      setWishlistCounter(data?.data?.length);
      await refetch();
      await setBlock("none");
  }
}
  async function DeleteToWash(productId) {
  setBlock("block");
  let { data } = await DeleteWishlist(productId);
    if (data?.status == "success") {
      toast.success("Product Deleted successfully");
      setWishlistCounter(data?.data?.length);
      await refetch();
       await setBlock("none");
  }
}
function chiking() {
  if (isOnline) {
    if (localStorage.getItem('token')) {
      if (!arrIdWish?.includes(item?._id.toString())) {
        addToWash(item._id);
      } else {
        DeleteToWash(item._id);
      }
    }
    else {
      setModalShow(true);
    }
  } else {
    toast.error('You are offline now')
  }
}
  return (
    <>
        <BigLoader state={block} />
      <div className="col-lg-2 col-md-3 col-sm-6 position-relative my-3">
        <div className="product p-3 rounded-3 cursor-pointer">
          <i
            onClick={() => chiking()}
            className={`${
              arrIdWish?.includes(item?._id.toString())
                ? "fa-solid fa-heart text-danger"
                : "fa-regular fa-heart"
            }`}
          ></i>
          <Link onClick={() => chikonclik(item._id)}>
            <img src={item.imageCover} className="w-100" alt="imageCover" />
            <span className="text-main">{item.category.name}</span>
            <h5 className="mt-3">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between">
              <div>
                <p>{item.price}EGP</p>
              </div>
              <div>
                <i className="fa-solid fa-star pe-1 rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            disabled={!load}
            className="btn bg-main w-100 text-white"
            onClick={() => chikonBtn(item._id)}
          >
            {chekLoading()}
          </button>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

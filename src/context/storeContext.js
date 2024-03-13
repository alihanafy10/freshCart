import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export let storeContext = createContext(0);
export default function StoreContextProvider({ children }) {
  async function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  async function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }
  async function deletCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }
  async function updatetCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  async function pay(id, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  async function deletAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((data) => data)
      .catch((err) => err);
  }

  async function addToWishlist(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  async function DeleteWishlist(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  let [counter, setCounter] = useState(0);
  let [loading, setLoading] = useState(1);
  let [bosLoad, setBosLoad] = useState(0);
  let [wishlistCounter, setWishlistCounter] = useState(0);

  const userId = null;

  return (
    <storeContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        loading,
        setLoading,
        deletCart,
        updatetCart,
        pay,
        deletAllCart,
        bosLoad,
        setBosLoad,
        userId,
        addToWishlist,
        wishlistCounter,
        setWishlistCounter,
        getWishlist,
        DeleteWishlist,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

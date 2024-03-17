
import './App.css';
import { RouterProvider ,createBrowserRouter, createHashRouter} from 'react-router-dom';
import AuthenticationLayout from './layout/AuthenticationLayout';
import MainLayout from './layout/MainLayout';
import Home from './component/Home/Home';
import Products from './component/Products/Products';
import Cart from './component/Cart/Cart';
import Categories from './component/Categories/Categories';
import Brands from './component/Brands/Brands';
import NotFound from './component/NotFound/NotFound';
import Signin from './component/Signin/Signin';
import Signup from './component/Signup/Signup';
import Gard from './component/Gard/Gard';
import ProductDetales from './component/ProductDetales/ProductDetales';
import StoreContextProvider from './context/storeContext';
import { ToastContainer } from 'react-toastify';
import BeforeRegistering from './layout/BeforeRegistering';
import WelcomePage from './component/WelcomePage/WelcomePage';
import { Offline, Online } from "react-detect-offline";
import OfflinePage from './component/offlinePage/OfflinePage';
import GetAllSubCategoriesOnCategory from './component/Get All SubCategories On Category/GetAllSubCategoriesOnCategory';
import BrandsDetal from './component/BrandsDetal/BrandsDetal';
import ForgetPass from './component/ForgetPass/ForgetPass';
import VerifyResetCode from './component/VerifyResetCode/VerifyResetCode';
import ResetPassword from './component/Reset Password/ResetPassword';
import Handala from './component/handala/Handala';
import Address from './component/Address/Address';
import Allorders from './component/allorders/Allorders';
import Wishlist from './component/wishlist/Wishlist';
import Profile from './component/Profile/Profile';
import UpdateData from './component/Update/UpdateData';
import UpdatePass from './component/Update/UpdatePass';
import ScrollButton from './component/scrollBTN/ScrollButton';


export default function App() {

  const routes = createHashRouter([
    {
    
      path: '/', element: <BeforeRegistering />, children: [
        { index: true, element: <Handala><WelcomePage/></Handala> },
      ]
    
  }
    ,
  
    {
      path: '/', element: <AuthenticationLayout />, children: [
        { index: true, element:  <Handala><Signin/></Handala>},
        {path: 'signin',element:<Handala><Signin/></Handala>},
        { path: 'signup', element: <Handala><Signup /></Handala> },
        {path:'forgetPass',element:<Handala><ForgetPass/></Handala>},
        {path:'VerifyResetCode',element:<Handala><VerifyResetCode/></Handala>},
        {path:"ResetPassword",element:<Handala><ResetPassword/></Handala>},
        {path:'*',element: <NotFound />},
      ]
    }
    ,
    {
      path: '/', element: <MainLayout />, children: [
      { index: true, element:  <Gard><Home /></Gard>},
        {path:'home',element: <Gard><Home /></Gard>},
        {path:'products',element: <Gard><Products /></Gard>},
        {path:'cart',element: <Gard><Cart /></Gard>},
        {path:'wishlist',element: <Gard><Wishlist/></Gard>},
        {path:'categories',element: <Gard><Categories /></Gard>},
        {path:'brands',element: <Gard><Brands /></Gard>},
        {path:'brands/:id',element:<Gard><BrandsDetal/></Gard>},
        {path:'product-delales/:id',element: <Gard><ProductDetales /></Gard>},
        {path:'categories/:id' ,element:<Gard><GetAllSubCategoriesOnCategory/></Gard>},
        {path:'address/:id' ,element:<Gard><Address/></Gard>},
        {path:'allorders' ,element:<Gard><Allorders/></Gard>},
        {path:'offline',element: <Gard><OfflinePage/></Gard>},
        {path:'profile',element: <Gard><Profile/></Gard>},
        {path:'UpdateData',element: <Gard><UpdateData/></Gard>},
        {path:'UpdatePass',element: <Gard><UpdatePass/></Gard>},
        {path:'*',element: <NotFound />},
      ]
    },
  ]);
  return (
    <>
      
      <StoreContextProvider>
        <RouterProvider router={routes} />
        </StoreContextProvider>
      
      

      
      <ToastContainer theme='colored' autoClose={1000} />


      <Offline>
        <div className='offline d-flex justify-content-center align-items-center'>You’re offline now <p className='m-0 ms-2'></p></div>
      </Offline>
      <ScrollButton/>
    </>
  );
}


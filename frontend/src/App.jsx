import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Shipping from './pages/Shipping';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { get_category } from '../src/store/reducers/homeReducer';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import DashBoard from './pages/DashBoard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import Wishlist from './components/dashboard/WishList';
import OrderDetails from './components/dashboard/OrderDetails';

function App() {

  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(get_category())
 
},[])

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}  />
    <Route path='/shops' element={<Shops/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/shipping' element={<Shipping/>} />
    <Route path='/products?' element={<CategoryShop/>} />
    <Route path='/products/search?' element={<SearchProducts/>} />
    <Route path='/product/details/:slug' element={<Details/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/payment' element={<Payment/>} />
    <Route path='/dashboard' element={<ProtectUser/>} >
    <Route path='' element={<DashBoard/>} >
    <Route path='' element={<Index/>} />
    <Route path='my-orders' element={<Orders/>} /> 
    <Route path='change-password' element={<ChangePassword/>} /> 
    <Route path='wish-list' element={<Wishlist/>} /> 
    <Route path='order/details/:orderId' element={<OrderDetails/>} /> 
    </Route>
    </Route>

  </Routes>
  
  
  </BrowserRouter>
  );
}

export default App;

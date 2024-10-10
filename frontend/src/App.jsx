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
    <Route path='/product/details/:slug' element={<Details/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
  </Routes>
  
  
  </BrowserRouter>
  );
}

export default App;

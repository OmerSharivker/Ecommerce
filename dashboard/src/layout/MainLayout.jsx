import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomers, updateSellers } from '../store/Reducers/chatReducer';
const MainLayout = () => {

    const {userInfo } = useSelector(state => state.auth)
     const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo && userInfo.role === 'seller') {
            socket.emit('add_seller', userInfo._id,userInfo)
        } else {
            socket.emit('add_admin', userInfo)
        }
    },[userInfo])

    useEffect(() => {
      socket.on('activeSeller',(sellers)=>{
        dispatch(updateSellers(sellers))
      })
      socket.on('activeCustomer',(customers)=>{
        dispatch(updateCustomers(customers))
      })
    },)

    const [showSideBar,setShowSideBar]=useState(false);
     
    return (
        <div className='bg-[#cdcae9] w-full  min-h-screen'>
            <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
            <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>      
            <div className= 'ml-0 lg:ml-[260px] pt-[95px] transition-all'> <Outlet/></div>
        </div>
    );
};

export default MainLayout;
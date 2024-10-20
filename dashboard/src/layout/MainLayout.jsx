import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import { useSelector } from 'react-redux';
const MainLayout = () => {

    const {userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo && userInfo.role === 'seller') {
            socket.emit('add_seller', userInfo._id,userInfo)
        } else {
            socket.emit('add_admin', userInfo)
        }
    },[userInfo])

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
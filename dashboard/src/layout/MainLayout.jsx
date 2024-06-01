import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {

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
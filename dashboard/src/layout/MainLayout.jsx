import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <h1>main layout <Outlet/></h1>
        </div>
    );
};

export default MainLayout;
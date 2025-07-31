import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './index.css';

const MainLayout = () => {
    return (
        <div className="main-container">
            <div >
                <Sidebar />
            </div>

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
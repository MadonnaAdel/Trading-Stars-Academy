import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../adminComponents/Sidebar/SideBar';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <main style={{ flex: 1, padding: '20px', width:'80%'}}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

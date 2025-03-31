import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../adminComponents/Sidebar/SideBar';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: '' }}> 
   
         <SideBar />

 
    <main style={{ flex:2, padding:"20px", width: '80%' }}>
      <Outlet />
    </main>
   
  </div>
  
  );
}

export default DashboardLayout;

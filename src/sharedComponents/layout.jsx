import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../userComponents/NavBar/navbar';
import Footer from '../userComponents/footet';
function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

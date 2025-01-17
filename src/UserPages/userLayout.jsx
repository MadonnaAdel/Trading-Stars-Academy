import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../userComponents/NavBar/navbar';
import Footer from '../userComponents/footer/footer';


const Layout = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/candidate';

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;

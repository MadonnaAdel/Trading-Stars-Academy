import React from 'react';
import HeroHome from '../userComponents/heroSection/heroHome';
import Navbar from '../userComponents/NavBar/navbar';
import Footer from '../userComponents/footet';
import Info from '../userComponents/info/Info';

const Home = () => {
  return (
    <div>
      <Navbar/>
     <HeroHome />
     <Info/>
      <Footer/>
    </div>
  );
};

export default Home;

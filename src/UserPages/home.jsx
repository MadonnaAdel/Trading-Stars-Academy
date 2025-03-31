import React from 'react';
import HeroHome from '../userComponents/heroSection/heroHome';
import Info from '../userComponents/info/Info';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsHomSec from '../userComponents/cardsHomSec';
import VideoSlider from '../userComponents/sliderComponent/slider';
const videos1 = [
  { src: "/1.mp4", title: "الفرق بين التداول والتسويق" },
  { src: "/2.mp4", title: "مؤتمر محافظة سوهاج للتعليم التداول" },
  { src: "/3.mp4", title: "   مؤتمر محافظة المنيا للتعليم التداول" },

]
const videos2 = [
  { src: "/4.mp4", title: "مؤتمر محافظة القاهرة للتعليم التداول" },
  { src: "/5.mp4", title: "مؤتمر محافظة اسيوط للتعليم التداول" },
  { src: "/6.mp4", title: "ليدر شيب للقادة للتعليم مهارات القيادة في التسويق والتداول ف محافظة اسيوط" },

]



const Home = () => {
  return (
    <div>
      <HeroHome />
      <CardsHomSec />
      <section className="my-5">
        <div className="container text-white">
          
      <VideoSlider videos={videos1}/>
        </div>

        
      </section>
      <Info />


      <section className='my-5'>
        <div className="container text-white">
                <VideoSlider videos={videos2}/>

        </div>

      </section>
    </div>
  );
};

export default Home;

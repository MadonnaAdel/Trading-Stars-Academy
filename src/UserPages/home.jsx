import React from 'react';
import HeroHome from '../userComponents/heroSection/heroHome';
import Info from '../userComponents/info/Info';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsHomSec from '../userComponents/cardsHomSec';
const videos1=[
  {video:"/1.mp4",title:"الفرق بين التداول والتسويق"},
  {video:"/2.mp4",title:"الفرق بين التداول والتسويق"},
  {video:"/3.mp4",title:"الفرق بين التداول والتسويق"},

]
const videos2=[
  {video:"/4.mp4",title:"الفرق بين التداول والتسويق"},
  {video:"/5.mp4",title:"الفرق بين التداول والتسويق"},
  {video:"/6.mp4",title:"الفرق بين التداول والتسويق"},

]
const ExampleCarouselIframe = ({ videoSrc, title }) => {
  return (
    <video
      className="d-block w-100"
      width="100%"
      height="400"
      controls
    >
      <source src={videoSrc} type="video/mp4" />
      {`Your browser does not support the video tag. You can download the video `}
      <a href={videoSrc} download>
        here
      </a>.
    </video>
  );
};


const Home = () => {
  return (
    <div>
      <HeroHome />
      <CardsHomSec />
      <section className="my-5">
        <div className="container text-white">
        <Carousel interval={null}>
  {videos1 &&
    videos1.map((video, index) => (
      <Carousel.Item key={index}>
        <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
          <ExampleCarouselIframe videoSrc={video.video} title="First video" />
        </div>
        <Carousel.Caption>
          <div className="caption bg-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
            <h3>{video.title}</h3>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
</Carousel>

        </div>

        <style jsx>{`
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: blue;
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      `}</style>
      </section>
      <Info />


      <section className='my-5'>
        <div className="container text-white">
          <Carousel interval={null}>
          {videos2 &&
    videos2.map((video, index) => (
      <Carousel.Item key={index}>
        <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
          <ExampleCarouselIframe videoSrc={video.video} title="First video" />
        </div>
        <Carousel.Caption>
          <div className="caption bg-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
            <h3>{video.title}</h3>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
          </Carousel>
        </div>

        <style jsx>{`
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: blue;
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      `}</style>
      </section>
    </div>
  );
};

export default Home;

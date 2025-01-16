import React from 'react';
import HeroHome from '../userComponents/heroSection/heroHome';
import Info from '../userComponents/info/Info';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsHomSec from '../userComponents/cardsHomSec';

const ExampleCarouselIframe = ({ videoSrc, title }) => {
  const modifiedSrc = `${videoSrc}?autoplay=0`;

  return (
    <iframe
      className="d-block w-100"
      width="100%"
      height="400"
      src={modifiedSrc}
      title={title}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
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
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/1.mp4" title="First video" />
              </div>
              <Carousel.Caption>
                <div className="caption bg-white text-dark p-3 mt-3 " style={{ borderRadius: '8px' }}>
                  <h3>الفرق بين التداول والتسويق</h3>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/2.mp4" title="Second video" />
              </div>
              <Carousel.Caption>
                <div className="caption text-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/3.mp4" title="Third video" />
              </div>
              <Carousel.Caption>
                <div className="caption text-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
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
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/6.mp4" title="First video" />
              </div>
              <Carousel.Caption>
                <div className="caption bg-white text-dark p-3 mt-3 " style={{ borderRadius: '8px', width: 'contant-fit' }}>
                  <h3>الفرق بين التداول والتسويق</h3>

                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/4.mp4" title="Second video" />
              </div>
              <Carousel.Caption>
                <div className="caption text-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="video-wrapper" style={{ width: '700px', marginInline: 'auto' }}>
                <ExampleCarouselIframe videoSrc="/5.mp4" title="Third video" />
              </div>
              <Carousel.Caption>
                <div className="caption text-white text-dark p-3 mt-3" style={{ borderRadius: '8px' }}>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
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

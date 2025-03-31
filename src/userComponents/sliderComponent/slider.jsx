import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

const VideoSlider = ({ videos }) => {
  const videoRefs = useRef([]);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
  };

  return (
    <Swiper navigation modules={[Navigation]} className="mySwiper">
      {videos.map((video, index) => (
        <SwiperSlide key={index} className="position-relative text-center">
          <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow-lg border-0" style={{ width: "100%", maxWidth: "800px" }}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                width="100%"
                controls
                className="card-img-top rounded"
                onPlay={() => handlePlay(index)}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="card-body text-white bg-dark text-center p-2">
                <h6 className="mb-0">{video.title}</h6>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSlider;

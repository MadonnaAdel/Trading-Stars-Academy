import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";


const VideoSlider = ({ videos }) => {
  return (
    <Swiper navigation modules={[Navigation]} className="mySwiper">
      {videos.map((video, index) => (
        <SwiperSlide key={index} className="relative">
           <video width="100%" controls>
          <source src={video.src} type="video/mp4" />
        </video>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
            {video.title}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSlider;

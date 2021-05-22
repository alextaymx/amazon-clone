import React from "react";
import { Carousel } from "react-responsive-carousel";
import Fade from 'react-reveal/Fade';

function Banner() {
  return (
    <Fade>
      <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img loading="lazy" src="/banners/banner1.jpg" />
          </div>
          <div>
            <img loading="lazy" src="/banners/banner2.jpg" />
          </div>
          <div>
            <img loading="lazy" src="/banners/banner3.jpg" />
          </div>
        </Carousel>
      </div>
    </Fade>
  );
}

export default Banner;

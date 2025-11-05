import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const VideoBanner = () => {
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        loop
        muted
        className="w-full h-auto max-h-[90vh] object-cover"
        poster="https://www.allbirds.com/cdn/shop/files/preview_images/6536f45d300b4f489b06b7774d2d58b8.thumbnail.0000000000.jpg?v=1761089483&width=1024"
      >
        <source 
          src="https://www.allbirds.com/cdn/shop/videos/c/vp/6536f45d300b4f489b06b7774d2d58b8/6536f45d300b4f489b06b7774d2d58b8.HD-1080p-7.2Mbps-60534925.mp4" 
          type="video/mp4" 
        />
        <img 
          src="https://www.allbirds.com/cdn/shop/files/preview_images/6536f45d300b4f489b06b7774d2d58b8.thumbnail.0000000000.jpg?v=1761089483&width=2840" 
          alt="Featured product"
        />
      </video>
    </div>
  );
};

export default VideoBanner;

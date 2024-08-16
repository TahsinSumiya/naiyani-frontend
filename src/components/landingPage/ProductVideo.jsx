import iphone from "../../assets/video/iphone.png";
import productVideo from "../../assets/img/first-video.gif";
import { useEffect, useState } from "react";

const ProductVideo = () => {
  const [preloadedImage, setPreloadedImage] = useState(null);
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = productVideo;
    preloadImage.onload = () => setPreloadedImage(preloadImage);
    return () => {
      // Cleanup function for memory management
      preloadImage.onload = null;
    };
  }, []);

  return (
    <div className="relative ">
      <img
        src={iphone}
        alt="iPhone"
        className="lg:w-[385px] w-[320px] lg:h-[630px] h-[550px] z-50"
      />
      {preloadedImage && (
        <img
          className="absolute inset-0 lg:w-[280px] lg:h-[500px] h-[400px] lg:mx-[50px] w-[230px] mx-[45px]  my-[60px]"
          src={productVideo}
          alt="productVideo"
        />
      )}
      {/* <video
        className="absolute inset-0 lg:w-[280px] lg:h-[500px] h-[400px] lg:mx-[50px] w-[230px] mx-[45px]  my-[60px] "
        src={firstVideo}
        autoPlay
        muted
        loop
        playsInline
      /> */}
      {/* <ReactPlayer
        className="absolute inset-0 lg:w-[280px] lg:h-[500px] h-[400px] lg:mx-[50px] w-[230px] mx-[45px]  my-[60px] border-none outline-none"
        url={firstVideo}
        playing={true}
        muted={true}
        loop={true}
        playsInline={true}
      /> */}
    </div>
  );
};

export default ProductVideo;

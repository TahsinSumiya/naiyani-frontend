import iphone from "../../assets/video/iphone.png";
import databaseGif from "../../assets/img/database.gif";

const CategoriesVideo = () => {
  return (
    <div className="relative">
      <img
        src={iphone}
        alt="iPhone"
        className="lg:w-[385px] w-[320px] lg:h-[630px] h-[550px] z-50"
      />
      {/* <video
        className="absolute inset-0 lg:w-[280px] lg:h-[500px] h-[400px] lg:mx-[47px] w-[230px] mx-[45px] my-[60px] border-none outline-none"
        src={secondVideo}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      /> */}

      <img
        className="absolute inset-0 lg:w-[280px] lg:h-[500px] h-[400px] lg:mx-[47px] w-[230px] mx-[45px] my-[60px] shadow-none border-none outline-none"
        src={databaseGif}
        alt=""
      />
    </div>
  );
};

export default CategoriesVideo;

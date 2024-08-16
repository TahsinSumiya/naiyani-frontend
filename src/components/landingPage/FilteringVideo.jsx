import filteringVideo from "../../assets/img/advanced-filtering.gif";
import macbook from "../../assets/video/macbook.png";

const FilteringVideo = () => {
  return (
    <div className="relative ">
      <img
        src={macbook}
        alt="macbook"
        className="lg:w-[600px] w-[300px]  h-full z-50"
      />
      <img
        className="absolute inset-0  lg:w-[470px] w-[230px]  lg:h-[280px] h-[150px] lg:left-16 left-8 lg:top-32 top-16"
        src={filteringVideo}
        alt="filtering"
      />
      {/* <video
        className="absolute inset-0  lg:w-[470px] w-[230px] lg:h-[530px] h-[280px] lg:left-16 left-8"
        src={filteringVideo}
        autoPlay
        muted
        loop
        playsInline
      /> */}
    </div>
  );
};

export default FilteringVideo;

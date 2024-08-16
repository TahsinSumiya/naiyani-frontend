import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const [borderLoop, setBorderLoop] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderLoop(false);
      setTimeout(() => {
        setBorderLoop(true);
      }, 0); // Restart the animation immediately
    }, 3000); // Adjust the interval to fit the animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold font-sans tracking-widest">
        NAIYANI
      </div>
      {borderLoop && (
        <div className="loadingBox ml-[-106px]">
          <div className="loadingInner"></div>
          <div className="loadingBox1">
            <div className="loadingInner1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;

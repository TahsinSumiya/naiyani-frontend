import { Toaster } from "react-hot-toast";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init();
    // AOS.init({ disable: "mobile" });
  }, []);

  return (
    <>
      <MainLayout />
      <Toaster />
    </>
  );
}

export default App;

import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

import "react-device-frameset/styles/marvel-devices.min.css";
import "./LandingPage.css";

import macbook from "../../assets/video/macbook.png";
import integrationEndVideo from "../../assets/img/desktop-naiyani.gif";

import Footer from "../../layouts/Footer";
import Navbar1 from "../../components/navbar/Navbar1";
import ProductVideo from "../../components/landingPage/ProductVideo";
import CategoriesVideo from "../../components/landingPage/CategoriesVideo";
import FilteringVideo from "../../components/landingPage/FilteringVideo";

const LandingPage = () => {
  return (
    <div className="lg:px-32 px-8 font-sans">
      {/*  */}
      <Navbar1 />

      {/* product DB div */}
      <div className="lg:flex lg:flex-row ">
        <div className=" lg:mr-20 flex flex-col">
          {/* heading */}
          <h1
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-delay="600"
            className="headerFont gradient-text text-lg  lg:text-[44px]  lg:leading-[7rem] leading-9 text-center lg:text-left aos-responsive"
          >
            Product database for E-commerce sellers
          </h1>

          {/* for mobile view video. hide for large */}
          <div className="block lg:hidden mx-auto">
            <ProductVideo />
          </div>

          {/* description */}
          <div className="lg:text-[20px] text-justify text-sm gradient-text leading-7">
            Naiyani’s database helps online sellers find products to resell on
            the world’s leading platforms.
          </div>
          {/* button */}

          <div className="lg:flex lg:flex-row flex flex-col items-center my-5 lg:gap-10 gap-3">
            <button
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
              }}
              className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white  border-none  font-semibold lg:text-[16px] text-[10px] flex items-center justify-between py-1 cursor-pointer"
            >
              <span className="px-5">START A 7-DAY FREE TRIAL</span>{" "}
              <FaArrowAltCircleRight className="h-[18px] w-[18px]  " />
            </button>
            <Link className="underline lg:text-lg text-[13px]">Learn more</Link>
          </div>
        </div>

        {/* mobile video for large device */}
        <div className="lg:block hidden">
          <ProductVideo />
        </div>
      </div>


      {/* Categories list div */}
      <div className="lg:flex lg:flex-row  my-16">
        {/* for large view video */}
        <div className="lg:block hidden">
          <CategoriesVideo />
        </div>
        <div className="lg:ml-12 flex flex-col">
          {/* heading */}
          <h1
            data-aos="fade-left"
            data-aos-duration="3000"
            data-aos-delay="200"
            className="headerFont gradient-text lg:text-[44px] text-lg leading-10 lg:leading-[7rem] text-center lg:text-left aos-responsive"
          >
            Comprehensive product listings in categories
          </h1>
          {/* mobile video for small device */}
          <div className="lg:hidden block mx-auto">
            <CategoriesVideo />
          </div>
          {/* description */}
          <p className="text-sm lg:text-[20px] leading-8 gradient-text text-justify">
            Easily navigate through a well-structured system of product
            categories, ensuring each product comes with detailed product
            listing including titles, images, ASINs, and other relevant details,
            allowing users to make informed decisions without missing critical
            information.
          </p>
        </div>
      </div>

      {/* Filtering div */}

      <div className="lg:flex lg:flex-row flex flex-col-reverse items-center">
        <div className="lg:mr-12 flex flex-col">
          {/* Header */}
          <h1
            data-aos="fade-right"
            data-aos-duration="3000"
            data-aos-delay="200"
            className="headerFont gradient-text lg:text-[44px] text-lg leading-9 lg:leading-[7rem] text-center lg:text-left aos-responsive"
          >
            Advanced Search and Filtering
          </h1>
          {/* mac view video for small device */}
          <div className="lg:hidden block mx-auto">
            <FilteringVideo />
          </div>
          {/* description */}
          <p className="lg:text-[20px] gradient-text text-justify text-sm leading-8  mt-6 lg:mt-0">
            Easily find and filter products based on various criteria such as
            category, price range, sales rank, and more, allowing users to
            quickly locate the most relevant products for their needs.
          </p>
        </div>

        {/* mac view video for large device */}
        <div className="hidden lg:block">
          <FilteringVideo />
        </div>
      </div>

      {/* Integration div  */}

      <div className=" my-8 mb-24 flex flex-col items-center">
        {/* Header */}

        <h1  data-aos="fade-up" 

    data-aos-delay="500"
    data-aos-duration="2000"
     className="headerFont  lg:text-[44px] text-lg leading-9 lg:leading-[7rem] text-center aos-responsive">
          Integration with Platform API’s
        </h1>
        {/* mac view video */}
        <div className="relative mx-auto">
          <img
            src={macbook}
            alt="macbook"
            className="lg:w-[600px] w-[300px]   z-50"
          />
          <img
            className="absolute inset-0  lg:w-[470px] w-[230px] lg:h-[300px] h-[150px] left-9 lg:left-16 lg:top-32 top-16 border-none outline-none "
            src={integrationEndVideo}
            alt="naiyani"
          />
          {/* <video
            className="absolute inset-0  lg:w-[470px] w-[230px] lg:h-[580px] h-[300px] left-9 lg:left-16 border-none outline-none "
            src={integrationEndVideo}
            autoPlay
            muted
            loop
            playsInline
          /> */}
        </div>
        <p className="lg:text-[20px] text-sm leading-8  gradient-text text-justify lg:px-8">
          Connects to platform API to access the latest information about
          products. This includes details like current prices, customer reviews,
          and information about the sellers offering the products. By utilizing
          platform API, our product database ensures that users have access to
          accurate and timely data to make informed decisions about their
          products and sales strategies.
        </p>
      </div>

      {/*  */}
      {/* <Contact /> */}

      <Footer />
    </div>
  );
};

export default LandingPage;

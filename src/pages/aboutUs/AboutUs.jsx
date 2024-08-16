/* eslint-disable react/no-unescaped-entities */
import Navbar1 from "../../components/navbar/Navbar1";
import Footer from "../../layouts/Footer";

import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="lg:px-32 px-8 font-sans">
      <Navbar1 />
      <div className="flex flex-col gap-32 my-4">
        <div
          data-aos="fade-right"
          data-aos-duration="3000"
          data-aos-delay="200"
          className="headerFont gradient-text lg:text-[44px] text-[28px] lg:text-left  text-center aos-responsive"
        >
          About Us
        </div>
        <div>
          <h1
            data-aos="fade-left"
            data-aos-duration="3000"
            data-aos-delay="200"
            className="headerFont gradient-text lg:text-[44px] text-[28px] lg:text-right text-center aos-responsive"
          >
            Our Vision
          </h1>
          <p className="text-justify gradient-text lg:text-[20px] text-base leading-9 ">
            Our vision is simple. We aim to make commerce easy and accessible
            for everyone. Our journey begins with the creation of an e-commerce
            platform where customers can find products with a single click,
            empowering them to explore, discover, and engage with the world
            around them like never before.
          </p>
        </div>
        <div>
          <h1
            data-aos="fade-right"
            data-aos-duration="3000"
            data-aos-delay="200"
            className="headerFont gradient-text lg:text-[44px] text-[28px] lg:text-left text-center aos-responsive"
          >
            What We Do
          </h1>
          <p className="text-justify gradient-text lg:text-[20px] text-base leading-9">
            At Naiyani, we're passionate about empowering each customer to
            unleash their entrepreneurial drive, setting the stage for success
            in the digital landscape and making online triumphs within reach. To
            put it simply: we find the product and you sell the product.
          </p>
        </div>
        <div>
          <h1
            data-aos="fade-left"
            data-aos-duration="3000"
            data-aos-delay="200"
            className="headerFont lg:text-[44px] lg:text-right text-center text-[28px] aos-responsive"
          >
            Our Values
          </h1>
          <div className="text-justify gradient-text lg:text-[20px] text-base leading-9">
            If you don't stand for something, you stand for nothing. Naiyani was
            founded on nine core values, which embody what we stand for,
            empowering us to make a difference.
          </div>
          <div className="text-center flex justify-center">
            <p className="values-text lg:text-[20px] text-lg leading-9 flex flex-col">
              <span className="line">Honestly and Integrity</span>

              <span className="line">Do the right thing</span>

              <span className="line">Innovate and Inspire</span>

              <span className="line">Long Term Thinking</span>

              <span className="line">Strive for operational excellence</span>

              <span className="line">Customer Focused</span>

              <span className="line">Speed is your friend</span>

              <span className="line">Be Empathetic</span>

              <span className="line">Have a champions mindset</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

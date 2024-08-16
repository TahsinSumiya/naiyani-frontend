/* eslint-disable react/no-unescaped-entities */
import { Input } from "antd";

import TextArea from "antd/es/input/TextArea";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "../../layouts/Footer";
import Navbar1 from "../../components/navbar/Navbar1";
import { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [textFocus, setTextFocus] = useState(false);

  const handleInputChange = (type, event) => {
    const inputValue = event.target.value;

    if (type === "email") {
      if (inputValue.length > 40) {
        event.target.style.fontSize = "12px";
      } else if (inputValue.length > 27) {
        event.target.style.fontSize = "15px";
      } else {
        event.target.style.fontSize = "20px";
      }
    }

    if (type === "firstName" || type === "lastName") {
      if (inputValue.length > 18) {
        event.target.style.fontSize = "12px";
      } else if (inputValue.length > 11) {
        event.target.style.fontSize = "15px";
      } else {
        event.target.style.fontSize = "20px";
      }
    }

    if (type === "message") {
      if (inputValue.length > 180) {
        event.target.style.fontSize = "15px";
      } else {
        event.target.style.fontSize = "20px";
      }
    }

    if (type === "firstName") {
      setFirstName(inputValue);
    } else if (type === "lastName") {
      setLastName(inputValue);
    } else if (type === "email") {
      setEmail(inputValue);
    } else if (type === "message") {
      setMessage(inputValue);
    }
  };

  return (
    <div className="lg:px-32 px-8 font-sans">
      <Navbar1 />
      <div className="flex lg:flex-row flex-col items-center gap-12 mb-12">
        {/* left */}
        <div className="flex flex-col text-center gap-12 text-[#A1A1A1] headerFont gradient-text lg:text-[30px] text-xl ">
          <div>
            Hello there<span className="font-serif font-bold">,</span>
          </div>
          <div className="lg:leading-[4rem] leading-9">
            Seems like you have something to ask us
          </div>
          <div className="text-[20px] font-sans"> Tell us how can we help</div>
        </div>
        {/* right */}
        <div className=" flex flex-col items-center gap-5 ">
          <div
            style={{
              boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
            }}
            className="lg:w-[400px] lg:text-[18px] headerFont text-[#A1A1A1] px-8  text-[12px] rounded-[50px] bg-white border-none font-bold py-3 text-center lg:mb-4"
          >
            Let's get in touch
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="gradient-button lg:w-[230px] w-[170px] bg-white">
              <Input
                type="text"
                autoComplete="true"
                className="w-full h-full expanding-input "
                onChange={(e) => handleInputChange("firstName", e)}
                placeholder="First Name"
                required
              />
            </div>
            <div className="gradient-button bg-white lg:w-[230px] w-[170px]">
              <Input
                type="text"
                autoComplete="true"
                className=" w-full h-full  expanding-input "
                onChange={(e) => handleInputChange("lastName", e)}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className={`gradient-button lg:w-[480px] w-[360px] bg-white`}>
            <Input
              type="email"
              autoComplete="true"
              className="w-full h-full expanding-input "
              onChange={(e) => handleInputChange("email", e)}
              placeholder="Email"
              required
            />
          </div>
          <div className={`relative  lg:w-[480px] w-[360px] bg-white `}>
            <TextArea
              onFocus={() => setTextFocus(true)}
              onBlur={() => setTextFocus(false)}
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
                padding: "10px",

                resize: "vertical",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              rows={6}
              type="text"
              autoComplete="true"
              className="rounded-[30px] border-none text-[20px] font-bold px-4 text-center outline-none "
              onChange={(e) => handleInputChange("message", e)}
              // placeholder="Message"
              required
            />

            <div
              className={`tracking-wide font-sans font-bold ${
                textFocus == true || message.length > 0
                  ? "text-transparent"
                  : ""
              }`}
              style={{
                position: "absolute",
                top: "50%",
                left: "42%",
                transform: "translateY(-50%)",
                color: "#a1a1a1 ",

                // transition: "opacity 0.2s ease-in-out",
              }}
            >
              Message
            </div>
          </div>

          <div>
            <button
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
              }}
              className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none  font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer"
              onClick={() => {
                window.location.href = "mailto:info@naiyani.com";
              }}
            >
              <span className="px-5">SUBMIT</span>{" "}
              <FaArrowAltCircleRight className="h-[18px] w-[18px]   " />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;

import { useState } from "react";
import { CopyrightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import naiyaniLogo from "../assets/img/naiyanLogo.jpg";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/newsletter/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess("Subscription successful!");
        setEmail(""); // Clear the input
      } else {
        const data = await response.json();
        setError(data.message || "Subscription failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-36">
      <footer>
        <hr />
        <div className="lg:flex justify-between ">
          <div className="flex flex-col gap-5 lg:w-[300px] lg:text-left text-center">
            <img
              className="w-28 my-5 mx-auto lg:mx-0"
              src={naiyaniLogo}
              alt="Naiyani Logo"
            />
            <div className="lg:text-lg text-[15px]">
              Stay in the loop and sign up for the Naiyani newsletter
            </div>

            <div
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
              }}
              className="rounded-2xl border-none flex items-center justify-between py-1 cursor-pointer bg-white px-1 w-[280px] mx-auto my-4 lg"
            >
              <input
                className="w-full h-full rounded-[50px] border-none outline-none text-[18px] font-semibold px-2"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaArrowAltCircleRight
                onClick={handleSubmit}
                className="h-[24px] w-[24px] text-gray-600"
              />
            </div>

            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}
          </div>
          <div className="flex lg:gap-20 gap-7 justify-center">
            {/* Explore */}
            <div className="flex flex-col gap-1">
              <h3 className="mb-2 text-base">Explore</h3>
              <Link to="/">Home</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/team">Team</Link>
            </div>
            <div>
              {/* Help centre */}
              <div className="flex flex-col gap-1">
                <h3 className="mb-2 text-base">Help Centre</h3>
                <Link to="/contact-us">Contact</Link>
                <Link to="/help">FAQ</Link>
                <Link to="/terms">Terms of Services</Link>
                <Link to="/policy">Privacy Policy</Link>
              </div>
            </div>
            <div>
              {/* Social */}
              <div className="flex flex-col gap-1">
                <h3 className="mb-2 text-base">Social</h3>
                <Link>Facebook</Link>
                <Link>Instagram</Link>
                <Link>Twitter</Link>
                <Link>Pinterest</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 mb-8 font-semibold">
          <CopyrightOutlined /> Naiyani Inc. All Rights Reserved 2024
        </div>
      </footer>
    </div>
  );
};

export default Footer;

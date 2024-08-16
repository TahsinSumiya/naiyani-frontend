import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "../../layouts/Footer";
import Navbar1 from "../../components/navbar/Navbar1";

const Pricing = () => {
  const [showMonthly, setShowMonthly] = useState(true);
  const [showYearly, setShowYearly] = useState(false);
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const navigate = useNavigate();

  const handleMonthlyClick = () => {
    setShowMonthly(true);
    setShowYearly(false);
  };

  const handleYearlyClick = () => {
    setShowMonthly(false);
    setShowYearly(true);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch('http://localhost:8000/api/v1/subscription/config/');
      const data = await response.json();
      console.log(data)
      setPrices(data.prices.data); 
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    if (subscriptionData) {
      navigate('/subscribe', { state: subscriptionData });
    }
  }, [subscriptionData, navigate]);

  const createSubscription = async (priceId) => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      console.error("No access token found");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/subscription/create-subscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.subscriptionId && data.clientSecret) {
          setSubscriptionData({ subscriptionId: data.subscriptionId, clientSecret: data.clientSecret });
        } else {
          console.error("Missing subscriptionId or clientSecret in response", data);
        }
      } else {
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };
  
  
  

  return (
    <div className="lg:px-32 px-8 font-sans">
      <Navbar1 />
      <div className="headerFont gradient-text text-center lg:text-[44px] my-10 text-xl text-[#A1A1A1]">
        Plans and Pricing
      </div>

      <div className="text-center mt-8">
        <div
          style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
          className="w-[175px] rounded-[50px] mx-auto flex justify-center items-center"
        >
          <button
            className={`border-none cursor-pointer rounded-[30px] text-sm py-2 px-5 ${showMonthly ? "bg-[#963939] font-semibold text-white" : "bg-white text-[#A1A1A1]"}`}
            onClick={handleMonthlyClick}
          >
            Monthly
          </button>
          <button
            className={`border-none cursor-pointer text-[#A1A1A1] rounded-[30px] text-sm py-2 px-5 ${showYearly ? "bg-[#A1A1A1] font-semibold text-white" : "bg-white text-[#A1A1A1]"}`}
            onClick={handleYearlyClick}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-12 justify-center my-8">
        {(showMonthly || showYearly) && prices.map((price) => (
          <div
            key={price.id}
            style={{ boxShadow: "3px 3px rgba(26, 25, 25, 0.25)" }}
            className="lg:w-[450px] h-[420px] rounded-[30px] bg-white flex flex-col gap-5 px-5"
          >
            <div className="flex flex-col text-center gap-1 mt-5">
              <div className="text-[24px] text-[#A1A1A1] tracking-[.2rem]">
                {/* {price.product.name} */}
                {price.product}
              </div>
              <div className="text-[28px] font-bold">
                ${price.unit_amount / 100}{showMonthly ? '/mo' : '/yr'}
              </div>
              <div className="text-[18px] text-[#A1A1A1]">
                {showMonthly ? 'Billed Monthly' : 'Billed Annually'}
              </div>
            </div>
            <div className="text-[#A1A1A1] lg:text-[18px] text-[12px] flex flex-col lg:text-left gap-2 my-auto mx-auto">
              <div><GiCheckMark size={12} /> Access to Naiyani product database</div>
              <div><GiCheckMark size={12} /> Individual product refresh feature</div>
              <div><GiCheckMark size={12} /> Early access to upcoming new features</div>
              <div><GiCheckMark size={12} /> Data integrated with third-party APIs</div>
            </div>
            <div className="mt-auto mb-10">
              <button
                style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
                className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none font-semibold lg:text-[16px] text-[12px] flex items-center justify-between py-1 cursor-pointer mx-auto"
                onClick={() => createSubscription(price.id)}
              >
                <span className="lg:px-5 px-2">START A 7-DAY FREE TRIAL</span>
                <FaArrowAltCircleRight className="h-[15px] w-[15px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;

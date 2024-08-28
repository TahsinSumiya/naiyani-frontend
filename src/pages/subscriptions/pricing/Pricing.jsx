import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../../layouts/Footer";
import Navbar1 from "../../../components/navbar/Navbar1";
import PricingCards from './PricingCards';
import StripeWrapper from '../../../context/StripeWrapper';


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
      const response = await fetch('http://localhost:8000/api/v1/payment/config/');
      const data = await response.json();
      console.log(data);
      setPrices(data.prices.data);
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    if (subscriptionData) {
      console.log('Navigating to /subscribe with data: ', subscriptionData);
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
      const response = await fetch('http://localhost:8000/api/v1/payment/create-subscription/', {
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
    <>
   <StripeWrapper>

  
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

      <PricingCards
        prices={prices} 
        showMonthly={showMonthly} 
        showYearly={showYearly} 
        createSubscription={createSubscription} 
      />

      <div className="mt-32">
        <Footer />
      </div>
    </div>
    </StripeWrapper>
    </>
  );
};

export default Pricing;

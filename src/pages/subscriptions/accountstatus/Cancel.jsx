import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StripeWrapper from '../../../context/StripeWrapper';

const Cancel = () => {
  const [cancelled, setCancelled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error("No access token found");
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/v1/payment/cancel-subscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscriptionId: location.state?.subscription
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      setCancelled(true);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error as needed
    }
  };

  if (cancelled) {
    navigate('/account');
    return null;
  }

  return (
    <>
 <StripeWrapper>
 <div className="flex items-center justify-center min-h-screen bg-gray-100 shaodw-md"  >
      <div className="w-96 max-h-lg p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-md "
      style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'}}>
        <h1 data-aos="zoom-in" className='text-center text-gray-600 text-3xl mb-6'>| Cancel |</h1>
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-500 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Cancel</span>
          </button>
        </div>
      </div>
    </div>
 </StripeWrapper>
    

    </>
 
  );
};

export default Cancel;

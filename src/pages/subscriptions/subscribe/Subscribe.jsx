import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Navigate, useLocation } from 'react-router-dom';
import Alert from '../../../components/alert/Alert';
import Navbar1 from '../../../components/navbar/Navbar1';
import StripeWrapper from '../../../context/StripeWrapper';

const Subscribe = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState(location.state?.clientSecret || '');
  const [subscriptionId, setSubscriptionId] = useState(location.state?.subscriptionId || '');
  const [name, setName] = useState('Jenny Rosen');
  const [messages, setMessages] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  console.log("Received state in Subscribe component: ", location.state);

  useEffect(() => {
    if (!clientSecret || !subscriptionId) {
      setMessages('Client secret or subscription ID is missing. Please try again.');
    }
  }, [clientSecret, subscriptionId]);

  if (!stripe || !elements) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        }
      }
    });

    if (error) {
      setMessages(error.message);
      setLoading(false);
      return;
    }

    setPaymentIntent(paymentIntent);
    setLoading(false);
  }

  if (paymentIntent && paymentIntent.status === 'succeeded') {
    return <Navigate to="/account" />;
  }

  return (
    <>
<StripeWrapper>

    <div className='lg:px-32 px-8'>
      <Navbar1 />
      <h1 className='text-center text-gray-400 text-3xl'>| Subscribe |</h1>
      <div className='flex justify-center items-center mx-auto'>
        <div className="max-w-xl p-6 bg-gray-100 border border-gray-300 rounded-lg"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' }}>
          <div>
            <p className='text-xl text-cyan-700'>Try the successful test card: <span>4242424242424242</span>.</p>
            <p className='text-xl text-cyan-700'>Try the test card that requires SCA: <span>4000002500003155</span>.</p>
            <p className='text-xl text-cyan-700'>Use any <i>future</i> expiry date, CVC, 5-digit postal code</p>
            <hr />
            <form onSubmit={handleSubmit} className='my-10'>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_email" id="floating_email" value={name} onChange={(e) => setName(e.target.value)}
                  className="block py-2.5 px-0 w-full text-lg text-cyan-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                  focus:outline-none focus:ring-0 focus:text-cyan-700 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-lg text-cyan-700 duration-300 transform -translate-y-6
                  scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-700
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
              </div>
              <div className='my-5'>
                <Alert message={messages} />
                <CardElement />
              </div>
              <button type="submit" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden bg-gray-200 font-medium text-gray-700 transition
                duration-300 ease-out border-2 border-gray-500 rounded-full shadow-lg group" disabled={loading}>
                <span className="absolute flex items-center border-2 border-gray-500 justify-center w-full h-full text-gray-700 duration-300 -translate-x-full
                  bg-gray-400 group-hover:translate-x-0 ease">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-gray-600 font-semibold 
                transition-all duration-300 transform group-hover:translate-x-full ease">Subscribe</span>
                <span className="relative invisible">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    </StripeWrapper>
   
    </>
 
  );
}

export default Subscribe;

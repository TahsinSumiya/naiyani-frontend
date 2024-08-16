import { useState, useEffect } from 'react';
import AccountSubscription from './AccountSubscription';
import Navbar1 from '../../components/navbar/Navbar1';

const Account = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/v1/subscription/subscriptions/');
      const data = await response.json();
      setSubscriptions(data.subscriptions.data);
    };
    fetchData();
  }, []);



  return (
    <div className='lg:px-32 px-8'>
            <Navbar1 />
      <h1 data-aos="zoom-in" className='text-center text-gray-400 text-3xl'>| Account Status |</h1>
      <div className='flex justify-between mx-5'>
        <a href="/pricing" className='text-xl text-gray-400 hover:text-cyan-700 hover:underline font-semibold' data-aos="fade-right">Add a subscription</a>
        <a href="/" className='text-xl text-gray-400 hover:text-cyan-700 hover:underline font-semibold'data-aos="fade-left" >Restart demo</a>
      </div>

      <h2 className='text-gray-400 text-center'data-aos="fade-up">Subscriptions</h2>

      <div id="subscription"  >
        {subscriptions.map(s => (
          <AccountSubscription key={s.id} subscription={s} />
        ))}
      </div>
    </div>
  );
};

export default Account;

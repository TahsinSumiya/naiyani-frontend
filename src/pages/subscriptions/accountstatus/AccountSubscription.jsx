
import { Link } from 'react-router-dom';
import StripeWrapper from '../../../context/StripeWrapper';

const AccountSubscription = ({ subscription }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'canceled':
        return 'text-red-600';
      case 'incomplete':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
    <StripeWrapper>
    <section className='flex justify-center 'data-aos="fade-up">
      <div className="p-6 bg-gray-100 hover:bg-gray-200 border my-5 border-gray-200 rounded-xl  mx-5"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'}}
      >
        <h4>
          <a className='text-cyan-700' href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
            Account Id: {subscription.id}
          </a>
        </h4>

        <p className='font-semibold text-lg text-cyan-700'>
          Status: <span className={getStatusColor(subscription.status)}>{subscription.status}</span>
        </p>

        <p className='text-lg text-cyan-700'>
          Card last: {subscription.default_payment_method?.card?.last4}
        </p>

        <p className='text-lg text-cyan-700'>
          Current period end: {new Date(subscription.current_period_end * 1000).toString()}
        </p>

        <Link to={`/cancel`} state={{ subscription: subscription.id }} className='bg-gray-300 py-3 px-8 transition ease-in-out delay-150 
          hover:-translate-y-1 hover:scale-110 text-gray-700 rounded-2xl hover:bg-slate-300'>
          Cancel
        </Link>
      </div>
    </section>
    </StripeWrapper>
    </>
   
  );
};

export default AccountSubscription;

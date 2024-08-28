import { GiCheckMark } from "react-icons/gi";
import { FaArrowAltCircleRight } from "react-icons/fa";
import StripeWrapper from "../../../context/StripeWrapper";

const PricingCards = ({ prices, showMonthly, showYearly, createSubscription }) => {
  return (
    <>
  
<StripeWrapper>


 
        <div className="flex lg:flex-row flex-col items-center gap-12 justify-center my-8">
      {(showMonthly || showYearly) && prices.map((price) => (
        <div
          key={price.id}
          style={{ boxShadow: "3px 3px rgba(26, 25, 25, 0.25)" }}
          className="lg:w-[450px] h-[420px] rounded-[30px] bg-white flex flex-col gap-5 px-5"
        >
          <div className="flex flex-col text-center gap-1 mt-5">
            <div className="text-[24px] text-[#A1A1A1] tracking-[.2rem]">
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
    </StripeWrapper>
    </>
  )
}

export default PricingCards
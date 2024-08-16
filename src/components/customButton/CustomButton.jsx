/* eslint-disable react/prop-types */
const CustomButton = ({ children, className, onClick, ...rest }) => {
  return (
    <div>
      <button
        style={{
          boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
        }}
        className={`${className} rounded-[50px] text-[26px] text-center flex items-center justify-center font-bold  bg-white text-gray-600  border-none pl-8 pr-7 py-5 `}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;

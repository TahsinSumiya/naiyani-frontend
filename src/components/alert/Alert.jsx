import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
const Alert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!message || !visible) return null;

  return (
    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 relative" role="alert">
      <button 
        onClick={() => setVisible(false)} 
        className="absolute top-0 right-0 mt-2 mr-2 bg-red-200 border-none rounded-full text-red-700 dark:text-red-800 hover:text-red-500 dark:hover:text-red-600">
       <RxCross2 />
      </button>
      {message.split('\n').map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default Alert;

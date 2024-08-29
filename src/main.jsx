import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import StripeWrapper from "./context/StripeWrapper";

const AppWithStripe = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkStripeReady = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/v1/payment/config/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            setIsReady(true);
          }
        } catch {
          // Handle errors as needed
        }
      }
    };

    checkStripeReady();
  }, []);

  return isReady ? (
    <StripeWrapper>
      <RouterProvider router={routes} />
    </StripeWrapper>
  ) : (
    <RouterProvider router={routes} />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithStripe />
    </Provider>
  </React.StrictMode>
);

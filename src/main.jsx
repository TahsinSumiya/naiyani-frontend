import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import StripeWrapper from "./context/StripeWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StripeWrapper>

    
      <RouterProvider router={routes} />
      </StripeWrapper>
    </Provider>
  </React.StrictMode>
);

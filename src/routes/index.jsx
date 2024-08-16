import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DatabaseButton from "../pages/databaseButton/DatabaseButton";
import DatabaseList from "../pages/databaseList/DatabaseList";
import DatabaseTable from "../pages/databaseTable/DatabaseTable";
import Help from "../pages/help/Help";
import SignUp from "../pages/signUp/SignUp";
import Terms from "../pages/terms/Terms";
import Privacy from "../pages/privacy/Privacy";
import Verify from "../pages/verify/verify";
// import PrivateRoute from "./PrivateRoute";

import Login from "../pages/loginPage/Login";
import LandingPage from "../pages/landingPage/LandingPage";
import Pricing from "../pages/pricing/Pricing";
import ContactUs from "../pages/contactUs/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import Team from "../pages/team/Team";
import Subscribe from "../pages/pricing/Subscribe";
import Account from "../pages/pricing/Account";
import Cancel from "../pages/pricing/Cancel";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/database-btn",
        // element: <DatabaseButton />,
        element: (
          <PrivateRoute>
            <DatabaseButton />
          </PrivateRoute>
        ),
      },
      {
        path: "/database-list",
        // element: <DatabaseList />,
        element: (
          <PrivateRoute>
            <DatabaseList />
          </PrivateRoute>
        ),
      },
      {
        path: "/database-table",
        // element: <DatabaseTable />,
        element: (
          <PrivateRoute>
            <DatabaseTable />
          </PrivateRoute>
        ),
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/policy",
        element: <Privacy />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
    ],
  },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);

export default routes;

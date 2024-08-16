/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth.service";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";

const PrivateRoute = ({ children }) => {
  const userExist = isLoggedIn();

  const location = useLocation();
  const navigate = useNavigate();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (!userExist) {
      navigate("/", { state: { from: location } });
    }
  }, [userExist, location, navigate, isInitialLoad]);

  if (isInitialLoad) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

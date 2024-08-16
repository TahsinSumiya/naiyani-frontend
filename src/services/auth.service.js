import { jwtDecode } from "jwt-decode";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage("accessToken", accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");

  if (authToken) {
    const decodedData = jwtDecode(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  return authToken;
};

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};

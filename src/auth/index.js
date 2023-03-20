import { checkValidTokenAPI } from "../apis/user";

export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    const token = localStorage.getItem("signin_token");
    if (token) {
      const isValid = checkValidTokenAPI(token);
      return isValid;
    } else {
      return false;
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    const token = localStorage.getItem("signin_token");
    if (token) {
      return JSON.parse(token);
    } else {
      return false;
    }
  }
};

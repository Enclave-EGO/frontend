export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    if (localStorage.getItem("signin_token")) {
      return true;
    } else return false;
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    if (localStorage.getItem("signin_token")) {
      return JSON.parse(localStorage.getItem("signin_token"));
    } else {
      return false;
    }
  }
};

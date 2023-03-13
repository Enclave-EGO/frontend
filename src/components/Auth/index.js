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
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  }
};

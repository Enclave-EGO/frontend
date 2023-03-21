import httpRequest from "./axiosConfig";

export const signupApi = (user) => {
  return httpRequest.post("/users", JSON.stringify(user), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};

export const signinApi = (user) => {
  return httpRequest.post("/users/signin", JSON.stringify(user), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};

export const checkValidTokenApi = (token) => {
  return httpRequest.post(
    "/users/check-valid-token/",
    {
      token: token
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
  );
};

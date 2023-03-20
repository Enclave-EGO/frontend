import httpRequest from "./axiosConfig";

export const signupApi = (user) => {
  return httpRequest.post("/users", JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const signInApi = (user) => {
  return httpRequest.post("/users/signin", JSON.stringify(user), {
    headers: {
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
        "Content-Type": "application/json"
      }
    }
  );
};

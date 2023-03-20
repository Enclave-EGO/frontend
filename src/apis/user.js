import httpRequest from "../apis/axiosConfig";

export const signupApi = (user) => {
  return fetch("/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const signInAPI = (user) => {
  return fetch("/users/signin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const checkValidTokenAPI = (token) => {
  return httpRequest.post("/users/check-valid-token/", {
    token: token
  });
};

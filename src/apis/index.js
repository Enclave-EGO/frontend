export const signupApi = (user) => {
  return fetch("/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
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
    .catch((err) => {
      console.log(err);
      return err;
    });
};

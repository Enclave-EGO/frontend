export const createTestApi = (newTest) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/tests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(newTest)
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getTestDetailApi = (testId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/tests/${testId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => error);
};

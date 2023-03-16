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
    .then((res) => res.json())
<<<<<<< HEAD
=======
    .catch((err) => err);
};

export const updateTestApi = (testId, testInfo) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/tests/${testId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(testInfo)
  })
    .then((res) => res.json())
>>>>>>> main
    .catch((error) => error);
};

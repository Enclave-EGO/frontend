export const submitTestApi = (newTestResult) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/test-results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(newTestResult)
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getTestResultApi = (userId, testId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/test-results?userId=${userId}&testId=${testId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
};

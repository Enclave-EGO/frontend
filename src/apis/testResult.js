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

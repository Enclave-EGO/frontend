export const createTest = (newTest) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));
  console.log(newTest);

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

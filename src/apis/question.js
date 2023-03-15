export const deleteQuestionApi = (questionId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/questions/${questionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);
};

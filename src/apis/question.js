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

export const createQuestionApi = (question) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: question
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const updateQuesionApi = (question, questionId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/questions/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: question
  })
    .then((res) => res.json())
    .catch((error) => error);
};

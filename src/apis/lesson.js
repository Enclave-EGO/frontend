export const getLessonApi = (lessonId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/lessons/${lessonId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

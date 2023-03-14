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

export const createLessonApi = (lesson) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));
  return fetch(`/lessons/`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(lesson)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
